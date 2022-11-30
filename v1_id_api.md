# Identification API

The Identification API is at the heart of the Proofme API. It allows you to create and manage Identification intents. This is where most Identifications start off.

In its simplest form, processing an identification requires only three steps: setting up the identification with the Create identification endpoint, sending the customer to our hosted MyPage, and processing the webhook we send once the identification is completed.

Please refer to [Identifications](intro_identifications.md) for a step-by-step guide on implementing the Identification API.

## Endpoints

##### [Create identification](v1_id_api_create_identification.md)
`POST /v1/identification`

Create a new identification intent.

##### [Get identification list](v1_id_api_get_identification_list.md)
`GET /v1/identification`

Retrieve a list of all identification intents.

##### [Get identification](v1_id_api_get_identification.md)
`GET /v1/identification/*id*`

Retrieve a specific identification intent.

##### [Get identification data](v1_id_api_get_identification_data.md)
`GET /v1/identification/data/*id*`

Retrieve the data associated with a specific identification intent.

##### [Revoke identification](v1_id_api_delete_identification.md)
`DELETE /v1/identification/*id*`

Revoke a specific identification intent.