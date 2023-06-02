const sinon = require("sinon");

//subtle object
export const mock_crypto_subtle_digest = sinon.stub();
export const mock_crypto_subtle_importKey = sinon.stub();
export const mock_crypto_subtle_encrypt = sinon.stub();
export const mock_crypto_subtle_decrypt = sinon.stub();
export const mock_crypto_subtle_sign = sinon.stub();
export const mock_crypto_subtle_verify = sinon.stub();

class Subtle {
  constructor() {
    this.digest = mock_crypto_subtle_digest;
    this.importKey = mock_crypto_subtle_importKey;
    this.encrypt = mock_crypto_subtle_encrypt;
    this.decrypt = mock_crypto_subtle_decrypt;
    this.sign = mock_crypto_subtle_sign;
    this.verify = mock_crypto_subtle_verify;
  }
}

//crypto object
export const mock_crypto_getRandomValues = sinon.stub();

class Crypto {
  constructor() {
    this.getRandomValues = mock_crypto_getRandomValues;
    this.subtle = new Subtle();
  }
}
export const crypto = new Crypto();

//are not property of either crypto or subtle
export const mock_pem2ab = sinon.stub();
export const pem2ab = mock_pem2ab;
