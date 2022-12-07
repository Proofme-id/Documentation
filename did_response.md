#### Identification Response
```json
{
    "credentials": {
      "OLDER_THAN_18": {
				"credentialSubject": {
					"credential": {
						"type": "Older Than 18",
						"value": true
					}
				},
				"expirationDate": "2023-07-04T18:49:55.216723+00:00",
				"id": "did:didux:0x8202f3fA8192565EFE966143957Fd877bA237105",
				"issuanceDate": "2022-07-04T18:49:55.236603+00:00",
				"issuer": {
					"authorityId": "Proofme",
					"authorityName": "Proofme",
					"id": "did:didux:0x91a935E503eFAEDF22A4a7941BFAcE25DedE0bf3",
					"name": "Proofme"
				},
				"proof": {
					"holder": "0xA003FAC350C6fd3a8130E83C85e88E6b978726C0",
					"nonce": 1656960595236,
					"signature": "0xf54067cc6102ec3fb3cb95e5f5ac29bf7ec9a02143ec5ae5267bab863c1b96e5fbc6ec24c6e8842e1c",
					"type": "ECDSA"
				},
				"provider": "EPASS",
				"type": ["VerifiableCredential", "OlderThan18Credential"],
				"version": "1.1.0",
				"verified": true
			},
    },
    "proof": {
      "holder": "0x8202f3fA8192565EFE966143957Fd877bA237105",
      "nonce": 1660896224150,
      "signature": "0x6416877cf4d77d826f822d892ce015f93c953985a73021037f8907dffe1ab74943c8c888f14a5c91c",
      "type": "ECDSA"
    }
}
```