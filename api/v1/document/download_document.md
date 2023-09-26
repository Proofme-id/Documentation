# Download document
`GET /v1/document/download/:id`

Get the download details by document ID.

## Parameters
___
#### documentId
_string_ `REQUIRED`

The ID of the document you would like to download.

## Response

`200` application/json  
An document object with download details is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X 'GET' https://api.proofme.id/v1/document/download/0e88cf4e-8020-422c-8e61-e26a00e7d7e3 \
  -H 'authorization: <JWT or apikey>'
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 Created
Content-Type: application/json

{
  "documentDownloadUrl": "https://ipsp-development-private.s3.eu-central-1.amazonaws.com/..../data.pdf",
  "documentName": "data.pdf",
  "encryptedInitialVector": "-----BEGIN PGP MESSAGE-----\n...........\n-----END PGP MESSAGE-----\n",
  "encryptedDocumentSecret": "-----BEGIN PGP MESSAGE-----\n............\n-----END PGP MESSAGE-----\n",
  "documentSignaturesFile": null
}

```