# Webhooks

Webhooks are used to process real-time status updates, for example when an identification took place. It is a URL Proofme will call with the ID of the updated object. When Proofme calls your webhook, you should fetch the latest status and process it if the status was changed.

## Example
The most important example of a webhook is when an identification took place. If you created the identification with a webhook URL, we will call that webhook URL with a single POST-parameter called `id` and a value of for example `ua3-ams-prd-1692971978.15306111`. The script behind your webhook URL should use that ID to fetch the identification status and act accordingly. If the new status is `completed` you can finish the process.

```bash
POST /orders/webhook HTTP/1.0
Host: webshop.example.org
Via: 1.1 tinyproxy (tinyproxy/1.8.3)
Content-Type: application/json
Accept: */*
Accept-Encoding: deflate, gzip
Content-Length: 54

{
    "id": "ua3-ams-prd-1692971978.15306111"
}
```

It might seem a little cumbersome that we do not post the new status immediately, but proper security dictates this flow. Since the status is not transmitted in the webhook, fake calls to your webhook will never result in orders being processed without being actually updated.

More examples are available in the documentation of the Proofme API client you are using.

## Retry schema
In response to Proofme calling your webhook, you only have to return the HTTP status 200 OK. Mollie then knows your system correctly processed the request. In case you return a different status – let’s say because there’s a temporary problem with your hosting service – we will keep trying for a few hours, allowing you to process the request later on after your hosting service has been restored.

Our webhook calls time out after 15 seconds. Even if you return a 200 OK HTTP status after 16 seconds, we will mark the webhook call as failed and try again later.

In total we will call your webhook 10 times with an increasing interval. If after the 10th call we still do not get a 200 OK response (which is after 26 hours), we will stop trying.

## How to handle unknown IDs?
To not leak any information to malicious third parties, it is recommended to return a 200 OK response even if the ID is not known to your system.

## What IPs will the webhook requests be originating from?
Read our support article for more information on the IP addresses that Proofme uses.

## Redirecting webhook calls
When our call to the webhook URL gets redirected with a 301 Moved Permanently or 302 Found response the request changes from POST to get. This causes the POST payload to drop of the webhook call. The solution is to redirect using a 307 Temporary Redirect or 308 Permanent Redirect response.