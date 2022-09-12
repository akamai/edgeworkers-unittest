import {onClientRequest, onOriginResponse, onOriginRequest} from "../../../edgeworkers/examples/respond-from-edgeworkers/encoding/encoding/main";
import Request from "request";
import Response from "response";
import {
    atob,
    btoa,
    mock_base16_decode,
    mock_base64_decode,
    mock_base64url_decode,
    mock_TextEncoder_encode
} from "../../../__mocks__/encoding";
const expect = require('expect.js');
const sinon = require("sinon");

describe('EdgeWorker that has atob, btoa, baseX.decode usage', () => {

    afterEach(() => {
        sinon.reset();
    });

    it("onClientRequest decodes hello World by using decode and atob ", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(mock_base64_decode.callCount).to.be(1);
        expect(atob.callCount).to.be(1);

        expect(mock_base64_decode.calledWith("SGVsbG8=", "String")).to.be(true);
        expect(atob.calledWith("V29ybGQ=")).to.be(true);

    });

    it("onOriginRequest decodes Hello World by using btoa, base64url.decode and base16.decode", () => {
        let requestMock = new Request();
        onOriginRequest(requestMock);

        expect(mock_base64url_decode.callCount).to.be(1);
        expect(btoa.callCount).to.be(1);
        expect(mock_base16_decode.callCount).to.be(1);

        expect(mock_base16_decode.calledWith("576F726C64", "String")).to.be(true);
        expect(btoa.calledWith("Hello")).to.be(true);
    });

    it("onOriginResponse decodes to Uint8Array using base64.decode", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        onOriginResponse(requestMock, responseMock);
        expect(mock_base64_decode.callCount).to.be(1);

        expect(mock_base64_decode.calledWith("SGVsbG8sIHdvcmxk", "Uint8Array")).to.be(true);
    });
});
