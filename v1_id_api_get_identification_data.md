# Get identification
`GET /v1/identification/data/*id*`

Gets a single identification's data by its ID.

## Parameters
___
#### id
_string_ `REQUIRED`

The ID of the identification you want to get.

___
#### orgnisationId
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
curl -X GET https://api.proofme.app/v1/identification/data/12345 \
    -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
    -d "orgnisationId=12345" \
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "identification": {
        "id": "12345",
        "description": "Identification #12345",
        "isRequest": true,
        "status": 0,
        "organisationId": "organisationId_12345",
        "proofmeId": "pr_12345",
        "proofme": {
            "id": "pr_12345",
            "name": "Proofme",
            "organisationId": "org_12345",
            "deletedAt": null,
            "requestedCredentials": {
                "purpose": "ACCESS_CONTROL",
                "requester": "Proofme",
                "storage": "NOT_STORED",
                "proof": {
                    "holder": "0x0000000000000000000000000000000000000000",
                    "nonce": 0000000000000,
                    "type": "ECDSA",
                },
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
            "data": {
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
                                        "authorityId": "Proofme.ID",
                                        "authorityName": "Proofme.ID",
                                        "id": "did:didux:0x0000000000000000000000000000000000000000",
                                        "name": "Proofme.ID"
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
            "id": "d_12345",
            "identificationId": "12345",
            "STORAGE": "CERTIFICATE",
            "createdAt": "2022-01-01T12:00:00+00:00",
            "updatedAt": "2022-01-01T12:00:00+00:00"
        },
        "scannedAt": "2020-01-01T00:00:00.000Z",
        "createdAt": "2022-01-01T12:00:00+00:00",
        "updatedAt": "2022-01-01T12:00:00+00:00"
    }
}

```