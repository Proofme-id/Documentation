# Get document list
`GET /v1/document`

Get all document intents for your organisation.

<!-- ## Parameters
___
#### sortColumn
_string_ `OPTIONAL`

The column to sort the identifications by.

Possible values: `id` `description` `status` `isRequest` `createdAt` `updatedAt`

____
#### sortDirection
_string_ `OPTIONAL`

The direction to sort the identifications by.

Possible values: `ASC` `DESC`

____
#### offset
_number_ `OPTIONAL`

The amount of identifications to skip before returning the first identification.

____
#### limit
_number_ `OPTIONAL`

The maximum amount of identifications to return.

____
#### search
_string_ `OPTIONAL`

The search query to filter the identifications by.

This will search in the columns: `id` `description`
___ -->


## Response

`200` application/json  
A list of identification objects is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X 'GET' https://api.proofme.id/v1/document \
    -H 'authorization: <JWT or apikey>'
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "count": 2,
    "rows":  [
    {
      "id": "1175ddb7-4c38-4769-a7bd-c9f23a79b887",
      "verificationLevel": "EMAIL",
      "message": "Some random message",
      "documentName": "data.pdf",
      "myPageUrl": "https://your-application.proofme.app/sign/1175ddb7-4c38-4769-a7bd-c9f23a79b887",
      "documentStatus": "PENDING",
      "mimeType": "application/pdf",
      "createdBy": "Document Apikey",
      "fingerprint": "87e3ee65d5774f4bacf504b08641ce4f69bd5b020dc3b004fb78ec2f131a9ff7b22771d663db53033071373ba47a48d7beb4bd8e363ffb04b7c6b7931737e74c",
      "size": 2810173,
      "createdAt": "2023-09-14T11:27:54.229Z",
      "documentLocation": "organisation/cb86df0e-36eb-4bc9-82ec-0856cbdeb2a2/docs/1175ddb7-4c38-4769-a7bd-c9f23a79b887",
      "userDocument": [
        {
          "message": null,
          "signStatus": "PENDING",
          "updatedAt": "2023-09-14T11:27:56.284Z",
          "user": {
            "email": "customer@example.io",
            "did": null,
            "firstName": null,
            "lastName": null
          }
        }
      ]
    },
    {
      "id": "0e88cf4e-8020-422c-8e61-e26a00e7d7e3",
      "verificationLevel": "EMAIL",
      "message": "Some random message",
      "documentName": "data.pdf",
      "myPageUrl": "https://your-application.proofme.app/sign/0e88cf4e-8020-422c-8e61-e26a00e7d7e3",
      "documentStatus": "PENDING",
      "mimeType": "application/pdf",
      "createdBy": "Document Apikey",
      "fingerprint": "87e3ee65d5774f4bacf504b08641ce4f69bd5b020dc3b004fb78ec2f131a9ff7b22771d663db53033071373ba47a48d7beb4bd8e363ffb04b7c6b7931737e74c",
      "size": 2810173,
      "createdAt": "2023-09-14T10:59:32.083Z",
      "documentLocation": "organisation/cb86df0e-36eb-4bc9-82ec-0856cbdeb2a2/docs/0e88cf4e-8020-422c-8e61-e26a00e7d7e3",
      "userDocument": [
        {
          "message": null,
          "signStatus": "PENDING",
          "updatedAt": "2023-09-14T10:59:32.125Z",
          "user": {
            "email": "example@customer.io",
            "did": null,
            "firstName": null,
            "lastName": null
          }
        }
      ]
    }
  ]
}
```
