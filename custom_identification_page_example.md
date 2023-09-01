# Example parts

# Step 1: Get the My Page configuration
Get the My Page configuration by the current domain so we can retrieve the configuration for it.
```javascript
getMyPageConfig(subdomain: string): Promise<{ myPage: IMyPageConfig, domain: string }> {
    return firstValueFrom(this.http.get<{ myPage: IMyPageConfig, domain: string }>(
        `${environment.backendUrl}/v1/customMyPage/url/${subdomain}`
    ));
}
```

# Step 2: Setup a websocket connection with the IPSP-Api
Setup a websocket connection as host to retrieve the channel ID
```javascript
import { WebRtcProvider } from "@proofmeid/webrtc-web";

...

constructor(
    private webRtcProvider: WebRtcProvider
) {

}

...

async setupWsConnection(): Promise<void> {
    let data = `proofme:${proofmeId}`;

    if (this.identification) {
        data = `id:${this.identification.id}`;
    }

    this.webRtcProvider.launchWebsocketClient({
        signalingUrl: environment.signalingUrl,
        isHost: true,
        data
    });

    ...
}
```

# Step 3: Websocket message listener
Setup a websocket data listener to receive messages and update the UI accordingly

```javascript
this.webRtcProvider.websocketMessage$.subscribe(async data => {
    console.log("Websocket message:", data);
    if (data.data) {
        const websocketMessage = JSON.parse(data.data);
        const type = websocketMessage.type;

        if (type === EWebsocketMessageType.HOST) {
            // Here we can handle the channel ID to show in any way
        } else if (type === EWebsocketMessageType.CLIENT_CONNECTED && websocketMessage.success === true) {
            // The user scanned the QR code with the Proofme App
        } else if (type === EWebsocketMessageType.DISCONNECT) {
            // The user disconnected
        } else if (type === EWebsocketMessageType.RESULT) {
            // The result, identification success or fail
        }
    }
});
```

# Complete example Typescript

This is all in one overview just for documentation example purposes

