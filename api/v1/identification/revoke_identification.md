# Revoke identification
`DELETE /v1/identification/:id`

Revokes an identification based on its ID.

## Parameters
___
#### id
_string_ `REQUIRED`

The ID of the identification you want to revoke.
___


## Response

`200` application/json  
A success message is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X DELETE https://api.proofme.id/v1/identification/32daaa56-377f-4db9-acd7-fae2e327421e \
    -H "Authorization: proofme_cFC70rNLNpL8y3C24u3eJLvtmFPBd4B0"
```

<!-- tabs:end -->

# Response
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "REVOKE_SUCCESSFUL"
}

```