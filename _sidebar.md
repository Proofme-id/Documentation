
> [![logo](https://docs.proofme.id/media/logo.svg)](/#)
* [Start](/#)

* Introduction
  * [Identifications](intro/identifications.md)
  * [Hosted MyPage](intro/hosted_mypage.md)
  * [Build your own MyPage](intro/byo_mypage.md)
  * [On-premise MyPage](intro/onpremise_mypage.md)

* Host your own identification page
  * [Overview](custom_identification_page.md)
  * [Example usage](custom_identification_page_example.md)

* Proofme SDK
  * [Overview](sdk/overview.md)
  * [Reader](sdk/reader.md)
    * [Android installation](sdk/reader/installation_android.md)
    * [iOS installation](sdk/reader/installation_ios.md)
    * [Example usage](sdk/reader/example_usage.md)
  * [Qr](sdk/qr.md)

* Proofme Api
  * [Overview](api/overview.md)
  * [Security](api/security.md)
  * [Authentication](api/authentication.md)
  <!-- * [Testing](api/testing.md) -->
  <!-- * [Common data types](api/cdt.md) -->
  * [Handling errors](api/errors.md)
  * [Webhooks](api/webhooks.md)
  <!-- * [Pagination](api/pagination.md) -->
  * [Identification API](api/v1/identification/api_intro.md)
    * [Create identification](api/v1/identification/post_identification.md)
    * [Get identification list](api/v1/identification/get_identification_list.md)
    * [Get identification](api/v1/identification/get_identification.md)
    * [Get (encrypted) identification data](api/v1/identification/get_identification_data.md)
    * [Delete identification data](api/v1/identification/delete_identification_data.md)
    * [Revoke identification](api/v1/identification/revoke_identification.md)
  * [Document API](api/v1/document/api_intro.md)
    * [Create document](api/v1/document/post_document.md)
    * [Get document list](api/v1/document/get_document_list.md)
    * [Get document](api/v1/document/get_document.md)
    * [Download document](api/v1/document/download_document.md)
    * [Delete document](api/v1/document/delete_document.md)

* Encrypt / decrypt data
  * [Overview](encryption/overview.md)  
  * [Encrypt / decrypt examples Node](encryption/examples_node.md)
  * [Encrypt / decrypt examples Angular](encryption/examples_angular.md)

* Components
  * [Overview](components/overview.md)
  * [Proofme Api](components/api.md)
  * [My page](components/mypage.md)
  * [Dashboard](components/dashboard.md)
  * [Turn service](components/turn.md)
  * [Notifications service](components/notifications.md)
  * [License service](components/license.md)
  * [Stats service](components/stats.md)
  * [News service](components/news.md)
  * [Didux node](components/node.md)
  
* Digital Identity
  * [Overview](did/overview.md)
  * [Identification request](did/request.md)
  * [Encrypted identification](did/encrypted.md)
  * [Decrypted identification](did/decrypted.md)

* Plugins
  * [Proofme-webrtc](plugins/proofme-webrtc.md)
  * [Proofme-webrtc-web](plugins/proofme-webrtc-web.md)
  * [Proofme-webrtc-node](plugins/proofme-webrtc-node.md)

* Sequence diagrams
  * [Api registration](diagrams/api_registration.md)
  * [Api login](diagrams/api_login.md)
  * [User login](diagrams/user_login.md)
  * [User identify](diagrams/user_identify.md)
  * [Setup P2P connection](diagrams/p2p_connection.md)