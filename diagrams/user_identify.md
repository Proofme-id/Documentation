# User identify

## Overview

The user identification diagram describes how the user identification takes place.
Components involved:

* [Dashboard](components/dashboard.md)
* [ProofMe Api](components/api.md)
* [Signal service](components/signalling.md)
* [Turn service](components/turn.md)
* [Didux node](components/node.md)

## Diagram

```websequencediagrams
title User identification flow

actor Visitor
participant App
participant Website
participant Host
participant Host DB
participant Signaling
participant TURN
participant Blockchain

Website->Host: Make identification request
note over App, Blockchain: Setup p2p connection
App<->Host: P2P Connection successful!
Host->App: Signed request
note over App: Validate signature + request
App->Host: Share **Signed** response
Host->Blockchain: Verify response & publicKey & DID
note over Host: Do something with result
Host->Website: Success True/False
note over Website: Confetti!!
```