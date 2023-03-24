#### Decrypted identification example
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
			"id": "did:didux:0xA8192565EFE966143952371057Fd877b8202f3fA",
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
				"signature": "0xf5406774943c8c888f1e5267bab863c1b96e5fbc6ec24c6ecc65f5a73021037f8907dffe1ab8842e1c",
				"type": "ECDSA"
			},
			"provider": "EPASS",
			"type": ["VerifiableCredential", "OlderThan18Credential"],
			"version": "1.1.0",
			"verified": true
		}
	},
	"proof": {
		"holder": "0xA8192565EFE966143952371057Fd877b8202f3fA",
		"nonce": 1660896224150,
		"signature": "0x6416877cf4d77d8274943c8c888f1e5267bab863c1b96e5fbc6ec24c6e6f822d892ce014a5c91c",
		"type": "ECDSA"
	}
}
```