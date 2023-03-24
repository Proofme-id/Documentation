# Examples Angular

Here we can find an example of how to encrypt / decrypt the identification data on Angular

### PgpUtils
This class is being used to encrypt / decrypt the identification secret and generate PGP keys
```
import { Injectable } from "@angular/core";
import * as openpgp from "openpgp"; 

@Injectable({
    providedIn: "root"
})
export class PgpProvider {

    async generateKeys(): Promise<openpgp.SerializedKeyPair<string>> {
        return await openpgp.generateKey({
            type: "ecc",
            curve: "curve25519",
            userIDs: { name: "Proofme Vault", comment: "Auto generated from the Proofme App" }
        });
    }

    async encrypt(message: string, pgpPublicKeys: string[]): Promise<string> {
        const armoredPublicKeys = [];
        for (const pgpPublicKey of pgpPublicKeys) {
            const armoredPublicKey = await openpgp.readKey({ armoredKey: pgpPublicKey });
            armoredPublicKeys.push(armoredPublicKey);
        }
        return await openpgp.encrypt({
            message: await openpgp.createMessage({ text: message }),
            encryptionKeys: armoredPublicKeys
        });
    }

    async decrypt(armoredMessage: string, pgpPrivateKey: string): Promise<openpgp.DecryptMessageResult> {
        const encryptedMessage = await openpgp.readMessage({
            armoredMessage
        });
        const armoredPrivateKey = await openpgp.readPrivateKey({ armoredKey: pgpPrivateKey })
        return await openpgp.decrypt({
            message: encryptedMessage,
            decryptionKeys: armoredPrivateKey
        });
    }
}
```

### CryptoUtils
This class is being used to encrypt / decrypt the identification data

```
import { Injectable } from "@angular/core";
import { ICredentialObject } from "@proofmeid/webrtc-web";
import CryptoJS from "crypto-js";
import { firstValueFrom } from "rxjs";
import { PgpProvider } from "./pgp.provider";

@Injectable({
    providedIn: "root"
})
export class CryptoProvider {
    
    constructor(
        private pgpProvider: PgpProvider
    ) {

    }
    
    async encrypt(message: string, secret: string): Promise<string> {
        return CryptoJS.AES.encrypt(message, secret).toString();
    }

    async decrypt(cipherText: string, secret: string): Promise<string> {
        return CryptoJS.AES.decrypt(cipherText, secret).toString(CryptoJS.enc.Utf8);
    }

    async decryptCredentials(encryptedCredentials: string, encryptedEncryptionSecret: string, pgpPrivateKey: string): Promise<ICredentialObject> {
        const decryptedEncryptionSecret = (await this.pgpProvider.decrypt(encryptedEncryptionSecret, pgpPrivateKey)).data.toString();
        const decryptedData: ICredentialObject = JSON.parse(await this.decrypt(encryptedCredentials, decryptedEncryptionSecret));
        return decryptedData;
    }
}
```

### Complete example code encrypting

