# Overview

[filename](_media/IPSP-Overview.drawio ':include :type=code')

## Components

### Customer

The customer website/app or any other service.

### User

The user with the [ProofMe App](https://www.proofme.id).

### ProofMe IPSP

A complete environment to install on-premise in the customers environment.

**Components**
* [ProofMe Api](components_api.md)
* [Checkout](components_checkout.md)
* [Dashboard](components_checkout.md)
* [Signal service](components_signalling.md)
* [Turn service](components_turn.md)
* [Didux node](components_node.md)

### ProofMe

ProofMe License and statistics handlers to monitor the network and validate licenses.

**Components**
* [Admin](components_admin.md)
* [Licence service](components_license.md)
* [Stats service](components_stats.md)
* [Didux node](components_node.md)

## Environments

| Component | Github  | Test  | Prod  |
|------     |------   |------ |------ |
|[ProofMe Api](components_api.md)| https://github.com/Proofme-id/IPSP-proofme-api |https://api-test.proofme.id | https://api.proofme.id |
|[Checkout](components_checkout.md)| https://github.com/Proofme-id/IPSP-checkout |https://checkout-test.proofme.id | https://checkout.proofme.id |
|[Dashboard](components_checkout.md) | https://github.com/Proofme-id/IPSP-dashboard |https://dashboard-test.proofme.id | https://dashboard.proofme.id |
|[Signal service](components_signalling.md)| https://github.com/Proofme-id/IPSP-signal-service |https://signal-test.proofme.id | https://signal.proofme.id |
|[Turn service](components_turn.md) | https://github.com/Proofme-id/IPSP-turn |https://turn-test.proofme.id | https://turn.proofme.id |
|[Admin](components_admin.md) | https://github.com/Proofme-id/IPSP-admin |https://admin-test.proofme.id | https://admin.proofme.id |
|[Licence service](components_license.md) | https://github.com/Proofme-id/IPSP-license-service |https://license-test.proofme.id | https://license.proofme.id |
|[Stats service](components_stats.md) | https://github.com/Proofme-id/IPSP-stats-service |https://stats-test.proofme.id | https://stats.proofme.id |