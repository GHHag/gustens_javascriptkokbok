const g = 5; // g
// const prime = 1931; // n
// const prime = 17; // n
const n = 89; // n

const a = 15; // a
const b = 6; // b

// const publicKey1 = (base ** privateKey1) % prime; // g^a mod n
// const publicKey2 = (base ** privateKey2) % prime; // g^b mod n
const publicKey1 = Math.pow(g, a) % n; // g^a mod n
const publicKey2 = Math.pow(g, b) % n; // g^b mod n
console.log(publicKey1);
console.log(publicKey2);

// const sharedSecret1 = (publicKey2 ** privateKey1) % prime;
// const sharedSecret2 = (publicKey1 ** privateKey2) % prime;
const sharedSecret1 = Math.pow(publicKey2, a) % n;
const sharedSecret2 = Math.pow(publicKey1, b) % n;

console.log("shared secret 1: " + sharedSecret1);
console.log("shared secret 2: " + sharedSecret2);