```
import { PgpProvider } from "./pgp.provider";
import { CryptoUtils } from "./cryptoUtils.provider";
import { v4 } from "uuid";

@Component({
    selector: "app-example-decrypt-page",
    templateUrl: "./example-decrypt-page.component.html",
    styleUrls: ["./example-decrypt-page.component.scss"]
})
export class ExampleEncryptPageComponent {

    constructor(
        private pgpProvider: PgpProvider,
        private cryptoProvider: CryptoProvider
    ) {

    }

    decryptCredentials: Promise<void> {
        const keys = this.pgpProvider.generateKeys();
        const encryptionSecret = v4();
        const credentials = {
            "credentials": {
                "EPASS": {
                    "credentials": {
                        "OLDER_THAN_18": {
                            "credentialSubject": {
                                "credential": {
                                    "type": "Older Than 18",
                                    "value": true
                                }
                            },
                            "expirationDate": "2024-03-21T11:56:55.066312+00:00",
                            "id": "did:didux:0xec81C60208725c09a1E42E448c60aA3A6847BF02",
                            "issuanceDate": "2023-03-22T11:56:55.189631+00:00",
                            "issuer": {
                                "authorityId": "Proofme",
                                "authorityName": "Proofme",
                                "id": "did:didux:0x91a935E503eFAEDF22A4a7941BFAcE25DedE0bf3",
                                "name": "Proofme.ID"
                            },
                            "proof": {
                                "holder": "0xA003FAC350C6fd3a8130E83C85e88E6b978726C0",
                                "nonce": 1679486215189,
                                "signature": "0xcc0d9d0e086cfe9378f4cd6116364c5a8624132272dd4b7588764ce75d760cbf32024b9568f512a33c2b7ca4d7e3bae0d12e99747dc33183aaec6459c4e6ba541b",
                                "type": "ECDSA"
                            },
                            "provider": "EPASS",
                            "type": [
                                "VerifiableCredential",
                                "OlderThan18Credential"
                            ],
                            "version": "1.0.0"
                        },
                        "PHOTO": {
                            "credentialSubject": {
                                "credential": {
                                    "type": "PassportImage",
                                    "value": "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"
                                }
                            },
                            "expirationDate": "2024-03-21T11:56:55.066312+00:00",
                            "id": "did:didux:0xec81C60208725c09a1E42E448c60aA3A6847BF02",
                            "issuanceDate": "2023-03-22T11:56:55.089233+00:00",
                            "issuer": {
                                "authorityId": "Proofme",
                                "authorityName": "Proofme",
                                "id": "did:didux:0x91a935E503eFAEDF22A4a7941BFAcE25DedE0bf3",
                                "name": "Proofme.ID"
                            },
                            "proof": {
                                "holder": "0xA003FAC350C6fd3a8130E83C85e88E6b978726C0",
                                "nonce": 1679486215089,
                                "signature": "0x43eda40a7ad7ca016b3c0b038736a6ac038acd1cbe69b4435217dcb6c1bcd88d1579b9f4a4e704ffaf3aa83d8bfa138c659637df48979556c12b12d03d3051ed1b",
                                "type": "ECDSA"
                            },
                            "provider": "EPASS",
                            "type": [
                                "VerifiableCredential",
                                "PassportImageCredential"
                            ],
                            "version": "1.0.0"
                        }
                    },
                    "proof": {
                        "holder": "0x4D0f82875570F7dDf78d4C1a406DF6BD2380A472",
                        "nonce": 1679577260590,
                        "signature": "0x7261d145cb4c9ea4b3cada6185189b78b4ad50c30f3de443b4f2d3853e0ce2a419d61fd86d913b76464915fc7093d68d439b2354617b21c9356cc7cd2fc584441c",
                        "type": "ECDSA"
                    }
                }
            }
        };
        const encryptedData = await this.cryptoProvider.encrypt(JSON.stringify(credentials), encryptionSecret);
        const encryptKeysList = [
            keys.publicKey
        ];
        const encryptedEncryptionSecret = await this.pgpUtils.encrypt(
            encryptionSecret, 
            encryptKeysList
        );
        console.log("encryptedData:", encryptedData);
        console.log("encryptedEncryptionSecret:", encryptedEncryptionSecret);
    }
}
```

### Encryption code output
```
encryptedData: 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
encryptedEncryptionSecret: 
-----BEGIN PGP MESSAGE-----

wV4DBYbRWJTWtYESAQdAzrzIubkQyVblZnFqzDx2FtuVmjNZmqlyP1TQpTSg
7HAwsPNcFi5Ktb0gISKzQSLSKRAVwWLWc3J4blcfdQs28WJT8LjXurr9cM7B
u/2mysRl0lUBoBNegfr6hygD3ajbg9S3YxkO72ztoE2r0ZOcmXH9I0wyzCkp
YjOPzAunV/PV0SqZRc092in8/b1QzzYXjj2+DkcTH5XYejluYUSCJ+teuSei
3UXX
=Trjc
-----END PGP MESSAGE-----
```


### Complete example code decrypting

