# Encrypt / decrypt overview
The identification data is encrypted with a secret which is encrypted with OpenPGP keys

### Identification data secret
We generate a unique random v4 string (36 characters) for each identification being made and encrypt the identification with AES (read more here: https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). The crypto-js (npm link: https://www.npmjs.com/package/crypto-js) is being used in this process.

### Open PGP keys
The identification data is being encrypted with the following PGP private keys:
* Organisation user keys
* Organisation API keys

With any of those keys, we can decrypt (with OpenPGP) the secret used for decrypting (with CryptoJS.AES) the identification data.

### Api keys
Each API key has his own PGP keys generated for them. The private key will be downloaded automatically when you create the key.

# Diagram encryption
Once the identification is received, we generate a v4 string to encrypt the identification data. The secret is beign encrypted by PGP public keys.

<div class="small-image">
    <img src="../media/encryption.png" alt="encryption">
</div>

# Diagram decryption
To decrypt the identification data we first decrypt the secret with the PGP private key. Then we can decrypt the identification data with the secret.

<div class="small-image">
    <img src="/media/decryption.png" alt="decryption">
</div>
