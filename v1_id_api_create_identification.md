# Create identification
`POST /v1/identification`

Create a new identification intent, this is where most identification implementations start off.

Once you have created an identification, you should redirect your customer to the URL in the `MyPageUrl` property from the response.

To wrap your head around the identification process, an explanation and flow charts can be found in the [Identifications](intro_identifications.md) guide.

## Parameters
___
#### proofmeId
_string_ `REQUIRED`

The ID of the Proofme you have created before.

___
#### organisationId
_string_ `REQUIRED`

The organisation ID in which you want to create the identification.

___
#### description
_string_ `OPTIONAL`

The description of the identification you are creating. This will be shown to your customer on their MyPage. The description is also visible in any exports you generate.
We recommend you use a unique identifier so that you can always link the identification to the order in your Dashboard. This is particularly useful for bookkeeping.
The maximum length of the description field is 255 characters. The API will not reject strings longer than the maximum length but it will truncate them to fit.

____
#### redirectUrl
_string_ `REQUIRED`

!> Not yet implemented

The URL your customer will be redirected to after the identification process.
It could make sense for the redirectUrl to contain a unique identifier – like your order ID – so you can show the right page referencing the order when your customer returns.

____
#### webhookUrl
_string_ `OPTIONAL`

!> Not yet implemented

Set the webhook URL, where we will send identification status updates to.
The webhookUrl is optional, but without a webhook you will miss out on important status changes to your identification.

The webhookUrl must be reachable from Proofme's point of view, so you cannot use localhost. If you want to use webhook during development on localhost, you must use a tool like ngrok to have the webhooks delivered to your local machine.

____
#### locale
_string_ `OPTIONAL`

!> Not yet implemented

Allows you to preset the language to be used in the hosted MyPage pages shown to the consumer. Setting a locale is highly recommended and will greatly improve your conversion rate. When this parameter is omitted, the browser language will be used instead. You can provide any xx_XX format ISO 15897 locale, but our hosted identification pages currently only support the following languages:

Possible values: `en_US` `en_GB` `nl_NL` `nl_BE`

____
#### metadata
_mixed_ `OPTIONAL`

!> Not yet implemented

Provide any data you like, for example a string or a JSON object. We will save the data alongside the identification. Whenever you fetch the identification with our API, we will also include the metadata.
___
#### testmode
_boolean_ `OPTIONAL`

!> Not yet implemented

Set this to `true` to make this identification a test identification.  
Default value `false`
___


## Response

`201` application/json  
An identification object is returned, as described in [Get identification](v1_id_api_get_identification.md).

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X POST https://api.proofme.app/v1/identification \
   -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
   -d "description=Identification #12345" \
   -d "proofmeId=pr_12345" \
   -d "organisationId=org_12345" \
   -d "redirectUrl=https://your-application.example.org/identification/12345/" \
   -d "webhookUrl=https://your-application.example.org/webhook/" \
   -d "metadata={\"my-data\": 12345}"
   -d "testmode=true"
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
    "resource": "identification",
    "id": "id_uniqueIdentificationId12345",
    "mode": "test",
    "proofmeId": "pr_12345",
    "organisationId": "org_12345",
    "status": "0",
    "description": "Identification #12345",
    "isRequest": true,
    "metadata": {
        "my-data": 12345
    },
    "redirectUrl": "https://your-application.example.org/identification/12345/",
    "webhookUrl": "https://your-application.example.org/webhook/",
    "myPageUrl": "https://your-application.proofme.app/id_uniqueIdentificationId1234",
    "createdAt": "2022-01-01T12:00:00+00:00",
    "updatedAt": "2022-01-01T12:00:00+00:00"
}

```