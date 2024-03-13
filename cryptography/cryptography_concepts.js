/**
 * Hashing
 * input -> hash function -> fixed length value output
 * Same input always produce the same output
 */
const { createHash, timingSafeEqual } = require('crypto');

function hash(input) {
    // return createHash('sha256').update(input).digest('base64');
    return createHash('sha256').update(input).digest('hex');
}

let password = 'pw';
let hashedPassword = hash(password);
let veryStrong = hash('pw');
console.log(hashedPassword);
console.log(veryStrong);

/**
 * Hash password with salt
 */
const { scryptSync, randomBytes } = require('crypto');

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    
    const user = { email, password: `${salt}:${hashedPassword}` }

    users.push(user);

    return user;
}

function login(email, password) {
    const user = users.find(v => v.email === email);

    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if(match) {
        return 'login success!';
    }
    else {
        return 'login fail';
    }
}

let users = [];
signup('blabla@blabla', 'megaXstrong');
let status = login('blabla@blabla', 'megaXstrong');
console.log(status);
status = login('blabla@blabla', 'kekw');
console.log(status);

/**
 * HMAC
 */
const { createHmac } = require('crypto');

const key = 'bauta-secret';
const key2 = 'some-pass';
const message = 'jalla';

const hmac = createHmac('sha256', key).update(message).digest('hex');
const hmac2 = createHmac('sha256', key2).update(message).digest('hex');
console.log(hmac);
console.log(hmac2);

/**
 * Symmetric encryption
 */
const { createCipheriv, createDecipheriv } = require('crypto');

const littleMessage = 'mff-cupguld-2024';
const littleKey = randomBytes(32);
const iv = randomBytes(16);

const cipher = createCipheriv('aes256', littleKey, iv);

const encryptedMessage = cipher.update(littleMessage, 'utf8', 'hex') + cipher.final('hex');

const decipher = createDecipheriv('aes256', littleKey, iv);
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');

console.log(encryptedMessage);
console.log(decryptedMessage);

/**
 * Keypairs
 */
const { generateKeyPairSync } = require('crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048, // the length of your key in bits
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        // cipher: 'aes-256-cbc',
        // passphrase: 'top secret'
    }
});

console.log(publicKey);
console.log(privateKey);

/**
 * Asymmetric encryption
 */
const { publicEncrypt, privateDecrypt } = require('crypto');

const secretMessage = 'jajaja'

const encryptedData = publicEncrypt(
    publicKey,
    Buffer.from(secretMessage)
);

console.log(encryptedData.toString('hex'));

const decryptedData = privateDecrypt(
    privateKey,
    encryptedData
);

console.log(decryptedData.toString('utf-8'));

/**
 * Signing
 */
const { createSign, createVerify } = require('crypto');

const signer = createSign('rsa-sha256');
signer.update(message);
const signature = signer.sign(privateKey, 'hex');

const verifier = createVerify('rsa-sha256');
verifier.update(message)
const isVerified = verifier.verify(publicKey, signature, 'hex');

console.log(isVerified);