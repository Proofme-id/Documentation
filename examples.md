# TODO

> Work in progress!! :smile:

# Draw.io files

[filename](_media/IPSP-Overview.drawio)

# Use tabs with code

<!-- tabs:start -->

#### **Typescript**

```js
window.$docsify = {
  markdown: {
    smartypants: true,
    renderer: {
      link: function() {
        // ...
      }
    }
  }
}
```

#### **PHP**

Bonjour!

<!-- tabs:end -->

# Sequence diagram

[WebSequenceDiagrams](https://www.websequencediagrams.com/)

```websequencediagrams
title Identification flow

actor Customer
participant Client
participant Display
participant Host
participant Signaling
participant TURN
participant Blockchain

note over Display:Identification REQUEST
Display->Host:Setup request
Host->Signaling: Connect Websocket
activate Signaling
note right of Signaling:Open WS
Host->Signaling: Identify
loop keep alive
Host<->Signaling: Ping Pong
end
note over Signaling: Whitelisted?
Signaling->Blockchain: Verify Host
// Check Did + publicKey
alt Host is not whitelist/incorrect auth
Signaling->Host:  Send error
note over Host: Show Error
end 
Signaling->Host: channelId + TURN details
Host->Display:Connection details
note over Display:Show QR
Client<->Display:Scan QR
Host->TURN: Get iceCandidates
Client->Signaling:Connect to channelId
Signaling->Client:Status + TURN Details
Client->TURN: Get iceCandidates
Signaling->Host: Client connected
Host->Display:Connection status
note over Display:Show Connection status
Signaling<->Host: Share iceCandidates
Signaling<->Client: Share iceCandidates
activate Host
note right of Host:Open webrtc
Client<->Host: P2P Connection successful!
note right of Signaling: Close WS
deactivate Signaling

Host->Client: Send **Signed** Identify request
Client->Blockchain: Verify Host
// publicKey & DID & license
alt Host is not DID/No license
note over Client: Show Error
Client->Host:Disconnect
end 
note over Client:Show Request
note over Client:Sign Response
Client->Host: Share response
Host->Blockchain: Verify response & publicKey & DID
Host->Client:Share success True/False
Host->Display:Share success True/False
note over Display:Show result
note right of Host: Close webrtc
deactivate Host
```


