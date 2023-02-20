# Security


## Maximum safety and usability

How does Proofme create an API that’s maximally safe while being as easy to implement for developers as possible? By not giving in to the reflex of stacking equivalent safety measures and by not sending sensitive information when it’s not required.

## Secure connection required

Proofme uses the API-key as means of authentication and requires HTTPS connections encrypted via TLS1.2 (or higher) to guarantee security. This means the Proofme API can only be accessed through the secure https protocol. All of the API clients we publish use HTTPS.

End-to-end safety on the transport level is guaranteed by the HTTPS-requirement, no need to encrypt the data itself again. We only support TLS 1.2 (or higher). Connection is not possible when using a lower version.

HTTPS mitigates packet sniffing and timing & replay attacks. Thanks to HTTPS, data exchanged between Proofme and your service is protected and guaranteed to be authentic. HTTPS implements hashed signatures, nonces and other tried and tested cryptographic safeties.

Man-in-the-middle attacks are prevented by strictly checking the HTTPS-certificate used on https://api.proofme.id/. If the client detects a fake certificate – let’s say because of a hacked DNS-server – no connection will be set up.

## Sensitive information
All sensitive identification information is entered on our platform. So there is no need to jump trough hoops to make your website certified. We have got you covered.

## What about the webhooks?
The webhooks are secured by HTTPS too, even if your hosting service is not using HTTPS. This is because the webhook requests – which Proofme sends out to communicate status changes – simply do not contain sensitive information. Your webhook script will always have to fetch the object in order to know its status, and this can only be done using an HTTPS-secured connection. Here too, the fact https://api.proofme.id/ can only be reached using HTTPS forces your services that do not use HTTPS into security.

## What about the data
All personal identifiable information (PII), sensitive and nonsensitive are encrypted after validation by the customers public PGP keys.
After validation, the data can NOT be viewed by Proofme or the platform, and only decrypted by the customers themself.
Data is encrypted with Elliptic Curve Cryptography with the Curve25519 elliptic curve, offering 128-bits of security (256-bit key size).

## What’s left?
An API that’s so convenient you’ll integrate it just for kicks. Make sure you enjoy yourself because you’ll be done in no time.