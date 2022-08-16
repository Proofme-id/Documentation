# Api registration

## Overview

The registration diagram describes how the API registration takes place.
Components involved:

* [Dashboard](components_checkout.md)
* [ProofMe Api](components_api.md)
<!-- * [Licence service](components_license.md) -->
<!-- * [Stats service](components_stats.md) -->
<!-- * [Didux node](components_node.md) -->

## Diagram

```websequencediagrams
title Api registration

actor Customer
participant Dashboard
participant Api
participant Api DB
participant License
participant License DB
participant Stats
participant Stats DB
participant Didux

note over Customer:First installation
Customer->Dashboard:Open dashboard
Dashboard->Api: GET /v1/status
Api->Dashboard: NO_KEYS
note over Dashboard:No key file found.\nStart installation
note over Dashboard:Registration form
Dashboard->Api: POST /v1/install
Note over Api:Generate keys\nSign registration
Api->License: POST /v1/license
Note over License:Check Signature
License->Didux:Deploy DID
Didux->License:DID Address
License->License DB: Store DID + details
Note over License:Create JWT
License->Api: Return DID + JWT
Note over Api: Store key_file
Api->Stats: POST /v1/registration
Stats->Stats DB: Store registration
Api->Dashboard: Success
Note over Dashboard:Config overview
Note over Dashboard:Login
```