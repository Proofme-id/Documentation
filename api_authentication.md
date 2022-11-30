# Authentication

## Getting started

The Proofme API offers two authentication methods:

- Signature keys: Public/Private key combination for extra security
- API keys: basic API access for a specific service.

We recommend using Signature keys for the best security.

## Creating authentication keys

The first thing you need is a service profile. Each service profile has a Live authentication key and a Test authentication key.

While building and testing your integration, you should use the Test authentication key. Read more about the test mode in our guide about testing the Proofme API. Once you are ready to start processing real identifications, switch out your test key for the Live authentication key.

Of course it’s very important to keep any authentication keys secure. Do not ever share them. However, if a key leaks you can always regenerate it. Do not forget to apply new keys to your code. Until you do your integration will not work.

## Authenticating an API call

The API key or token must be sent along with each API request, by providing it in the HTTP call’s Authorization header using the Bearer method. For example: a valid Authorization header is Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM. Our default API clients provide shortcuts to easily set the API key or access token.

In the example below we use a Test API key on the GET method of the identification resource. This method fetches a request - in this case the request with the fictional request ID tr_WDqYK6vllg.

```bash
curl -X GET https://api.proofme.id/v1/request/tr_WDqYK6vllg \
    -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM"
```

The response will be JSON.

```json
HTTP/1.1 200 OK
Content-Type: application/hal+json

{
    "resource": "identify",
    "id": "tr_WDqYK6vllg",
    "mode": "test",
    "createdAt": "2018-03-12T11:51:35+00:00",
    "description": "Order 66",
    "method": null,
    "metadata": null,
    "status": "open",
    "isCancelable": false,
    "expiresAt": "2018-03-12T12:06:35+00:00",
    "details": null,
    "profileId": "pfl_7N5qjbu42V",
    "sequenceType": "oneoff",
    "redirectUrl": "https://www.example.org/payment/completed",
    "_links": {
        "self": {
            "href": "https://api.proofme.id/v1/request/tr_WDqYK6vllg"
        },
        "MyPage": {
            "href": "https://secure.proofme.id/WDqYK6vllg"
        }
    }
}
```