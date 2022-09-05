# Create identification
`POST /v1/identification`

Create a new identification intent, this is where most identification implementations start off.

Once you have created an identification, you should redirect your customer to the URL in the `checkoutUrl` property from the response.

To wrap your head around the identification process, an explanation and flow charts can be found in the [Identifications](intro_identifications.md) guide.

## Parameters
___
#### proofme 
_string_ `REQUIRED`
The proofme template ID you have configured in the backoffice.

___
#### description
_string_ `REQUIRED`

The description of the identification you are creating. This will be shown to your customer on their checkout. The description is also visible in any exports you generate.
We recommend you use a unique identifier so that you can always link the identification to the order in your back office. This is particularly useful for bookkeeping.
The maximum length of the description field is 255 characters. The API will not reject strings longer than the maximum length but it will truncate them to fit.

____
#### redirectUrl
_string_ `REQUIRED`

The URL your customer will be redirected to after the identification process.
It could make sense for the redirectUrl to contain a unique identifier – like your order ID – so you can show the right page referencing the order when your customer returns.

____
#### webhookUrl
_string_ `OPTIONAL`

Set the webhook URL, where we will send identification status updates to.
The webhookUrl is optional, but without a webhook you will miss out on important status changes to your identification.

The webhookUrl must be reachable from Proofme's point of view, so you cannot use localhost. If you want to use webhook during development on localhost, you must use a tool like ngrok to have the webhooks delivered to your local machine.

____
#### locale
_string_ `OPTIONAL`

!> Not yet implemented

Allows you to preset the language to be used in the hosted checkout pages shown to the consumer. Setting a locale is highly recommended and will greatly improve your conversion rate. When this parameter is omitted, the browser language will be used instead. You can provide any xx_XX format ISO 15897 locale, but our hosted identification pages currently only support the following languages:

Possible values: `en_US` `en_GB` `nl_NL` `nl_BE`

____
#### metadata
_mixed_ `OPTIONAL`

!> Not yet implemented

Provide any data you like, for example a string or a JSON object. We will save the data alongside the identification. Whenever you fetch the identification with our API, we will also include the metadata.
___
#### testmode
_boolean_ `OPTIONAL`

Set this to `true` to make this identification a test identification.  
Default value `false`
___


## Response

`201` application/json  
An identification object is returned, as described in [Get identification](v1_id_api_get_request.md).

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X POST https://api.proofme.app/v1/identification \
   -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
   -d "description=Order #12345" \
   -d "proofme=pr_123412" \
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
    "id": "id_uniqueIdentificationId1234",
    "mode": "test",
    "proofme": "pr_123412",
    "metadata": {
        "my-data": 12345
    },
    "status": "open",
    "redirectUrl": "https://your-application.example.org/identification/12345/",
    "webhookUrl": "https://your-application.example.org/webhook/",
    "checkoutUrl": "https://your-application.proofme.app/id_uniqueIdentificationId1234",
}

```