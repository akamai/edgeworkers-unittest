import {onClientRequest, onClientResponse} from "../../../src/edgeworkers/examples/bundle-third-party-modules/typescript-module-bundle/src/main";
import Request from "../../../__mocks__/request";
import Response from "../../../__mocks__/response";

const sinon = require("sinon");
const expect = require('expect.js');

describe('demonstrates unit testing edgeworker written in TypeScript', () => {

    afterEach(function () {
        sinon.restore();
    });
    
    it("onClientRequest should respond with Hello World", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        onClientRequest(requestMock, responseMock);
        expect(requestMock.respondWith.callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(200, {}, "<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>")).to.be(true);
    });

    it("onClientResponse should set X-Hello-World header to a hashed value", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        onClientResponse(requestMock, responseMock);
        expect(responseMock.setHeader.calledWith('X-Hello-World','5e748421a43bbfa7eaffe4f8e0be823e')).to.be(true);
    });

});