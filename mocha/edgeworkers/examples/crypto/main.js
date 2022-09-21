import { crypto, pem2ab, base64url_decode } from "../../../__mocks__/crypto";

function verify_rs256(jwsObject, crypto_key) {
   const jwsSigningInput = jwsObject.split(".").slice(0, 2).join(".");
   const jwsSignature = jwsObject.split(".")[2];

    return crypto.subtle.verify(
        { name: "RSASSA-PKCS1-v1_5" },
         crypto_key,
         base64url_decode(jwsSignature),
         new TextEncoder().encode(jwsSigningInput)
    );
}
  
export function onClientRequest(request) {
  //verifying getRandomValues()
  crypto.getRandomValues(new Uint8Array(6));

  //verifying digest()
  crypto.subtle.digest("SHA-1", new Int32Array(new ArrayBuffer(8)));

  //verifying importKey()
  let raw_key = new Uint8Array([
    93, 210, 19, 203, 234, 199, 254, 16, 118, 129, 214, 61, 229, 117, 91, 33,
  ]);
  let iv = new Uint8Array([
    237, 234, 45, 119, 168, 16, 178, 26, 14, 182, 253, 39, 79, 181, 180, 219,
  ]);
  let imported_key = crypto.subtle.importKey(
    "raw",
    raw_key,
    { name: "AES-CBC", iv: iv },
    false,
    ["encrypt", "decrypt"]
  );
    
  //verifying encrypt()
  let input_data_array = new Uint8Array([
    44, 237, 221, 235, 17, 155, 115, 79, 8, 211, 94, 216, 92, 183, 9, 106, 15,
    210, 0, 52, 92, 163, 2, 222, 130, 70, 80, 132, 80, 243, 28, 110, 25, 18, 20,
    98, 63, 51, 5, 136, 72, 206, 212, 46, 255, 220, 131, 188, 133, 109,
  ]);
  let encrypted_data = crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    imported_key,
      input_data_array
  );
    
  //verifying decrypt()
  let decrypted_data = crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv },
    imported_key,
    encrypted_data
  );
  
  //verifying pem2ab()
  //importKey() being called as a part of verification.
  let jwt =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ";

  const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
        4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
        +qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
        kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
        0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
        cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
        mwIDAQAB
        -----END PUBLIC KEY-----`;

  let crypto_key = crypto.subtle.importKey(
    "spki",
    pem2ab(pemEncodedKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
  
  //verifying verify()
  verify_rs256(jwt, crypto_key);
}
