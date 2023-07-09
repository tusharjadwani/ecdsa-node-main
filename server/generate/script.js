const secp = require('ethereum-cryptography/secp256k1');
const secp2 = require('ethereum-cryptography/secp256k1-compat');
const { toHex,utf8ToBytes } = require('ethereum-cryptography/utils')
const {keccak256 }= require('ethereum-cryptography/keccak')
// secp2.

const secp256k1 = require('secp256k1');

let privateKey = secp.secp256k1.utils.randomPrivateKey()

let publicKey = secp.secp256k1.getPublicKey(privateKey)

const bytes=utf8ToBytes('message');
const hash =toHex(keccak256(bytes));

let signature=secp.secp256k1.sign(hash, privateKey);

// let address= secp.secp256k1.recoverPublicKey(hash, signature,{ recovered: true } );
const publicKeyExtracted = secp256k1.ecdsaRecover(signature, 0, hash, false);

secp.secp256k1.e
console.log('signature: '+signature);
console.log('extracted address key: '+toHex(publicKeyExtracted));
console.log('private key: '+toHex(privateKey));
console.log('public key: '+toHex(publicKey));
