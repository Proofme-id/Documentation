# Delete identification data
`DELETE /v1/identification/data?ids=:ids`

Deletes identification data

## Query
___
#### ids
_string_ `REQUIRED`

The IDs of the identification's data you want to delete.
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
    "message": "DELETED_SUCCESSFULLY",
    "count": 1
}

```