# Example usage
Below you can find a step by step instruction of how to use certain parts of the MRZ and NFC.

# 1 - Initialising

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

# 2 - MRZ

## Reading the MRZ
This opens an overlay which will open the camera and use OCR (Optical character recognition) with a regex pattern to find the correct MRZ for an `ID card / passport`. This will result in basic information such as first name, lastname, document number, birth date, document expiry date etc.

Example of scanning the MRZ:
```javascript
async mrz(): Promise<void> {
    this.mrzCredentials = await EpassReader.scanMrz();
    console.log("MRZ Credentials:", this.mrzCredentials);
}
```

Example of scanning the MRZ for driving licenses:
```javascript
async mrz(): Promise<void> {
    this.mrzCredentials = await EpassReader.scanMrz({ driverLicense: true });
    console.log("MRZ Credentials:", this.mrzCredentials);
}
```

The MRZ credentials will return the following interface:
```javascript
interface IDocumentCredentials {
    documentNumber: string;
    birthDateDigits: string;
    birthDate?: Date;
    expiryDateDigits: string;
    issueDate?: string;
    expiryDate?: Date;
    gender?: string;
    documentType: string;
    firstNames?: string;
    lastName?: string;
    issuer?: string;
    nationality?: string;
    personalNumber?: string;
    city?: string;
    mrz?: string;
    driverMrzKey?: string;
    signatureBase64?: string;
    vehicleCategories?: IVehicleCategory[];
    documentNumberCheckDigitCorrect?: boolean;
    expiryDateCheckDigitCorrect?: boolean;
    birthDateCheckDigitCorrect?: boolean;
}
```

Use the information as you wish. If you want to continue to the NFC scan you need to use the `documentNumber`, `birthDateDigits` and `expiryDateDigits`. These three values serve as sort of a password to read the NFC chip on the document

The check digit booleans are there so your application can show the proper steps to what to do next or ignore the check digits. There are several belgium ID cards with a known error inside the MRZ. However it is highly recommended not to ignore them since they serve as an important check on the validity of the `documentNumber`, `birthDateDigits` and `expiryDateDigits`

# 3 - NFC

## Reading the document with NFC
To read the NFC we need the the `documentNumber`, `birthDateDigits` and `expiryDateDigits`. If one of these values are incorrect, you will receive a promise rejection.

## Passport + ID-Card
```javascript
const datagroups = [
    EDataGroup.DG1,
    EDataGroup.DG2
]
const scanOptions: IScanOptions = {
    documentType: mrzResult.documentType,
    documentNumber: mrzResult.documentNumber,
    birthDate: mrzResult.birthDateDigits,
    expiryDate: mrzResult.expiryDateDigits,
    dataGroups: datagroups
}
this.datagroups = await EpassReader.scanNfc(scanOptions);
console.log("NFC Data groups:", this.datagroups);
```

## Driving license
```javascript
const datagroups = [
    EDataGroup.DG1,
    EDataGroup.DG5,
    EDataGroup.DG6,
    EDataGroup.DG11,
    EDataGroup.DG12
]
const scanOptions: IScanOptions = {
    documentType: mrzResult.documentType,
    driverMrzKey: mrzResult.driverMrzKey,
    dataGroups: datagroups
}
this.datagroups = await EpassReader.scanNfc(scanOptions);
console.log("NFC Data groups:", this.datagroups);
```

The NFC will return the following interface:
```javascript
interface INfcResult {
    error: string;
    DG1: IDataGroup;
    DG2: IDataGroup;
    DG3: IDataGroup;
    DG4: IDataGroup;
    DG5: IDataGroup;
    DG6: IDataGroup;
    DG7: IDataGroup;
    DG8: IDataGroup;
    DG9: IDataGroup;
    DG10: IDataGroup;
    DG11: IDataGroup;
    DG12: IDataGroup;
    DG13: IDataGroup;
    DG14: IDataGroup;
    DG15: IDataGroup;
    DG16: IDataGroup;
    SOD: IDataGroup;
    COM: IDataGroup;
    success: boolean;
}
```
Passport / ID-card
DG1: Basic information
DG2: Document photo

Driving license:
DG1: Basic information + vehicle categories
DG5: Signature
DG6: Document photo
DG11: Extended information (BSN)
DG12: MRZ code (except first and last digit)

### Reading progress and errors of the NFC
Ofcourse the NFC reading takes some time depending on the speed of the device as of the speed of the NFC chip of the document. Implementation may differ, below an example with references to use on different places


