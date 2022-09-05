#### Identification Request
```json
{
    "credentials": [
        { 
          "key": "EMAIL", 
          "provider": "EMAIL", 
          "required": true 
        },
    ],
    "description": "Order #12345",
    "purpose": "VERIFICATION",
    "proof": {
      "holder": "0x8202f3fA8192565EFE966143957Fd877bA237105",
      "nonce": 1660896224150,
      "signature": "0x6416877cf4d77d826f822d892ce015f93c953df85b21006d1380f812cf6090d3014a5c91c",
      "type": "ECDSA"
    },
    "requester": "Rabobank",
    "storage": "CERTIFICATE"
}
```

#### credentials
The requested credentials as an Array.  
Each credential contains:
* key - Name of the credential
* provider - source of the credential
* required - true or false

#### description
_string_  
Description configured by the backoffice

#### purpose
_enum_  
Why do we need your data?

#### proof
_proof object_  
* Holder - did or publicKey of signer
* nonce - timestamp
* signature - Signature over complete object (minus proof.signature)
* type - signature type

#### requester
_string_  
Who is requesting your data?

#### storage
_enum_  
Is your data stored? And for how long?
* STORE_DATABASE
* CERTIFICATE
* NONE