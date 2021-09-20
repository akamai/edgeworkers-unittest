import {onClientRequest} from "../../../src/edgeworkers/examples/work-with-request-properties/traffic-allow-list/main.js";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('onClientRequest', () => {

    afterEach(function () {
        sinon.reset();
    });    
    
    it("should allow message if country of end user is not present in US embargoed countries list", () => {
        let requestMock = new Request();
        requestMock.userLocation.country = 'CA';
        onClientRequest(requestMock);
        expect(requestMock.respondWith.called).to.be(true)
        expect(requestMock.respondWith.callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(200, {"Content-Type": ["text/html;charset=utf-8"]}, "<html><body><h1>Hello CA from Akamai EdgeWorkers!</h1></body></html>")).to.be(true);
    });

    it("should deny message if country of end user is present in US embargoed countries list", () => {
        let requestMock = new Request();
        requestMock.userLocation.country = 'KP';
        onClientRequest(requestMock);
        expect(requestMock.respondWith.called).to.be(true)
        expect(requestMock.respondWith.callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(403, {"Content-Type": ["text/html;charset=utf-8"]}, "<html><body><h1>Sorry, users from KP may not view this content</h1></body></html>", "EW-embargo")).to.be(true);
    });
});
