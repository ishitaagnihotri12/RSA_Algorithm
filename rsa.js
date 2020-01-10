
const RSA = {};
var bigInt = require("big-integer");

RSA.generate = function(keysize) {
  
  function randomPrime(bits) {
    const min = bigInt(6074001000).shiftLeft(bits - 33); 

     const max = bigInt.one.shiftLeft(bits).minus(1); 
    for (;;) {
      const p = bigInt.randBetween(min, max);  
      if (p.isProbablePrime(256)) {
        return p;
      }
    }
  }

  const e = bigInt(65537); 
  let p;
  let q;
  let lambda;

  
  do {
    p = randomPrime(keysize / 2);
    q = randomPrime(keysize / 2);
    lambda = bigInt.lcm(p.minus(1), q.minus(1));
  } while (bigInt.gcd(e, lambda).notEquals(1) || p.minus(q).abs().shiftRight(
      keysize / 2 - 100).isZero());

  return {
    n: p.multiply(q),  
    e: e,  
    d: e.modInv(lambda),  
  };
};


RSA.encrypt = function(m, n, e) {
  return bigInt(m).modPow(e, n);
};


RSA.decrypt = function(c, d, n) {
  return bigInt(c).modPow(d, n);
};


let x=RSA.generate(128);
//console.log("generate",RSA.generate(128));
var m=454555555577765n;
console.log("Message passed : "+m);
var f=RSA.encrypt(m,x.n,x.e);
console.log("encrypted message",f);
console.log("decrypted message",RSA.decrypt(f,x.d,x.n));
var ans=RSA.decrypt(f,x.d,x.n);
if(m==ans)
console.log("equal");
