# Api login

## Overview

The login diagram describes how the api login takes place.
Components involved:

* [ProofMe Api](components_api.md)
<!-- * [Licence service](components_license.md) -->
<!-- * [Didux node](components_node.md) -->

## Diagram

```websequencediagrams
title Api Login

participant Api
participant Api DB
participant License
participant License DB
participant Didux

Note over Api:On startup\nRead key_file
Api->License: POST /v1/auth/login
Note over License:Check Signature
License->Didux: Check DID
License->License DB: Get license details
Note over License:Create JWT
License->Api: Return JWT + License details
```