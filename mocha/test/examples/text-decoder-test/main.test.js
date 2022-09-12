import Request from "request";
import {onClientRequest} from "../../../edgeworkers/examples/respond-from-edgeworkers/encoding/text-decoder/main";
import {mock_TextDecoder_decode} from "../../../__mocks__/encoding";

const expect = require('expect.js');
const sinon = require("sinon");

describe('EdgeWorker that converts Uint8Array array of bytes into string and respond with fatal value', () => {

    afterEach(() => {
        sinon.reset();
    });

    it('onClientRequest should retrieve the fatal value', () => {
        const requestMock = new Request();

        onClientRequest(requestMock);

        expect(mock_TextDecoder_decode.callCount).to.be(1);
        expect((requestMock.respondWith).callCount).to.be(1);

        expect(mock_TextDecoder_decode.calledWith(new Uint8Array([84,104,105,115,32,105,115,32,97,32,115,97,109,112,108,101,32,112,97,114,97,103,114,97,112,104,46]))).to.be(true);
        expect((requestMock.respondWith).calledWith(231, {}, false)).to.be(true);

    });
});