```javascript
import { EpassReader, JP2Decoder } from "@proofme-id/sdk/web/reader";
import { EDataGroup } from "@proofme-id/sdk/web/reader/enums";
import { ReaderHelper } from "@proofme-id/sdk/web/reader/helpers";
import {
    IDocumentCredentials,
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
        this.progress = 0;
        console.log("onPassportReadStart");
    }

    /**
     * Gets called everytime the NFC progresses to the next step
     * @param event 
     */
    onPassportNfcProgress(event: IPassportNfcProgressEvent): void {
        const currentStep = event.currentStep;
        const totalSteps = event.totalSteps;
        this.ngZone.run(() => {
            this.progress = parseInt(((currentStep / totalSteps) * 100).toFixed(0));
        });
    }

    /**
     * Gets called whenever there is an error reading the document
     * @param event 
     */
    onPassportReadError(event: IPassportNfcProgressErrorEvent): void {
        console.error("onPassportReadError event:", event);
        // When the MRZ is faulty
        let swHex = null;
        if (event.sw) {
            swHex = `0x${parseInt(event.sw, 10).toString(16).toUpperCase()}`
        }
        if (swHex) {
            // RAPDU = 6982 (SW = 0x6982: SECURITY STATUS NOT SATISFIED) = 27010
            // RAPDU = 6A86 (SW = 0x6A86: INCORRECT P1P2) = 27270
            if (swHex === "0x6982" || swHex === "0x6A86") {
                console.error("Incorrect MRZ credentials for NFC chip");
                this.showToast("Incorrect MRZ credentials for NFC chip");
            } else {
                this.showToast("Connection lost");
            }
        } else {
            this.showToast("Connection lost");
        }
        this.nfcEnabled = false;
        EpassReader.stopNfc();
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

# 4 - Passphoto
This function will use face recognition to retrieve the passphoto from the camera. It has to be a certain minimal width and will automatically adjust the rotation. The "face" key will have a base64 image value containing the passphoto

```javascript
try {
    const photoScannerResult = await PassphotoScanner.scan();
    if (photoScannerResult) {
        this.passportPhoto = photoScannerResult.face;
        console.log("Passport photo: ", this.passportPhoto);
    }
} catch (error) {
    console.error(error);
}
```

# 5 - Document scan
This function will scan the whole document in one go. 

<b>ID-card</b><br>
It will require two photos; back and front. MRZ + passphoto will be returned. There will be (depending on configuration) a rotation screen between the back and front step. The user can click a button to take the photo

<b>Passport</b><br>
It will require one photo; front. MRZ + passphoto will be returned. The user can click a button to take the photo

Below an example of how to start this functionality. The argument is optional and is explained in step <b>"5.1 - Document scan options"</b>

```javascript
const documentInfo = await EpassReader.scanDocument({
    translations: {
        firstResultScan: "Scan front",
        secondResultScan: "Scan back",
        processing: "Processing...",
        rotate: "Please rotate the document"
    }
});
```

This function will return the following interface
```javascript
interface IScanDocumentResult {
    frontPhoto: string;
    backPhoto?: string;
    mrz?: IDocumentCredentials;
    face?: string;
    errors?: string[];
}
```
___
#### frontPhoto
_string_ `REQUIRED`

The front photo of the document
___

#### backPhoto
_string_ `OPTIONAL`

The back photo of the document
___

#### mrz
_string_ `OPTIONAL`

The MRZ credentials in key / value
___

#### face
_string_ `OPTIONAL`

The passphoto in a JPEG base64
___

#### errors
_string[]_ `OPTIONAL`

Various errors / uncertainties about the results in a string array
___

# 5.1 - Document scan options
The following options are available for the document scan:

```javascript
interface IScanDocumentOptions {
    autoCloseDuration?: number
    translations?: {
        firstResultScan?: string;
        processing?: string;
        rotate?: string;
        secondResultScan?: string;
    },
    config?: {
        mrz: {
            detect: true,
            required: true,
            srcImage: true
        },
        face: {
            detect: true,
            required: true,
            srcImage: true
        },
        maxRetries: 0
    }
}
```

___
#### autoCloseDuration
_integer_ `OPTIONAL`

How long the rotation screen should show in miliseconds.

<b>Not defined (default):</b> The screen will show indefinitely; a button on the bottom of the screen will allow the user to manually continue

<b>0:</b> The screen will not show at all, instant front photo to back photo or to result when passport

<b>Anything above 0:</b> This is how long the rotation screen will show and then continue to result or back photo overlay

___

### translations
_object_ `OPTIONAL`

Four translation texts are available. If one or none are defined, that text will not be shown in that step

<b>firstResultScan:</b> The text on the first screen: Scan front of document

<b>processing:</b> The text on the 'loading' screen: When processing MRZ / passphoto

<b>rotate:</b> The text that will be shown on the rotate screen if not passport: Rotate document

<b>secondResultScan:</b> The text that will be shown on the last step if not passport: Scan back of document

### config
_object_ `OPTIONAL`

Two processors are available; mrz & face. Each processor has three options; detect, required & srcImage. Either mrz or face should have detect enabled

##### mrz & face
_object_ `OPTIONAL`

<b>detect:</b> Should this processor be enabled to return results

<b>required:</b> Is the result for this processor necessary

<b>srcImage:</b> Should this processor return the source image (picture made by camera)

___
##### maxRetries
_int_ `OPTIONAL`
<b>srcImage:</b> The maximum amount of tries for each result if required.
___