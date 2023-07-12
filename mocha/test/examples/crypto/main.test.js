import { onClientRequest } from "../../../edgeworkers/examples/crypto/main";
import Request from "request";
import {
  mock_crypto_getRandomValues,
  mock_crypto_subtle_digest,
  mock_crypto_subtle_importKey,
  mock_crypto_subtle_encrypt,
  mock_crypto_subtle_decrypt,
  mock_pem2ab,
  mock_crypto_subtle_sign,
  mock_crypto_subtle_verify,
} from "../../../__mocks__/crypto";

const sinon = require("sinon");
const expect = require("expect.js");

describe("Crypto EW", () => {
  afterEach(() => {
    sinon.reset();
  });

  it("onClientRequest getRandomValues(), digest(), importKey(), encrypt(), decrypt(), pem2ab(), verify()", () => {
    let requestMock = new Request();
    onClientRequest(requestMock);

    expect(mock_crypto_getRandomValues.callCount).to.be(1);
    expect(mock_crypto_getRandomValues.calledWith(new Uint8Array(6))).to.be(
      true
    );

    expect(mock_crypto_subtle_digest.callCount).to.be(1);
    expect(
      mock_crypto_subtle_digest.calledWith(
        "SHA-1",
        new Int32Array(new ArrayBuffer(8))
      )
    ).to.be(true);

    let raw_key = new Uint8Array([
      93, 210, 19, 203, 234, 199, 254, 16, 118, 129, 214, 61, 229, 117, 91, 33,
    ]);
    let iv = new Uint8Array([
      237, 234, 45, 119, 168, 16, 178, 26, 14, 182, 253, 39, 79, 181, 180, 219,
    ]);

    expect(mock_crypto_subtle_importKey.callCount).to.be(2);
    expect(
      mock_crypto_subtle_importKey.calledWith(
        "raw",
        raw_key,
        { name: "AES-CBC", iv: iv },
        false,
        ["encrypt", "decrypt"]
      )
    ).to.be(true);

    let input_data_array = new Uint8Array([
      44, 237, 221, 235, 17, 155, 115, 79, 8, 211, 94, 216, 92, 183, 9, 106, 15,
      210, 0, 52, 92, 163, 2, 222, 130, 70, 80, 132, 80, 243, 28, 110, 25, 18,
      20, 98, 63, 51, 5, 136, 72, 206, 212, 46, 255, 220, 131, 188, 133, 109,
    ]);

    expect(mock_crypto_subtle_encrypt.callCount).to.be(1);
    expect(
      mock_crypto_subtle_encrypt.calledWith(
        { name: "AES-CBC", iv: iv },
        "imported_key",
        input_data_array
      )
    ).to.be(true);

    expect(mock_crypto_subtle_decrypt.callCount).to.be(1);
    expect(
      mock_crypto_subtle_decrypt.calledWith(
        { name: "AES-CBC", iv: iv },
        "imported_key",
        "encrypted_data"
      )
    ).to.be(true);

    const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
        4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
        +qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
        kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
        0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
        cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
        mwIDAQAB
        -----END PUBLIC KEY-----`;

    expect(mock_pem2ab.callCount).to.be(1);
    expect(mock_pem2ab.calledWith(pemEncodedKey)).to.be(true);

    expect(mock_crypto_subtle_sign.callCount).to.be(1);
    expect(
        mock_crypto_subtle_sign.calledWith(
            { name: "RSASSA-PKCS1-v1_5" },
            "crypto_key",
            "data"
        )
    ).to.be(true);

    expect(mock_crypto_subtle_verify.callCount).to.be(1);
    expect(
      mock_crypto_subtle_verify.calledWith(
        { name: "RSASSA-PKCS1-v1_5" },
        "crypto_key",
        "base64url_decode_jwsSignature)",
        "encoded_jwsSigningInput"
      )
    ).to.be(true);
  });
});
