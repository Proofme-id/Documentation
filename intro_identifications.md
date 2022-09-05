# Identifications

> WIP

With Proofme, accepting Identifications is a breeze.
We provide a hosted checkout for simple implementations, but also support own-hosted implementations.

Do you want to build an integration yourself instead? Look at our complete installation flow.

## Basic identification flow

In its simplest form, setting up a **identification** requires only three steps: 
  * setting up the request with our API
  * sending the customer to our hosted checkout
  * processing the webhook we send once the identification is completed.

You can find an example of the hosted checkout in our demo environment.

You can also opt for a deeper integration. Please refer to our guide on building your own checkout to dive into how the Proofme checkout flow can be fully integrated.

You rather have your own hosted environment? Please refer to our installation guide on how to setup your own complete environment.

Either way, from your customer’s perspective, the journey looks roughly as follows. Depending on the request, additional information may have to be shared by your customer.

```websequencediagrams
title Basic identification flow
actor Customer
participant Your application
participant Proofme

note over Customer: Your customer needs to identify
Customer->Your application: 
note over Your application: Your checkout screen
Your application->Proofme:Click on checkout
note over Proofme: Our checkout screen
note over Proofme: Customer Identifies
Proofme->Your application:
note over Your application: Success screen
```
> TODO! Replace diagram with nice image

## Working with the Proofme API

To make the basic payment flow explained above a bit more concrete, here is the same flow, step by step, from a programmer’s perspective.

> TODO! Add nice image

1. A customer on your website/application decides to checkout.
2. Your website creates a payment on the Proofme platform by calling the Identification API with the identification details and description, and with a URL we should redirect the customer to after the identifications is made.
The API responds with the unique ID and the unique checkout URL for the newly created request. Your website stores the id, links it to the customer’s order and redirects the customer to the checkout URL.
3. The customer reaches the checkout and identifies. This process is entirely taken care of by Proofme. You do not have to do anything here.
4. When the identification is made, Proofme will send you a webhook informing your website about the status change. You can configure the webhook URL per request in the API request.
In response to your webhook being called your application just needs to issue a 200 OK status. From that response Proofme can tell that your processing of the new status was successful – for any other response we keep trying.
5. When your website processes the webhook, it fetches the identification status from the Proofme API. Once the status is completed, your website can send out a confirmation email to the customer and start the order fulfilment.
6. At this point Proofme returns the visitor to your website using the redirect URL specified when the request was created. Your website usually already knows the payment was successful, and thanks the customer.

## Tracking your identification reference

In the example above we assume you will store the unique identification id in your database. This way your website is able to lookup the order for this payment when the webhook is triggered by Proofme. Storing it yourself is the easiest way to keep a link between the Proofme identification reference and your website’s order reference.

Alternatively, we can store your identification reference — or any other ‘meta data’ — for you. Simply pass along the data with the request using the metadata field in the Proofme API and we will store it with the identification. Everytime you retrieve the identification from the Proofme API, we will show the metadata field as well.
