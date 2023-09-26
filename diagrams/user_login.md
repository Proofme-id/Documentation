# User login

## Overview

The user login diagram describes how the user login takes place.
Components involved:

* [Dashboard](components/dashboard.md)
* [ProofMe Api](components/api.md)
* [Signal service](components/signalling.md)
* [Turn service](components/turn.md)
* [Didux node](components/node.md)

## Diagram

```websequencediagrams
title User login flow

actor Visitor
participant App
participant Website
participant Api
participant Api DB
participant Signaling
participant TURN
participant Blockchain

note over Website: Unique uuid + browser in state\nBrowser is host
note over App, Blockchain: Setup p2p connection
App<->Website: P2P Connection successful!
Website->App: WS Login request + Unique uuid & browser in state
note over App: Validate URL + uuid\nStore url + uuid + browser
App->Api: POST **Signed** login response
Api->Blockchain: Verify response & publicKey & DID
Api->Api DB: Get user details
note over Api:Generate JWT
Api->App: return JWT
App->Website: Share JWT
note over Website: We have a JWT!
```