Variables encryptedData, encryptedEncryptionSecret and pgpPrivatekey (keys.privateKey) can be used from the encryption example

```
import { CryptoUtils } from "./cryptoUtils.provider";

@Component({
    selector: "app-example-decrypt-page",
    templateUrl: "./example-decrypt-page.component.html",
    styleUrls: ["./example-decrypt-page.component.scss"]
})
export class ExampleDecryptPageComponent {

    constructor(
        private cryptoProvider: CryptoProvider
    ) {

    }

    async decryptCredentials(encryptedData: string, encryptedEncryptionSecret: string, pgpPrivatekey: string): Promise<void> {
        const decryptedCredentials = await this.cryptoProvider.decryptCredentials(encryptedData, encryptedEncryptionSecret, pgpPrivatekey);
        console.log("decryptedCredentials:", JSON.stringify(decryptedCredentials));
    }
}
```


### Decryption code output

```
decryptedCredentials:
{
    "credentials": {
        "EPASS": {
            "credentials": {
                "OLDER_THAN_18": {
                    "credentialSubject": {
                        "credential": {
                            "type": "Older Than 18",
                            "value": true
                        }
                    },
                    "expirationDate": "2024-03-21T11:56:55.066312+00:00",
                    "id": "did:didux:0xec81C60208725c09a1E42E448c60aA3A6847BF02",
                    "issuanceDate": "2023-03-22T11:56:55.189631+00:00",
                    "issuer": {
                        "authorityId": "Proofme",
                        "authorityName": "Proofme",
                        "id": "did:didux:0x91a935E503eFAEDF22A4a7941BFAcE25DedE0bf3",
                        "name": "Proofme.ID"
                    },
                    "proof": {
                        "holder": "0xA003FAC350C6fd3a8130E83C85e88E6b978726C0",
                        "nonce": 1679486215189,
                        "signature": "0xcc0d9d0e086cfe9378f4cd6116364c5a8624132272dd4b7588764ce75d760cbf32024b9568f512a33c2b7ca4d7e3bae0d12e99747dc33183aaec6459c4e6ba541b",
                        "type": "ECDSA"
                    },
                    "provider": "EPASS",
                    "type": [
                        "VerifiableCredential",
                        "OlderThan18Credential"
                    ],
                    "version": "1.0.0"
                },
                "PHOTO": {
                    "credentialSubject": {
                        "credential": {
                            "type": "PassportImage",
                            "value": "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"
                        }
                    },
                    "expirationDate": "2024-03-21T11:56:55.066312+00:00",
                    "id": "did:didux:0xec81C60208725c09a1E42E448c60aA3A6847BF02",
                    "issuanceDate": "2023-03-22T11:56:55.089233+00:00",
                    "issuer": {
                        "authorityId": "Proofme",
                        "authorityName": "Proofme",
                        "id": "did:didux:0x91a935E503eFAEDF22A4a7941BFAcE25DedE0bf3",
                        "name": "Proofme.ID"
                    },
                    "proof": {
                        "holder": "0xA003FAC350C6fd3a8130E83C85e88E6b978726C0",
                        "nonce": 1679486215089,
                        "signature": "0x43eda40a7ad7ca016b3c0b038736a6ac038acd1cbe69b4435217dcb6c1bcd88d1579b9f4a4e704ffaf3aa83d8bfa138c659637df48979556c12b12d03d3051ed1b",
                        "type": "ECDSA"
                    },
                    "provider": "EPASS",
                    "type": [
                        "VerifiableCredential",
                        "PassportImageCredential"
                    ],
                    "version": "1.0.0"
                }
            },
            "proof": {
                "holder": "0x4D0f82875570F7dDf78d4C1a406DF6BD2380A472",
                "nonce": 1679577260590,
                "signature": "0x7261d145cb4c9ea4b3cada6185189b78b4ad50c30f3de443b4f2d3853e0ce2a419d61fd86d913b76464915fc7093d68d439b2354617b21c9356cc7cd2fc584441c",
                "type": "ECDSA"
            }
        }
    }
}
```