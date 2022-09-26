import { onClientRequest } from "../../../edgeworkers/examples/crypto/main";
import Request from "request";
import {
  mock_crypto_getRandomValues,
  mock_crypto_subtle_digest,
  mock_crypto_subtle_importKey,
  mock_crypto_subtle_encrypt,
  mock_crypto_subtle_decrypt,
  mock_pem2ab,
  mock_crypto_subtle_verify,
} from "../../../__mocks__/crypto";

describe("Crypto EW", () => {
  test("onClientRequest getRandomValues(), digest(), importKey(), encrypt(), decrypt(), pem2ab(), verify()", () => {
    let requestMock = new Request();
    onClientRequest(requestMock);

    expect(mock_crypto_getRandomValues).toHaveBeenCalledTimes(1);
    expect(mock_crypto_getRandomValues).toHaveBeenCalledWith(new Uint8Array(6));

    expect(mock_crypto_subtle_digest).toHaveBeenCalledTimes(1);
    expect(mock_crypto_subtle_digest).toHaveBeenCalledWith(
      "SHA-1",
      new Int32Array(new ArrayBuffer(8))
    );

    let raw_key = new Uint8Array([
      93,
      210,
      19,
      203,
      234,
      199,
      254,
      16,
      118,
      129,
      214,
      61,
      229,
      117,
      91,
      33,
    ]);
    let iv = new Uint8Array([
      237,
      234,
      45,
      119,
      168,
      16,
      178,
      26,
      14,
      182,
      253,
      39,
      79,
      181,
      180,
      219,
    ]);
    expect(mock_crypto_subtle_importKey).toHaveBeenCalledTimes(2);
    expect(mock_crypto_subtle_importKey).toHaveBeenCalledWith(
      "raw",
      raw_key,
      { name: "AES-CBC", iv: iv },
      false,
      ["encrypt", "decrypt"]
    );

    let input_data_array = new Uint8Array([
      44,
      237,
      221,
      235,
      17,
      155,
      115,
      79,
      8,
      211,
      94,
      216,
      92,
      183,
      9,
      106,
      15,
      210,
      0,
      52,
      92,
      163,
      2,
      222,
      130,
      70,
      80,
      132,
      80,
      243,
      28,
      110,
      25,
      18,
      20,
      98,
      63,
      51,
      5,
      136,
      72,
      206,
      212,
      46,
      255,
      220,
      131,
      188,
      133,
      109,
    ]);

    expect(mock_crypto_subtle_encrypt).toHaveBeenCalledTimes(1);
    expect(mock_crypto_subtle_encrypt).toHaveBeenCalledWith(
      { name: "AES-CBC", iv: iv },
      "imported_key",
      input_data_array
    );

    expect(mock_crypto_subtle_decrypt).toHaveBeenCalledTimes(1);
    expect(mock_crypto_subtle_decrypt).toHaveBeenCalledWith(
      { name: "AES-CBC", iv: iv },
      "imported_key",
      "encrypted_data"
    );

    const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
        4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
        +qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
        kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
        0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
        cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
        mwIDAQAB
        -----END PUBLIC KEY-----`;

    expect(mock_pem2ab).toHaveBeenCalledTimes(1);
    expect(mock_pem2ab).toHaveBeenCalledWith(pemEncodedKey);

    expect(mock_crypto_subtle_verify).toHaveBeenCalledTimes(1);
    expect(mock_crypto_subtle_verify).toHaveBeenCalledWith({ name: "RSASSA-PKCS1-v1_5" },
    "crypto_key",
    "base64url_decode_jwsSignature)",
    "encoded_jwsSigningInput"
  );
  });
});