```javascript
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from "src/app/components/base-component/base-component";
import { EWebsocketMessageType } from "src/app/enums/websocketMessageType.enum";
import { IIdentification } from "src/app/interfaces/identification.interface";
import { EIdentificationStatus } from "src/app/enums/identification.enum";
import { IMyPageConfig } from "src/app/interfaces/myPageConfig.interface";
import { DeviceDetectorService, DeviceType } from "ngx-device-detector";
import { IPSPApiProvider } from "src/app/providers/api/ipspApiProvider";
import { EQRStatusType } from "src/app/enums/QRstatusType.enum";
import { environment } from "src/environments/environment";
import { WebRtcProvider } from "@proofmeid/webrtc-web";
import { EErrorTypes } from "src/app/enums/error.enum";
import { ActivatedRoute } from "@angular/router";
import * as QRCode from "qrcode";
import { skip } from "rxjs";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {

    @ViewChild("qrCodeCanvas") qrCodeCanvas: ElementRef;

    qrStatus = EQRStatusType.LOADING;
    identification: IIdentification;
    errorCode = EErrorTypes.NONE;
    myPageConfig: IMyPageConfig;
    device: DeviceType;

    mobileLoginUrl: string;
    websocketDisconnected = false;
    waitingForWsConnectionAfterClick = false;

    constructor(
        private ipspApiProvider: IPSPApiProvider,
        private webRtcProvider: WebRtcProvider,
        private ngZone: NgZone,
        private deviceService: DeviceDetectorService,
        private route: ActivatedRoute
    ) {
        super();
        if (this.deviceService.isMobile()) {
            this.device = DeviceType.Mobile;
        } else if (this.deviceService.isTablet()) {
            this.device = DeviceType.Tablet;
        } else {
            this.device = DeviceType.Desktop
        }
    }

    async ngOnInit(): Promise<void> {
        await this.getIdentificationDetails();
    }

    async getIdentificationDetails(): Promise<void> {
        try {
            const pageConfig = await this.getPageConfig();
            this.myPageConfig = pageConfig;
            console.log("Page config:", pageConfig);

            const identificationId = this.route.snapshot.paramMap.get("id");
            console.log("identificationId:", identificationId);

            if (!pageConfig || (!pageConfig.publicIdentifications && !identificationId)) {
                this.errorCode = EErrorTypes.IDENTIFICATION_NOT_FOUND;
                console.error("Public identifications not enabled and no identification id");
            } else if (identificationId) {
                const identification = (await this.ipspApiProvider.getIdentification(identificationId)).identification;
                console.log("identification:", identification);

                if (identification?.organisationId === pageConfig?.organisationId) {
                    this.identification = identification;
                } else if (identification?.organisationId !== pageConfig?.organisationId) {
                    this.errorCode = EErrorTypes.IDENTIFICATION_NOT_FOUND;
                }

                const connectionFailedScreens = [EIdentificationStatus.SUCCESS, EIdentificationStatus.FAILED, EIdentificationStatus.REVOKED];
                if (connectionFailedScreens.includes(this.identification?.status)) {
                    this.errorCode = EErrorTypes.IDENTIFICATION_ALREADY_FINISHED;
                }
            }

            if (this.myPageConfig && !this.myPageConfig.proofme) {
                this.errorCode = EErrorTypes.IDENTIFICATION_NOT_FOUND;
                console.error("No proofme set");
            } else if (this.errorCode === EErrorTypes.NONE) {
                await this.setupWsConnection();
            }
        } catch (error) {
            this.errorCode = EErrorTypes.IDENTIFICATION_NOT_FOUND;
            console.error(error);
        }

        console.log("Error code:", this.errorCode);
    }

    async getPageConfig(): Promise<IMyPageConfig> {
        const subdomain = this.getSubDomain();
        return (await this.ipspApiProvider.getMyPageConfig(encodeURIComponent(subdomain)))?.myPage;
    }

    getSubDomain(): string {
        if (location.protocol === "http:") {
            return (location.protocol + "//") + location.hostname + ":" + location.port;
        } else {
            return (location.protocol + "//") + location.hostname;
        }
    }

    async setupWsConnection(): Promise<void> {
        let data = `proofme:${this.myPageConfig?.proofme?.id}`;

        if (this.identification) {
            data = `id:${this.identification.id}`;
        }

        this.webRtcProvider.launchWebsocketClient({
            signalingUrl: environment.signalingUrl,
            isHost: true,
            data
        });

        const disconnectSub = this.webRtcProvider.websocketConnectionClosed$.pipe(skip(1)).subscribe((value: boolean) => {
            this.ngZone.run(() => {
                this.websocketDisconnected = value;
                if (value === true && (this.qrStatus === EQRStatusType.READY || this.qrStatus === EQRStatusType.LOADING)) {
                    setTimeout(async () => {
                        await this.setupWsConnection();
                    }, 10000);
                    this.qrStatus = EQRStatusType.LOADING;
                    const canvas = this.qrCodeCanvas.nativeElement as HTMLCanvasElement;
                    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                    disconnectSub.unsubscribe();
                }
            })
        });

        const connection = this.webRtcProvider.websocketMessage$.pipe(skip(1)).subscribe(async data => {
            console.log("Websocket message:", data);
            if (data.data) {
                const websocketMessage = JSON.parse(data.data);
                const type = websocketMessage.type;

                if (type === EWebsocketMessageType.HOST) {
                    this.setConnectionDetails(websocketMessage.channelId, websocketMessage.signalServer);
                } else if (type === EWebsocketMessageType.CLIENT_CONNECTED && websocketMessage.success === true) {
                    this.qrStatus = EQRStatusType.SCANNED;
                } else if (type === EWebsocketMessageType.DISCONNECT) {
                    this.setupWsConnection();
                } else if (type === EWebsocketMessageType.RESULT) {
                    // If identification
                    if (websocketMessage.success === true) {
                        this.ngZone.run(() => {
                            this.qrStatus = EQRStatusType.SUCCESS_IDENTIFICATION;
                        });
                    } else if (websocketMessage.success === false) {
                        // Otherwise we receive disconnect
                        this.ngZone.run(() => {
                            this.qrStatus = EQRStatusType.ERROR;
                        });
                    }
                    connection.unsubscribe();
                }
            }
        });
    }

    setConnectionDetails(uuid: string, signalServer: string): void {
        if (this.device !== DeviceType.Mobile && this.errorCode === EErrorTypes.NONE) {
            const canvas = this.qrCodeCanvas.nativeElement as HTMLCanvasElement;
            this.ngZone.run(() => {
                this.websocketDisconnected = false;
            })
            QRCode.toCanvas(canvas, `https://proofme.id/app?p=${uuid}:${encodeURIComponent(signalServer)}`, {
                width: 250,
                errorCorrectionLevel: "high"
            });
        }

        this.mobileLoginUrl = `https://proofme.id/app?p=${uuid}:${encodeURIComponent(signalServer)}`;
        this.qrStatus = EQRStatusType.READY;

        // Whenever we clicked before it was ready, auto redirect whenever ready
        if (this.waitingForWsConnectionAfterClick) {
            window.location.href = this.mobileLoginUrl;

            // Just a little fancy thing, whenever we have the mobile URL
            // you see the button switching from loading to clickable in a split second
            // while we open the app... This allows you see the loader for a while
            // while we are opening the app
            setTimeout(() => {
                this.waitingForWsConnectionAfterClick = false;
            }, 1000);
        }
    }

    openApp(): void {
        // If the URL is not available, set a boolean so we can show a loader
        // and auto-forward when it's ready
        if (!this.mobileLoginUrl) {
            this.waitingForWsConnectionAfterClick = true;
        } else {
            window.location.href = this.mobileLoginUrl;
        }
    }
}

