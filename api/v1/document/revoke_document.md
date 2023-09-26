# Revoke document
`DELETE /v1/document/:id`

Revokes a document based on its ID.

## Parameters
___
#### id
_string_ `REQUIRED`

The ID of the document you want to revoke.
___


## Response

`200` application/json  
A success message is returned.

# Request

<!-- tabs:start -->

#### **curl**

```bash
curl -X DELETE https://api.proofme.id/v1/document/32daaa56-377f-4db9-acd7-fae2e327421e \
    -H 'authorization: <JWT or apikey>'
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