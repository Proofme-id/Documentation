# Overview
This page will describe an overview of how the connection is being made. We have an example available for Typescript in Angular including an easy to use library. For implementing a different language / framework please reference to this document how to create your own.

### Allowing a connection
The IPSP-Api is a backend that we host and you can also host yourself, ran in Docker. This backend will be the service in the middle for clients to connect to each other. For the IPSP-Api to setup a connection you will need to use the "Custom page" section inside the "My page" configuration in the dashboard. This will allow a URL to host the connection on.

### Get My Page configuration

To retrieve the configuration for the domain simply make a GET call:

Example
```
https://api.proofme.id/v1/customMyPage/url/http%3A%2F%2Flocalhost.com%3A4300
```

### QR-Code
An easy way to let the client connect to the host is through a QR code which will contain the connection information

QR code content example: `https://proofme.id/app?p=da451ba2-fcb3-40b0-8a3f-b3f5b9676709:wss%3A%2F%2Fapi.proofme.id%3A443`

Breakdown in several parts: <br>
<b>Part 1: Deeplink / link </b> to website if they don’t have the Proofme App yet: https://proofme.id/app <br>
<b>Part 2: Query parameter (URL encoded):</b> ?p=da451ba2-fcb3-40b0-8a3f-b3f5b9676709:wss%3A%2F%2Fapi.proofme.id%3A443 <br>
Splitted in two parts (on the ‘:’) 

URL decoded: `da451ba2-fcb3-40b0-8a3f-b3f5b9676709:wss://api.proofme.id:443`<br>

<b>Query parameter part 1:</b> da451ba2-fcb3-40b0-8a3f-b3f5b9676709 (channelId, which the host (frontend webpage) is waiting for a connection on that channel)) <br>
<b>Query parameter part 2:</b> wss://api.proofme.id:443 - The websocket endpoint to connect to. We first setup a websocket connection, then information is being exchanged into a P2P connection between Proofme App and IPSP-Api <br>

### Mobile button
A QR code is an easy way to let the client make a connection. The user cannot scan the QR code on their own phone screen, which is why we use the deeplink functionality. An easy way to handle this is to use the deeplink functionality that the Proofme App accepts and put this link inside a button for the user to press.

Example deeplink: <br>
`https://proofme.id/app?p=4204eda3-1e67-4d47-9fbc-11658609de64:wss:%2F%2Fapi.proofme.id:443`<br>

Breakdown of the query string is the same as in the QR code.

### Setup a connection
This service has a websocket endpoint available for hosts and clients to connect to, ours hosted on `wss://api.proofme.id`. <br>
To host a connection (receive a channel ID) setup a connection with either the Proofme ID (public identifications need to be enabled) or Identification ID

Example with a Proofme ID<br>
`wss://api.proofme.id/?channel=undefined&data=proofme:b7264dd0-b9f4-479f-adc3-db7c3d0cdcf3`

Example with an Identification ID<br>
`wss://api.proofme.id/?channel=undefined&data=id:505c0af1-4807-41ed-83ba-d0f0c2571815`

Notice the channel value which is undefined. The host receives a channel ID this way for the client to connect to so the host itself can't define this. <br>
Once the websocket connection is successfully made, we receive messages in JSON. 

## Below an overview of messages to receive. 
___
#### host

This type will give back a channelId on which the client can connect to with some other minor information.

Example:
```json
{ 
    "channelId" : "2ab76357-bc82-4ec7-bc05-f0a2ee809e27",
    "message" : "Host initialised 2ab76357-bc82-4ec7-bc05-f0a2ee809e27", 
    "signalServer" : "wss://api.proofme.id:443",
    "success" : true,
    "type" : "host" 
}
```
___
#### clientconnected
This type will give a message so that the host knows a client has connected and you can update the QR code in some way

Example:
```json
{
    "type": "clientconnected", 
    "success": true
}
```
___
#### disconnect
This type will give a message so that the host knows the client disconnected. Now you can either show a button for a retry or simply refresh the connection.

Example:
```json
{
    "type": "disconnect", 
}
```
___
#### result
This type will give information about the identification status. It is either a success or failure. Data is not being sent to the host directly due to security reasons. Receive the encrypted identification data through our API

Example success response:
```json
{
    "type": "result", 
    "success": true, 
    "message": "IDENTIFICATION_SUCCESS"
}
```

Example failure response:
```json
{
    "type": "result", 
    "success": false, 
    "message": "IDENTIFICATION"
}
```