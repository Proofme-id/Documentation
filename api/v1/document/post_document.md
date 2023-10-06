# Create document
`POST /v1/document`

Create a new document sign intent, this is where most signature implementations start off.

Once you have created an document, you should redirect your customer to the URL in the `MyPageUrl` property from the response.

## FormData Parameters
___
#### file
_file_ `REQUIRED`

Send the file to sign

___
#### verificationLevel
_file_ `REQUIRED`

The signatures verification level. Can be `EMAIL` or `EPASS`

___
#### emails
_string_ `REQUIRED`

A comma-separated list of email addresses to sign the document. If you need to sign the document too, make sure to include your own email address.

___
#### message
_string_ `OPTIONAL`

A message to send of the document you are creating. This will be shown to your customer in the invitation email. The message is also visible in any exports you generate.

____
#### webhookUrl
_string_ `OPTIONAL`

Set the webhook URL, where we will send document status updates to.
The webhookUrl is optional, but without a webhook you will miss out on important status changes to your documentation.

The webhookUrl must be reachable from Proofme's point of view, so you cannot use localhost. If you want to use webhook during development on localhost, you must use a tool like ngrok to have the webhooks delivered to your local machine.

____
#### metadata
_mixed_ `OPTIONAL`

Provide any data you like, for example a string or a JSON object. We will save the data alongside the document. Whenever you fetch the document with our API, we will also include the metadata.
___
#### testmode
_boolean_ `OPTIONAL`

Set this to `true` to make this document a test document.  
Default value `false`
___


## Response

`200` application/json  
A documentId is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X 'POST' https://api.proofme.id/v1/document \
  -H 'authorization: <JWT or apikey>' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=data.pdf;type=application/pdf' \
  -F 'verificationLevel=EMAIL' \
  -F 'message=Some random message' \
  -F 'emails=test@test.com,somebody@example.com' \
  -F 'webhookUrl=https://your-application.example.org/webhook/'' \
  -F 'metadata={ "my-data" : 12345}' \
  -F 'testmode=true'
```


<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 Created
Content-Type: application/json

{
  "documentId": "0e88cf4e-8020-422c-8e61-e26a00e7d7e3",
  "myPageUrl": "https://your-application.proofme.app/sign/0e88cf4e-8020-422c-8e61-e26a00e7d7e3"
}

```