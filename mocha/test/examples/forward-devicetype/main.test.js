import {onClientRequest} from "../../../src/edgeworkers/examples/work-with-request-properties/forward-devicetype/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('onClientRequest should modify forward path based on device type to point to device specific content', () => {

    afterEach(() => {
        sinon.reset();
    });
    
    it("onClientRequest should modify forward path to /mobile if device type is mobile", () => {
        let requestMock = new Request();
        requestMock.device.isMobile = true;
        onClientRequest(requestMock);
        expect(requestMock.route.called).to.be(true)
        expect((requestMock.route).callCount).to.be(1);
        expect(requestMock.route.calledWith({ path: '/mobile' + requestMock.path })).to.be(true);
    });

    it("onClientRequest should modify forward path to /tablet if device type is tablet", () => {
        let requestMock = new Request();
        requestMock.device.isTablet = true;
        onClientRequest(requestMock);
        expect(requestMock.route.called).to.be(true)
        expect((requestMock.route).callCount).to.be(1);
        expect(requestMock.route.calledWith({ path: '/tablet' + requestMock.path })).to.be(true);
    });

    it("onClientRequest should not modify forward path", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(requestMock.setVariable.callCount).to.be(0);
    });
});
