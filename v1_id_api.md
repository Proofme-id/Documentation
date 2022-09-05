# Identification API

The Identification API is at the heart of the Proofme API. It allows you to create and manage Identification intents. This is where most Identifications start off.

In its simplest form, processing an identification requires only three steps: setting up the identification with the Create identification endpoint, sending the customer to our hosted checkout, and processing the webhook we send once the identification is completed.

Please refer to [Identifications](intro_identifications.md) for a step-by-step guide on implementing the Identification API.

## Endpoints

##### [Create identification](v1_id_api_create_request.md)
`POST /v1/identification`

Create a new identification intent.

##### Get identification
`GET /v1/identification/*id*`

Retrieve a specific identification intent.

##### Update identification
`PATCH /v1/identification/*id*`

Update a specific identification intent.

##### Cancel identification
`DELETE /v1/identification/*id*`

Cancel a specific identification intent.

##### List identification
`GET /v1/identification`

Retrieve a list of all identification intents.