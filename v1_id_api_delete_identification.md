# Revoke identification
`DELETE /v1/identification/*id*`

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
curl -X DELETE https://api.proofme.app/v1/identification/12345 \
    -H "Authorization: Bearer test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM" \
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