# Build your own MyPage

> This is WIP

Opting for a deeper integration?
Please refer to this guide on building your own MyPage to dive into how the Proofme MyPage flow can be fully integrated.

## Overview

The goal of BYO-MyPage is to give your customers a flawless experience within the Proofme infrastructure during an identification.

A default identification exist out of 3 stages:
* Create identification stage
* Identification stage
  * Create QR-code
  * Setup p2p connection
  * Receive result/errors
* Get results stage
  * Decrypt data (optional)

### Prerequisites
* An account at [Proofme](dashboard.proofme.id)
* An api key
  * A PGP-key for decryption (optional)
* A configured Proofme (Identification request template)
* Your domain whitelisted at the MyPage configuration

### Create identification stage

During the "Create identification stage" we create an Identification request for a customer.
Checkout [creating an identification](/api/v1/identification/post_identification.md) for an example request and required fields.
The create Identification request returns an identification object, as described in [Get identification](/api/v1/identification/get_identification.md).

### Identification stage

During the Identification stage, a QR-code is generated for the visitor to scan and complete the identification flow.

#### Example

```
<html>
<head>
    <title>BYO-MyPage</title>
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
</head>
<body>
<script>
    let identification = prompt("Please enter the identification id:", "");

    if(identification == null || identification === "") {
        alert("Invalid identificationId");
    }

    let socket = new WebSocket(`wss://api.proofme.id/?channel=undefined&data=id:${identification}`);

    socket.onopen = function(e) {
        console.log("Connection is open");
    };

    socket.onmessage = function(event) {
        console.log("Response:", event.data);

        let message = JSON.parse(event.data);
        if(message.channelId) {
            console.log(`ConnectionString: https://proofme.id/app?p=${message.channelId}:wss%3A%2F%2Fapi.proofme.id%3A443`)
            new QRCode(document.getElementById("qrcode"), `https://proofme.id/app?p=${message.channelId}:wss%3A%2F%2Fapi.proofme.id%3A443`);
            document.getElementById("status").innerText = "Connection open";
        }
        if(message.type === "clientconnected") {
            document.getElementById("status").innerText = "Client connected";
        }
        if(message.type === "disconnect") {
            document.getElementById("status").innerText = "Client disconnected";
            setTimeout(() => {
                    socket.close();
            }, 1000)
        }
        if(message.type === "result" && message.success) {
            document.getElementById("result").innerText = "Identification successful";
        }
    };

    socket.onclose = function(event) {
        document.getElementById("status").innerText = "Connection closed";
        document.getElementById("qrcode").hidden = true;
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('[close] Connection died');
        }
    };

    socket.onerror = function(error) {
        alert(`[error]`);
    };
</script>

<div id="qrcode"></div>
<div id="status"></div>
<div id="result"></div>

</body>
</html>
```

### Get results stage

When the identification is finished, it is possible to [get the identification data](/api/v1/identification/get_identification_data.md) by the identification id.
Depending on the Proofme configuration or create identification config, a webhook is triggered with an identification id, to simplify the fetch data flow.
Follow the guides at [Encrypt / decrypt data](/encryption/overview.md) to decrypt the personal identifiable information.