import { IIdentification } from "../../interfaces/identification.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { IMyPageConfig } from "src/app/interfaces/myPageConfig.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class IPSPApiProvider {

    constructor(
        private http: HttpClient
    ) { }

    getMyPageConfig(subdomain: string): Promise<{ myPage: IMyPageConfig, domain: string }> {
        return firstValueFrom(this.http.get<{ myPage: IMyPageConfig, domain: string }>(
            `${environment.backendUrl}/v1/customMyPage/url/${subdomain}`
        ));
    }

    getIdentification(id: string): Promise<{ identification: IIdentification }> {
        return firstValueFrom(this.http.get<{ identification: IIdentification }>(
            `${environment.backendUrl}/v1/identification/${id}`
        ));
    }
}

export enum EErrorTypes {
    NONE = "NONE",
    IDENTIFICATION_NOT_FOUND = "IDENTIFICATION_NOT_FOUND",
    IDENTIFICATION_ALREADY_FINISHED = "IDENTIFICATION_ALREADY_FINISHED"
}

export enum EIdentificationStatus {
    PENDING = "PENDING",
    REVOKED = "REVOKED",
    FAILED = "FAILED",
    SUCCESS = "SUCCESS"
}

export enum EQRStatusType {
    LOADING = "LOADING",
    READY = "READY",
    SCANNED = "SCANNED",
    SUCCESS_IDENTIFICATION = "SUCCESS_IDENTIFICATION",
    ERROR = "ERROR",
    DISCONNECTED = "DISCONNECTED",
}

export enum EWebsocketMessageType {
    HOST = "host",
    CLIENT_CONNECTED = "clientconnected",
    DISCONNECT = "disconnect",
    RESULT = "result"
}

```

# Complete example HTML

```html
<div class="main">
    <!-- Desktop / tablet -->
    <div *ngIf="(device === 'desktop' || device === 'tablet') && qrStatus !== 'SUCCESS_IDENTIFICATION'" class="qr-wrapper">
        <canvas #qrCodeCanvas></canvas>
        <div *ngIf="(qrStatus === 'LOADING' || qrStatus === 'READY' || qrStatus === 'SCANNED')"
            [ngClass]="{'spinning': qrStatus === 'LOADING' || qrStatus === 'SCANNED'}" class="logo-p">
            <img src="/assets/svg/proofmep.svg" alt="Proofme">
            <p *ngIf="websocketDisconnected" class="reconnecting-text">Reconnecting...</p>
        </div>
        <div *ngIf="qrStatus === 'SCANNED'" class="status"></div>
    </div>

    <!-- Mobile -->
    <button *ngIf="device === 'mobile' && qrStatus !== 'SUCCESS_IDENTIFICATION'" (click)="openApp()" class="open-app-button" [disabled]="websocketDisconnected"
        [ngClass]="{ 'loading-button' : waitingForWsConnectionAfterClick }">
        <div *ngIf="waitingForWsConnectionAfterClick" class="spinner-icon"></div>
        <svg-icon *ngIf="!waitingForWsConnectionAfterClick" src="/assets/svg/white-proofme-p.svg"></svg-icon>
        <span *ngIf="!waitingForWsConnectionAfterClick">Open app</span>
    </button>
    <img *ngIf="qrStatus === 'SUCCESS_IDENTIFICATION'" src="/assets/svg/check.svg" class="success-identification" />

    <!-- Simple additional context based on error codes -->
    <div *ngIf="errorCode === 'IDENTIFICATION_NOT_FOUND'">
        Current URL not configured or public identifications not enabled
    </div>
    <div *ngIf="errorCode === 'IDENTIFICATION_ALREADY_FINISHED'">
        Identification already finished
    </div>
</div>
```

# Complete example SCSS
```scss
@use "sass-rem" as *;

.main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;

    .qr-wrapper {
        width: rem(300px);
        height: rem(300px);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: rem(12px);
        flex-direction: column;

        img {
            width: 100%;
            height: 100%;
        }

        .logo-p {
            position: absolute;
            background-color: #ffffff;
            border-radius: rem(8px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: rem(168px);
            height: rem(168px);
            transform: scale(0.33);
            border-radius: rem(22px);
            transition: transform 1s ease-in-out;

            &.spinning {
                transform: scale(1);

                img {
                    animation: 1600ms ease-out infinite alternate mirror;
                }
            }

            .reconnecting-text {
                margin-bottom: 0;
                font-size: rem(17px);
            }
        }

        .status {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: rem(18px);
            color: var(--black);
            background: rgba(#ffffff, 0.85);
            border-radius: rem(12px);

            img {
                margin-bottom: rem(20px);
            }
        }
    }

    .open-app-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: rem(10px);
        width: 100%;
        border-radius: rem(16px);
        border: none;
        padding: rem(28px 24px);
        background-color: var(--blue);
        color: #ffffff;
        font-size: rem(28px);
        margin-bottom: rem(24px);
        background: #1b89c4;

        span {
            color: white;
        }

        svg-icon {
            // This width will prevent the text next to it from 'jumping' when the image is not loaded yet.
            width: rem(34px);

            svg {
                display: flex;
                height: rem(28px);
                width: rem(34px);
            }
        }
    }

    .success-identification {
        width: rem(200px);
        height: rem(200px);
    }
}
```