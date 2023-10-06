# Get (encrypted) identification data
`GET /v1/identification/data/:id`

Gets the identification data by its ID.

## Parameters
___
#### id
_string_ `REQUIRED`

The ID of the identification you want to get.

___

## Encrypted

Please note the identification data is encrypted. Refer to this page for more information about encryption/decryption: [encryption overview](encryption/overview.md)

___
## Response

`200` application/json  
An identification object with data is returned.

## NOTE
The key `identificationData` is `null` when the identification `status` is still `"PENDING"`

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X GET https://api.proofme.id/v1/identification/data/12345 \
    -H "Authorization: proofme_cFC70rNLNpL8y3C24u3eJLvtmFPBd4B0"
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
        "proofmeRevision": 1,
        "description": "Identification #1",
        "scannedAt": null,
        "status": "SUCCESS",
        "isRequest": false,
        "redirectUrl": "https://your-application.example.org/redirect/",
        "webhookUrl": "https://your-application.example.org/webhook/",
        "myPageUrl": "https://your-application.proofme.id/cb04b19b-e157-46ec-ba8d-1fba17828a5b",
        "metadata": null,
        "mode": "live",
        "notify": null,
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
                        "provider": "EPASS",
                        "key": "OLDER_THAN_18",
                        "required": true
                    },
                    {
                        "provider": "EPASS",
                        "key": "PHOTO",
                        "required": true
                    }
                ],
                "proof": {
                    "holder": "0x3Eca4AF267bC035Dd0DAdEBe3E7263a6168478c5",
                    "nonce": 1679565405432,
                    "type": "ECDSA"
                },
                "purpose": "AGE_VERIFICATION",
                "requester": "Proofme",
                "storage": "DATABASE"
            }
        },
        "identificationData": {
            "id": "4b3d9159-4574-4df2-847d-839f2348b483",
            "identificationId": "e5198af4-09df-47dc-9ed7-51aef8b5c503",
            "encryptedData": "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",
            "encryptedEncryptionSecret": "-----BEGIN PGP MESSAGE-----\n\nwV4DF/+sVALDSR0SAQdAc/Ns12fegs97lJxHO4c4yy+fW1r8cwoIUnW6/tNT\nPyIws3FWhF3z76hpOSXV6GBC+3q1l3cvVVAl89nbhtsMtXPmFWldFlF0lcRF\nWfiMA+sVwV4Dn872q4T7yxQSAQdA/j38MwkcKzf8bMndcui2X1UTkafEt6+0\n0WNA3OzQTCowRrWQgz1GJgGBlnTd+bSbiVw11v8kf4X0TyctEQT5YaSY5Dfx\naWNBlPPTvZqY37DAwV4Dd69eEU0AmBUSAQdAJyJTaOu9+la0MOPctr3nCcfg\no8M3PBXL7uqJ3K248Xcwp6XHhTwxLJttH6FQtgaSeqokbsp89j/S9KZ0v80h\nTFNEvetDQpCsHoyu36ogSRyBwV4D1is0jCAPUy0SAQdAWVsfJwcs0CPGSfPW\nSKb0WXzXqDhqJSn9R9LHlzz6zCgwFWWVe65aguV+6GiBHBTjvxn1F+63tB5m\noHP3iz71vXzI5mGKGvO8SvlUMeY8qMUH0lUBY6qaKOVBvSI1jFkt4g1LVu8I\nySdSdRBc4d6tyIbCRy6m8+HH/4g2vZOO6CumKHjMF+5OfDmiR9tkzldmZcct\nNdBL8KgFzsGg+K4iGwTG4F9/Vxtr\n=28TC\n-----END PGP MESSAGE-----\n",
            "storage": "DATABASE",
            "additionalInfo": [],
            "destroyDate": null,
            "encryptionMode": "GCM",
            "createdAt": "2022-01-01T12:00:00+00:00",
            "updatedAt": "2022-01-01T12:00:00+00:00"
        }
    }
}

```