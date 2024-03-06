# Create identification
`POST /v1/identification`

Create a new identification intent, this is where most identification implementations start off.

Once you have created an identification, you should redirect your customer to the URL in the `MyPageUrl` property from the response.

To wrap your head around the identification process, an explanation and flow charts can be found in the [Identifications](intro/identifications.md) guide.

## Parameters
___
#### proofmeId
_string_ `REQUIRED`

The ID of the Proofme you have created before.

___
#### description
_string_ `OPTIONAL`

The description of the identification you are creating. This will be shown to your customer on their MyPage. The description is also visible in any exports you generate.
We recommend you use a unique identifier so that you can always link the identification to the order in your Dashboard. This is particularly useful for bookkeeping.
The maximum length of the description field is 255 characters. The API will not reject strings longer than the maximum length but it will truncate them to fit.

____
#### redirectUrl
_string_ `OPTIONAL`

The URL your customer will be redirected to after the identification process.
It could make sense for the redirectUrl to contain a unique identifier – like your order ID – so you can show the right page referencing the order when your customer returns.

____
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
___
#### notify
_object_ `OPTIONAL`

Define a hashed key to send a notification to that user. Hashed key may be any of the following or combined:
* hashedPhonenumber
* hashedEmail
* hashedDid
* hashedPublicKey

Example:
```
"notify": {
    "hashedPhonenumber": "4c0fe29edc91206df827fb98262f09429ddc0e650ae498f2f06bec1b36563dc1"
}
```

___


## Response

`201` application/json  
An identification object is returned, as described in [Get identification](/api/v1/identification/get_identification.md).

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X POST https://api.proofme.id/v1/identification \
   -H 'authorization: <JWT or apikey>' \
   -d "description=New description" \
   -d "proofmeId=03682de3-b51c-451c-b50e-1977a332c9f2" \
   -d "redirectUrl=https://your-application.example.org/redirect/" \
   -d "webhookUrl=https://your-application.example.org/webhook/" \
   -d "metadata={\"my-data\": 12345}" \
   -d "testmode=true"
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
    "identification": {
        "organisationId": "dc1d8dc2-a5b9-4c9d-b855-7024d1d93ca8",
        "id": "32daaa56-377f-4db9-acd7-fae2e327421e",
        "proofmeId": "03682de3-b51c-451c-b50e-1977a332c9f2",
        "proofmeRevision": 1,
        "description": "New description",
        "isRequest": true,
        "status": "PENDING",
        "redirectUrl": "https://your-application.example.org/redirect/",
        "webhookUrl": "https://your-application.example.org/webhook/",
        "metadata": {
            "my-data": 12345
        },
        "mode": "test",
        "notify": null,
        "myPageUrl": "https://your-application.proofme.id/32daaa56-377f-4db9-acd7-fae2e327421e",
        "updatedAt": "2022-01-01T12:00:00+00:00",
        "createdAt": "2022-01-01T12:00:00+00:00",
        "scannedAt": null
    }
}

```