# Documents API

The Documents API is the base of document signing. It allows you to create and manage document signature intents.

In its simplest form, processing a document requires only three steps: setting up the document to sign with the Create document endpoint, sending the customer to our hosted MyPage, and processing the documents once the signing is completed.

## Endpoints

##### [Create document](/#/document/v1/api_intro.md)
`POST /v1/document`

Create a new document signature intent.

##### [Get document list](/#/document/v1/api_intro.md)
`GET /v1/document`

Retrieve a list of all document signing intents.

##### [Get document details](/#/document/v1/api_intro.md)
`GET /v1/document/:id`

Retrieve document details.

##### [Download document](/#/document/v1/api_intro.md)
`GET /v1/document/download/:id`

Retrieve the (encrypted) document.

##### [Delete document](/#/document/v1/delete_document.md)
`DELETE /v1/document/:id`

Revoke a specific document intent.