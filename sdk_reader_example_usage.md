# Example usage
Below you can find a step by step instruction of how to use certain parts of the MRZ and NFC.

## Initialising the SDK
Before using the SDK you need to setup your JWT key which you received by registering one through the Proofme Dashboard. You can use the test key for development and the production key for your app in the app stores. `Without initialising the SDK first, you will not be able to use the functions inside the SDK`

Example of initialising the SDK:
```javascript
async initializeSdk(): Promise<void> {
    try {
        const jwt = "FILL_IN_JWT_HERE";
        await EpassReader.initialize({ jwt });
    } catch (error) {
        console.error(error);
    }
}
```

## Reading the MRZ
This opens an overlay which will open the camera and use OCR (Optical character recognition) with a regex pattern to find the correct MRZ for an `ID card / passport`. This will result in basic information such as first name, lastname, document number, birth date, document expiry date etc.

Example of scanning the MRZ:
```javascript
async mrz(): Promise<void> {
    this.mrzCredentials = await EpassReader.scanMrz();
    console.log("MRZ Credentials:", this.mrzCredentials);
}
```

The MRZ credentials will return the following interface:
```javascript
interface IMrzCredentials {
    documentNumber: string;
    birthDate: string;
    expiryDate: string;
    gender: string;
    documentType: string;
    firstNames: string;
    lastName: string;
}
```

Use the information as you wish. If you want to continue to the NFC scan you need to use the `documentNumber`, `birthDate` and `expiryDate`. These three values serve as sort of a password to read the NFC chip on the document

## Reading the document with NFC
To read the NFC we need the the `documentNumber`, `birthDate` and `expiryDate`. If one of these values are incorrect, you will receive a promise rejection.

```javascript
const scanOptions: IScanOptions = {
    documentNumber: this.mrzCredentials.documentNumber,
    birthDate: this.mrzCredentials.birthDate,
    expiryDate: this.mrzCredentials.expiryDate,
    dataGroups: [EDataGroup.DG1, EDataGroup.DG2]
}
this.datagroups = await EpassReader.scanNfc(scanOptions);
console.log("NFC Data groups:", this.datagroups);
```

The NFC will return the following interface:
```javascript
interface INfcResult {
    error: string;
    DG1: number[];
    DG2: number[];
    SOD: number[];
    success: boolean;
}
```

As of the example above, three values are required as of a list of datagroups. DG1 contains the complete MRZ which can be extracted to firstname, lastname, birthdate, gender etc. DG2 contains the document photo. The datagroups exist of a number array. There are helper functions inside the SDK to convert these number arrays to readable values which will be discussed later.


### Reading progress and errors of the NFC
Ofcourse the NFC reading takes some time depending on the speed of the device as of the speed of the NFC chip of the document. Implementation may differ, below an example with references to use on different places


```javascript
import { EpassReader, JP2Decoder } from "@proofme-id/sdk/web/reader";
import { EDataGroup } from "@proofme-id/sdk/web/reader/enums";
import { ReaderHelper } from "@proofme-id/sdk/web/reader/helpers";
import {
    IMrzCredentials,
    INfcResult,
    IPassportNfcProgressErrorEvent,
    IPassportNfcProgressEvent,
    IScanOptions
} from "@proofme-id/sdk/web/reader/interfaces";

export class AppComponent {
    iosMrzInvalidReference = this.iosMrzInvalidError.bind(this);
    onPassportReadStartReference = this.onPassportReadStart.bind(this);
    onPassportReadErrorReference = this.onPassportReadError.bind(this);
    onPassportReadNfcProgressReference = this.onPassportNfcProgress.bind(this);

    ...

    /**
     * Gets called once whenever the NFC reading starts
     */
    onPassportReadStart(): void {
        this.nfcProgressValue = 0;
        console.log("onPassportReadStart");
    }

    /**
     * Gets called everytime the NFC progresses to the next step
     * @param event 
     */
    onPassportNfcProgress(event: IPassportNfcProgressEvent): void {
        const nfcStep = event.step;
        const nfcTotalSteps = 7;
        this.ngZone.run(() => {
            this.nfcProgressValue = parseInt(((nfcStep / nfcTotalSteps) * 100).toFixed(0));
            console.log(`NFC Progress ${this.nfcProgressValue}%`);
        });
    }

    /**
     * Gets called whenever there is an error reading the document
     * @param event 
     */
    onPassportReadError(event: IPassportNfcProgressErrorEvent): void {
        console.error("onPassportReadError event:", event);

        if (event.error === "ConnectionLost") {
            console.error("Connection lost");
        } else if (event.exception?.includes("onPACEException") && event.message?.includes("SW = 0x6300: Unknown")) {
            console.error("Incorrect MRZ credentials for NFC chip");
        }
    }

    /**
     * Gets called whenever the MRZ is invalid for specifically ios (android mrz error is handled inside onPassportReadError)
     */
    async iosMrzInvalidError(): Promise<void> {
        this.nfcEnabled = false;
        await EpassReader.stopNfc();
    }

    ...

    addNfcListeners(): void {
        window.addEventListener("iosMrzInvalid", this.iosMrzInvalidReference);
        window.addEventListener("onPassportReadStart", this.onPassportReadStartReference);
        window.addEventListener("onPassportReadError", this.onPassportReadErrorReference);
        window.addEventListener("onPassportNfcProgress", this.onPassportReadNfcProgressReference);
    }

    removeNfcListeners(): void {
        window.removeEventListener("iosMrzInvalid", this.iosMrzInvalidReference);
        window.removeEventListener("onPassportReadStart", this.onPassportReadStartReference);
        window.removeEventListener("onPassportReadError", this.onPassportReadErrorReference);
        window.removeEventListener("onPassportNfcProgress", this.onPassportReadNfcProgressReference);
    }

    ...
```

### Helper functions to convert DG1 and DG2 to readable values
So whenever we are done reading the NFC we receive the datagroups in a number list format. For converting it to a readable format:

#### DG1
```javascript
import { ReaderHelper } from "@proofme-id/sdk/web/reader/helpers";

const dg1Data = this.readerHelper.extractMRZFromDG1(new Uint8Array(this.datagroups.DG1));
```

This will result in an object containing each field and step. To use the basic information directly, use the `fields` key (`dg1Data.fields`)


#### DG2
```javascript
import { ReaderHelper } from "@proofme-id/sdk/web/reader/helpers";

const dg2Data = this.readerHelper.extractImageFromDG2(new Uint8Array(this.datagroups.DG2));
```

This will result in a base64 of type JP2. Beware that this type is only usable in Safari and no other browser as of now. To convert this to a JPEG use the function below


#### JP2 to JPEG

```javascript
import { JP2Decoder } from "@proofme-id/sdk/web/reader";

try {
    const imageObject = await JP2Decoder.convertJP2toJPEG({ image: dg2Data });
    const jpegImage = imageObject.image;
} catch (error) {
    console.error(error);
}
```