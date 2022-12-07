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
curl -X GET https://api.proofme.id/v1/identification/cb04b19b-e157-46ec-ba8d-1fba17828a5b \
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
        }
    }
}

```