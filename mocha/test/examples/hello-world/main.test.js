import {onClientRequest, onClientResponse} from "../../../src/edgeworkers/examples/getting-started/hello-world/main";
import Request from "request";
import Response from "response";

const sinon = require("sinon");
const expect = require('expect.js');

describe('EdgeWorker that generates a simple html page at the Edge and adds a response header', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("onClientRequest should respondWith hello world ", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
                expect(requestMock.respondWith.calledWith(200, {}, "<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>")).to.be(true);

    });

    it("onClientResponse should setHeader X-Hello-World in response", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        onClientResponse(requestMock, responseMock);
        expect((responseMock.setHeader).callcount).to.be((responseMock.setHeader));
                expect(responseMock.setHeader.calledWith("X-Hello-World", "From Akamai EdgeWorkers")).to.be(true);

    });

});

