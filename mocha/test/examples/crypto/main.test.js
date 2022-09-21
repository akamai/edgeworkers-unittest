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
    expect(mock_crypto_getRandomValues.calledWith()).to.be(true);

    expect(mock_crypto_subtle_digest.callCount).to.be(1);
    expect(mock_crypto_subtle_digest.calledWith()).to.be(true);

    expect(mock_crypto_subtle_importKey.callCount).to.be(2);
    expect(mock_crypto_subtle_importKey.calledWith()).to.be(true);

    expect(mock_crypto_subtle_encrypt.callCount).to.be(1);
    expect(mock_crypto_subtle_encrypt.calledWith()).to.be(true);

    expect(mock_crypto_subtle_decrypt.callCount).to.be(1);
    expect(mock_crypto_subtle_decrypt.calledWith()).to.be(true);

    expect(mock_pem2ab.callCount).to.be(1);
    expect(mock_pem2ab.calledWith()).to.be(true);

    expect(mock_crypto_subtle_verify.callCount).to.be(1);
    expect(mock_crypto_subtle_verify.calledWith()).to.be(true);
  });
});
