# Get identification
`GET /v1/identification/data/*id*`

Gets a single identification's data by its ID.

## Parameters
___
#### id
_string_ `REQUIRED`

The ID of the identification you want to get.

___
#### organisationId
_string_ `REQUIRED`

The ID of the organisation you want to get the identification from.

___


## Response

`200` application/json  
An identification object with data is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X GET https://api.proofme.id/v1/identification/data/12345 \
    -H "Authorization: proofme_cFC70rNLNpL8y3C24u3eJLvtmFPBd4B0" \
    -d "organisationId=dc1d8dc2-a5b9-4c9d-b855-7024d1d93ca8" \
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "identification": {
        "id": "cb04b19b-e157-46ec-ba8d-1fba17828a5b",
        "organisationId": "39ae2443-936b-4fc3-a0cd-bc04f2563535",
        "proofmeId": "03682de3-b51c-451c-b50e-1977a332c9f2",
        "description": "Identification #1",
        "status": "SUCCESS",
        "isRequest": false,
        "redirectUrl": "https://your-application.example.org/redirect/",
        "webhookUrl": "https://your-application.example.org/webhook/",
        "myPageUrl": "https://your-application.proofme.id/cb04b19b-e157-46ec-ba8d-1fba17828a5b",
        "metadata": null,
        "mode": "live",
        "scannedAt": null,
        "createdAt": "2022-01-01T12:00:00+00:00",
        "updatedAt": "2022-01-01T12:00:00+00:00",
        "proofme": {
            "id": "03682de3-b51c-451c-b50e-1977a332c9f2",
            "name": "Proofme",
            "organisationId": "39ae2443-936b-4fc3-a0cd-bc04f2563535",
            "requestedCredentials": {
                "purpose": "ACCESS_CONTROL",
                "requester": "Proofme",
                "storage": "NOT_STORED",
                "credentials": [
                    {
                        "key": "FIRST_NAME",
                        "provider": "EPASS",
                        "required": true,    
                    }
                ]
            }
        },
        "data": {
            "result": {
                "credentials": {
                    "EMAIL": {
                        "credentials": {
                            "EMAIL": {
                                "credentialSubject": {
                                    "credential": {
                                        "type": "Email",
                                        "value": "John@doe.gmail.com"
                                    },
                                    "expirationDate": "2020-01-01T00:00:00.000Z",
                                    "id": "did:didux:0x0000000000000000000000000000000000000000",
                                    "issuanceDate": "2020-01-01T00:00:00.000Z",
                                    "issuer": {
                                        "authorityId": "Proofme",
                                        "authorityName": "Proofme",
                                        "id": "did:didux:0x0000000000000000000000000000000000000000",
                                        "name": "Proofme"
                                    },
                                    "proof": {
                                        "holder": "0x0000000000000000000000000000000000000000",
                                        "nonce": 0000000000000,
                                        "type": "ECDSA",
                                    },
                                    "provider": "EMAIL",
                                    "type": "VerifiableCredential",
                                    "version": "1.0.0"
                                }
                            }
                        }, 
                        "proof": {
                            "holder": "0x0000000000000000000000000000000000000000",
                            "nonce": 0000000000000,
                            "type": "ECDSA",
                        }
                    }
                }
            },
            "id": "d473af18-0394-44a9-83a5-7b5bdb746c4d",
            "identificationId": "cb04b19b-e157-46ec-ba8d-1fba17828a5b",
            "storage": "NOT_STORED",
            "createdAt": "2022-01-01T12:00:00+00:00",
            "updatedAt": "2022-01-01T12:00:00+00:00"
        },
        "scannedAt": "2020-01-01T00:00:00.000Z",
        "createdAt": "2022-01-01T12:00:00+00:00",
        "updatedAt": "2022-01-01T12:00:00+00:00"
    }
}

```