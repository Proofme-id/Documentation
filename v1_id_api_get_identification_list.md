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
curl -X GET https://api.proofme.app/v1/identification \
    -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
    -d "organisationId=org_12345" \
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
            "id": "id_uniqueIdentificationId12345",
            "description": "Identification #12345",
            "isRequest": true,
            "status": 0,
            "proofme": {
                "id": "pr_12345",
                "name": "Proofme",
                "organisationId": "org_12345",
                "deletedAt": null,
                "requestedCredentials": {
                    "purpose": "ACCESS_CONTROL",
                    "requester": "Proofme",
                    "storage": "NOT_STORED",
                    "proof": {
                        "holder": "0x0000000000000000000000000000000000000000",
                        "nonce": 0000000000000,
                        "type": "ECDSA",
                    },
                    "credentials": [
                        {
                            "key": "FIRST_NAME",
                            "provider": "EPASS",
                            "required": true,    
                        }
                    ]
                }
            },
            "createdAt": "2022-01-01T12:00:00+00:00",
            "updatedAt": "2022-01-01T12:00:00+00:00"
        },
        {
            "id": "id_uniqueIdentificationId12346",
            "description": "Identification #12346",
            "isRequest": false,
            "status": 0,
            "proofme": {
                "id": "pr_12345",
                "name": "Proofme",
                "organisationId": "org_12345",
                "deletedAt": null,
                "requestedCredentials": {
                    "purpose": "ACCESS_CONTROL",
                    "requester": "Proofme",
                    "storage": "DATABASE",
                    "proof": {
                        "holder": "0x0000000000000000000000000000000000000000",
                        "nonce": 0000000000000,
                        "type": "ECDSA",
                    },
                    "credentials": [
                        {
                            "key": "EMAIL",
                            "provider": "EMAIL",
                            "required": false,    
                        }
                    ]
                }
            },
            "createdAt": "2022-01-01T12:00:00+00:00",
            "updatedAt": "2022-01-01T12:00:00+00:00"
        }
    ]
}

```