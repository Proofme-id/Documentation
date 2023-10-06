# Get document details
`GET /v1/document/:id`

Gets a single document details by its ID.

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
curl -X 'GET' https://api.proofme.id/v1/document/1175ddb7-4c38-4769-a7bd-c9f23a79b887 \
  -H 'authorization: <JWT or apikey>'
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "document": {
    "id": "1175ddb7-4c38-4769-a7bd-c9f23a79b887",
    "verificationLevel": "EMAIL",
    "message": "Your personal message",
    "documentLocation": "organisation/da4a743f-19c8-4515-b686-eec8288e1c3e/docs/1175ddb7-4c38-4769-a7bd-c9f23a79b887",
    "documentName": "data.pdf",
    "myPageUrl": "https://your-application.proofme.app/sign/0e88cf4e-8020-422c-8e61-e26a00e7d7e3",
    "documentStatus": "PENDING",
    "mimeType": "application/pdf",
    "createdBy": "Apikey",
    "fingerprint": "87e3ee65d5774f4bacf504b08641ce4f69bd5b020dc3b004fb78ec2f131a9ff7b22771d663db53033071373ba47a48d7beb4bd8e363ffb04b7c6b7931737e74c",
    "size": 2810173,
    "createdAt": "2023-09-14T11:27:54.229Z",
    "updatedAt": "2023-09-14T11:27:54.229Z",
    "encryptedDocumentSecret": "-----BEGIN PGP MESSAGE-----\n........\n-----END PGP MESSAGE-----\n",
    "encryptedInitialVector": "-----BEGIN PGP MESSAGE-----\n........\n-----END PGP MESSAGE-----\n",
    "userDocument": [
      {
        "message": null,
        "signStatus": "PENDING",
        "updatedAt": "2023-09-14T11:27:54.241Z",
        "user": {
          "email": "example@example.io",
          "did": null,
          "firstName": null,
          "lastName": null
        }
      }
    ]
  },
  "documentDownloadUrl": "https://ipsp-development-private.s3.eu-central-1.amazonaws.com/..../data.pdf"
}

```