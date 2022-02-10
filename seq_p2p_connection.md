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

actor Visitor
participant App
participant Host
participant Signaling
participant TURN
participant Blockchain

note over Host: Sign challenge with keys
Host->Signaling: WS connect as HOST
note over Signaling: Whitelisted and valid DID?
Signaling->Blockchain: Verify Host
alt Host is not whitelist/incorrect auth
Signaling->Host: Send error
note over Host: Show Error
end 
Signaling->Host: channelId + TURN details
note over Host: Show QR
App<->Host:Scan QR
Host->TURN: Get iceCandidates
App->Signaling: Connect to channelId
Signaling->App:Status + TURN Details
App->TURN: Get iceCandidates
Signaling->Host: Client connected
note over Host: Show Connection status
Signaling<->Host: Share iceCandidates
Signaling<->App: Share iceCandidates
Note over App,Host: P2P Connection successful!
```