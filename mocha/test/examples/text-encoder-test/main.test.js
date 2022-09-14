import Request from "request";
import {onClientRequest} from "../../../edgeworkers/examples/respond-from-edgeworkers/encoding/text-encoder/main";
import {mock_TextEncoder_encode} from "../../../__mocks__/encoding";
const expect = require('expect.js');
const sinon = require("sinon");

describe('EdgeWorker that converts a string into a Uint8Array array of bytes and respond with encoding information', () => {

    afterEach(() => {
        sinon.reset();
    });

    it('onClientRequest should retrieve the encoding information', () => {
        const requestMock = new Request();

        onClientRequest(requestMock);

        expect(mock_TextEncoder_encode.callCount).to.be(1);
        expect((requestMock.respondWith).callCount).to.be(1);

        expect(mock_TextEncoder_encode.calledWith("This is a sample paragraph.")).to.be(true);
        expect((requestMock.respondWith).calledWith(200, {}, "utf-8")).to.be(true);
    });
});