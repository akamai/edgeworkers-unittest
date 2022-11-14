import {onClientRequest} from "../../../src/edgeworkers/examples/work-with-redirects/redirect-geo/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('onClientRequest', () => {
    afterEach(() => {
        sinon.reset();
    });

    it("should call respondWith", () => {
        let requestMock = new Request();
        requestMock.userLocation.country = "CA";
        requestMock.host = "www.example.com";
        onClientRequest(requestMock);
        expect(requestMock.respondWith.called).to.be(true)
        expect((requestMock.respondWith).callCount).to.be(1);
        expect((requestMock.respondWith).calledWith(302, {
            Location: [requestMock.scheme + '://' + 'www.example.ca' + requestMock.url]
        }, ''));
    });
});
