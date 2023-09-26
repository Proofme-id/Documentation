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

A message to send  of the identification you are creating. This will be shown to your customer on their MyPage. The description is also visible in any exports you generate.
We recommend you use a unique identifier so that you can always link the identification to the order in your Dashboard. This is particularly useful for bookkeeping.
The maximum length of the description field is 255 characters. The API will not reject strings longer than the maximum length but it will truncate them to fit.


<!-- ____
#### webhookUrl
_string_ `OPTIONAL`

Set the webhook URL, where we will send identification status updates to.
The webhookUrl is optional, but without a webhook you will miss out on important status changes to your identification.

The webhookUrl must be reachable from Proofme's point of view, so you cannot use localhost. If you want to use webhook during development on localhost, you must use a tool like ngrok to have the webhooks delivered to your local machine.

____
#### metadata
_mixed_ `OPTIONAL`

Provide any data you like, for example a string or a JSON object. We will save the data alongside the identification. Whenever you fetch the identification with our API, we will also include the metadata.
___
#### testmode
_boolean_ `OPTIONAL`

Set this to `true` to make this identification a test identification.  
Default value `false`
___ -->


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
  -F 'emails=test@test.com,somebody@example.com'
```
<!-- TODO -->
<!-- METADATA!!! -->
<!-- -F "webhookUrl=https://your-application.example.org/webhook/" \ -->
<!-- -F "testmode=true" -->

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