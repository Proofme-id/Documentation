# Get identification
`GET /v1/identification/*id*`

Gets a single identification by its ID.

## Parameters
___
#### id
_string_ `REQUIRED`

The ID of the identification you want to get.
___


## Response

`200` application/json  
An identification object is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X GET https://api.proofme.app/v1/identification/12345 \
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
        "proofmeId": "pr_12345",
        "scannedAt": null,
        "createdAt": "2022-01-01T12:00:00+00:00",
        "updatedAt": "2022-01-01T12:00:00+00:00"
    }
}

```