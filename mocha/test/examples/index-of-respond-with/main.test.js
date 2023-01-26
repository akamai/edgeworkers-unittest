import {
    onOriginRequest,
    onOriginResponse
} from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/index-of/main";
import Request from "request";
import Response from "response";

const sinon = require("sinon");
const expect = require('expect.js');

describe('EdgeWorker that will respond with a JSON based on the query passed', () => {

    afterEach(() => {
        sinon.reset();
    });

    it("return JSON when `respondWithonOriginRequestTest` is present in query parameters", () => {
        const requestMock = new Request();
        requestMock.query = "respondWithonOriginRequestTest=hello";

        onOriginRequest(requestMock);
        expect((requestMock.respondWith).callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(200, {respond_with_stage: "onOriginRequest"}, "response constructed by ew\r\n")).to.be(true);
    });

    it("return JSON when `respondWithonOriginResponseTest` is present in query parameters", () => {
        const requestMock = new Request();
        const responseMock = new Response();
        requestMock.query = "respondWithonOriginResponseTest=hi";

        onOriginResponse(requestMock, responseMock);
        expect((requestMock.respondWith).callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(200, {respond_with_stage: "onOriginResponse"}, "response constructed by ew\r\n")).to.be(true);
    });
});