# Get identification list
`GET /v1/identification`

Get all created and public identifications done through the MyPage of your organisation.

## Parameters
___
#### organisationId
_string_ `REQUIRED`

The ID of the organisation you want to get the identifications from.

___
#### sortColumn
_string_ `OPTIONAL`

The column to sort the identifications by.

Possible values: `id` `description` `status` `isRequest` `createdAt` `updatedAt`

____
#### sortDirection
_string_ `OPTIONAL`

The direction to sort the identifications by.

Possible values: `ASC` `DESC`

____
#### offset
_number_ `OPTIONAL`

The amount of identifications to skip before returning the first identification.

____
#### limit
_number_ `OPTIONAL`

The maximum amount of identifications to return.

____
#### search
_string_ `OPTIONAL`

The search query to filter the identifications by.

This will search in the columns: `id` `description`
___


## Response

`200` application/json  
A list of identification objects is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X GET https://api.proofme.id/v1/identification \
    -H "Authorization: proofme_cFC70rNLNpL8y3C24u3eJLvtmFPBd4B0" \
    -d "organisationId=dc1d8dc2-a5b9-4c9d-b855-7024d1d93ca8" \
    -d "sortColumn=id" \
    -d "sortDirection=ASC" \
    -d "offset=0" \
    -d "limit=10" \
    -d "search="
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "count": 2,
    "rows": [
        {
            "id": "32daaa56-377f-4db9-acd7-fae2e327421e",
            "organisationId": "dc1d8dc2-a5b9-4c9d-b855-7024d1d93ca8",
            "proofmeId": "03682de3-b51c-451c-b50e-1977a332c9f2",
            "description": "Identification #2",
            "status": "PENDING",
            "isRequest": false,
            "redirectUrl": "https://your-application.example.org/redirect/",
            "webhookUrl": "https://your-application.example.org/webhook/",
            "myPageUrl": "https://your-application.proofme.id/32daaa56-377f-4db9-acd7-fae2e327421e",
            "metadata": null,
            "mode": "live",
            "scannedAt": null,
            "createdAt": "2022-01-01T12:00:00+00:00",
            "updatedAt": "2022-01-01T12:00:00+00:00"
        },
        {
            "id": "cb04b19b-e157-46ec-ba8d-1fba17828a5b",
            "organisationId": "39ae2443-936b-4fc3-a0cd-bc04f2563535",
            "proofmeId": "03682de3-b51c-451c-b50e-1977a332c9f2",
            "description": "Identification #1",
            "status": "SUCCESS",
            "isRequest": false,
            "redirectUrl": "https://your-application.example.org/redirect/",
            "webhookUrl": "https://your-application.example.org/webhook/",
            "myPageUrl": "https://your-application.proofme.id/cb04b19b-e157-46ec-ba8d-1fba17828a5b",
            "metadata": null,
            "mode": "live",
            "scannedAt": null,
            "createdAt": "2022-01-01T12:00:00+00:00",
            "updatedAt": "2022-01-01T12:00:00+00:00"
        },
    ]
}

```