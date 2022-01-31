# Handling errors

## HTTP status codes

Whenever you send a request to the ProofMe API you will get a response in JSON (JavaScript Object Notation) format. This is a standard for data communication that’s easy to read for humans as well as machines. Alongside the JSON-response an HTTP status code is sent that shows whether the request was successful or not. If it was not, you can tell by the code and the message in the response what went wrong, why it went wrong and whether there is something you can do about it.

## A successful request
An HTTP status 200 OK, 201 Created or 204 No Content is issued whenever your request was a success.

## The response types

The first digit of the status code indicates the type or class of the status. Using this first digit you can determine the best approach for dealing with an error. The following classes of codes are relevant to the ProofMe API:

- A code in the 2xx range comes with a ProofMe API response indicating success.
- A code in the 4xx range is an error code returned from the ProofMe API where the client (your responsibility) seems to be causing the error. Whenever this happens you can change your code to prevent the error from happening again. The error for this specific request usually will not go away by itself.
- A code in the 5xx range is an error caused by the server (ProofMe's responsibility). So caused by the ProofMe API or it is infrastructure related. In the rare case you get this type of error, something is wrong with the ProofMe API. The errors should subside without your mediation.

## Examples of error responses

Things will sometimes go wrong. For instance when a request is made with the wrong API key, this error will be the result:

### Request
```bash
curl -X GET https://api.proofme.id/request/tr_WDqYK6vllg \
    -H "Authorization: Bearer invalid_key"
```

### Response

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/hal+json

{
    "status": 401,
    "title": "Unauthorized Request",
    "detail": "Missing authentication, or failed to authenticate",
    "_links": {
        "documentation": {
            "href": "https://docs.proofme.id/#/api_authentication",
            "type": "text/html"
        }
    }
}
```

The HTTP status `401 Unauthorized` indicates missing or incorrect authorization to execute the desired action.

Another error that occurs often, is the well known HTTP status `404 Not Found`, which indicates the object you are trying to retrieve or manipulate does not exist.

## All possible status codes
The ProofMe API will only ever return a subset of all legal HTTP status codes. Here’s the full list:

### 200	OK
Your request was successful.
### 201	Created
The entity was created successfully.
### 204	No Content
The requested entity was canceled / deleted successfully.
### 400	Bad Request
The ProofMe API was unable to understand your request. There might be an error in your syntax.
### 401	Unauthorized
Your request was not executed due to failed authentication. Check your API key.
### 403	Forbidden
You do not have access to the requested resource.
### 404	Not Found
The object referenced by your URL does not exist.
### 405	Method Not Allowed
You are trying to use an HTTP method that is not applicable on this URL or resource. Refer to the Allow header to see which methods the endpoint supports.
### 409	Conflict
You are making a duplicate API call that was probably a mistake.
### 410	Gone
You are trying to access an object, which has previously been deleted.
### 415	Unsupported Media Type
Your request’s encoding is not supported or is incorrectly understood. Please always use JSON.
### 422	Unprocessable Entity
We could not process your request due to another reason than the ones listed above. The response usually contains a field property to indicate which field is causing the issue.
### 429	Too Many Requests
Your request has hit a rate limit. Please wait for a bit and retry.
### 500	Internal Server Error
An internal server error occurred while processing your request. Our developers are notified automatically, but if you have any information on how you triggered the problem, please contact us.
### 502	Bad Gateway
The service is temporarily unavailable, either due to calamity or (planned) maintenance. Please retry the request at a later time.
### 503	Service Unavailable
The service is temporarily unavailable, either due to calamity or (planned) maintenance. Please retry the request at a later time.
### 504	Gateway Timeout
Your request is causing an unusually long process time.



