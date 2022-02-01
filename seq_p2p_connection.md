# Setup P2P Connection

## Overview

Detailed description of P2P connection setup.
Components involved:

* [Dashboard](components_checkout.md) as Web App
* [ProofMe Api](components_api.md)
* [Signal service](components_signalling.md)
* [Turn service](components_turn.md)
* [Didux node](components_node.md)

## Diagram

```websequencediagrams
title Setup P2P Connection

actor Admin
participant App
participant Web App
participant Api
participant Api DB
participant Signaling
participant TURN
participant Blockchain

Note over Web App, Api: Open WS connection
Note over Api: Check CORS Origin header
Api->Signaling: Connect Websocket
activate Signaling
Api->Signaling: Identify Host
loop keep alive
Api<->Signaling: Ping Pong
end
note over Signaling: Whitelisted?
Signaling->Blockchain: Verify Host
// Check Did + publicKey
alt Host is not whitelist/incorrect auth
Signaling->Api:  Send error
note over Api: Show Error
end 
Signaling->Api: channelId + TURN details
Api->Web App:Connection details
note over Web App:Show QR
Admin<->Web App:Scan QR
Api->TURN: Get iceCandidates
App->Signaling:Connect to channelId
Signaling->App:Status + TURN Details
App->TURN: Get iceCandidates
Signaling->Api: Client connected
Api->Web App:Connection status
note over Web App:Show Connection status
Signaling<->Api: Share iceCandidates
Signaling<->App: Share iceCandidates
App<->Api: P2P Connection successful!
Web App<->Api: P2P Connection successful!
Note over Web App,App: Start request

```