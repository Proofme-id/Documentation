# Revoke identification
`DELETE /v1/identification/*id*`

Revokes an identification based on its ID.

## Parameters
___
#### id
_string_ `REQUIRED`

The ID of the identification you want to revoke.
___
#### organisationId
_string_ `REQUIRED`

The organisation ID in which you want to create the identification.

___


## Response

`200` application/json  
A success message is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X DELETE https://api.proofme.id/v1/identification/32daaa56-377f-4db9-acd7-fae2e327421e \
    -H "Authorization: proofme_cFC70rNLNpL8y3C24u3eJLvtmFPBd4B0" \
    -d "organisationId=dc1d8dc2-a5b9-4c9d-b855-7024d1d93ca8" \
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "SUCCESSFUL_REVOKE"
}

```