# Signal Service

## Diagrams

### Connect as host with client

A host or website needs to be a host to allow connections from clients.
You can become a `Host` when:
* The origin is whitelisted
* The origin is `host` and the header contains a signature

A `Client` can connect to a host by scanning the presented QR-code.
 

```websequencediagrams
title Identification flow

participant Host
participant Signaling
participant Client
participant TURN
participant Blockchain

Host->Signaling: Connect Websocket
note over Signaling: Check Origin\nCheck Signature\nCheck Whitelist\nCheck Did
Signaling->Blockchain: Verify DID
alt Checks failed
Signaling->Host: Send error
note over Host: Show Error
end 
note over Signaling: Host initialised
Signaling->Host: channelId + TURN details
Host->TURN: Get iceCandidates
note over Signaling: Wait for Client on channelId
Client->Signaling: Connect to channel
Signaling->Client: channelId + TURN details
Client->TURN: Get iceCandidates
Signaling->Host: Client connected
Host->Signaling: Send Offer
Signaling->Client: Offer
Client->Signaling: Send Answer
Signaling->Host: Answer
Signaling<->Host: Share iceCandidates
Signaling<->Client: Share iceCandidates
Client<->Host: P2P Connection successful!
Host->Signaling: Close connection
Client->Signaling: Close connection
```

