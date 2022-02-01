# User login

## Overview

The user login diagram describes how the user login takes place.
Components involved:

* [Dashboard](components_checkout.md)
* [ProofMe Api](components_api.md)
* [Signal service](components_signalling.md)
* [Turn service](components_turn.md)
* [Didux node](components_node.md)

## Diagram

```websequencediagrams
title User login flow

actor Admin
participant App
participant Dashboard
participant Api
participant Api DB
participant Signaling
participant TURN
participant Blockchain

Dashboard->Api: ws connect
Note over Api: Check CORS Origin header
note over App, Blockchain: Setup p2p connection
App<->Api: P2P Connection successful!
activate Api
Dashboard<->Api: P2P Connection successful!
Dashboard->Api: WS Login command

Api->App: Send **Signed** login request
App->Blockchain: Verify Host
note over App:Show Request
note over App:Sign Response
App->Api: Share response
Api->Blockchain: Verify response & publicKey & DID
Api->Api DB: Get user details
note over Api:Generate JWT
Api->App:Share success True/False
Api->Dashboard:Share JWT
note over Dashboard:Continue
deactivate Api
```