# User login

## Overview

The user login diagram describes how the user login takes place.
Components involved:

- ProofMe Api
- License service
- License service DB
- Didux blockchain

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
activate Api
loop keep alive
Dashboard<->Api: Ping Pong
end
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
Api->Dashboard:Connection details
note over Dashboard:Show QR
Admin<->Dashboard:Scan QR
Api->TURN: Get iceCandidates
App->Signaling:Connect to channelId
Signaling->App:Status + TURN Details
App->TURN: Get iceCandidates
Signaling->Api: Client connected
Api->Dashboard:Connection status
note over Dashboard:Show Connection status
Signaling<->Api: Share iceCandidates
Signaling<->App: Share iceCandidates
App<->Api: P2P Connection successful!
activate Api
Api->Dashboard: WS: Client connected
Dashboard->Api: WS: Login request
deactivate Signaling

Api->App: Send **Signed** login request
App->Blockchain: Verify Host
// publicKey & DID & license
alt Host is not DID/No license
note over App: Show Error
App->Api:Disconnect
end 
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