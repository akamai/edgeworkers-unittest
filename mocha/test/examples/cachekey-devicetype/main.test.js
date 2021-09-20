import {onClientRequest} from "../../../src/edgeworkers/examples/control-cache/cachekey-devicetype/main"
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Include devcie type in cachekey', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("onClientRequest should set variable PMUSER_DEVICETYPE to Mobile", () => {
        let requestMock = new Request();
        requestMock.device.isMobile = true;
        onClientRequest(requestMock);
        expect(requestMock.setVariable.called).to.be(true)
        expect((requestMock.setVariable).callCount).to.be(2);
        expect(requestMock.setVariable.calledWith('PMUSER_DEVICETYPE', 'Mobile')).to.be(true);

        expect((requestMock.cacheKey.includeVariable).callCount).to.be(1);
    });

    it("onClientRequest should set variable PMUSER_DEVICETYPE to Tablet", () => {
        let requestMock = new Request();
        requestMock.device.isTablet = true;
        onClientRequest(requestMock);
        expect(requestMock.setVariable.called).to.be(true)
        expect((requestMock.setVariable).callCount).to.be(2);
        expect(requestMock.setVariable.calledWith('PMUSER_DEVICETYPE', 'Tablet')).to.be(true);

        expect((requestMock.cacheKey.includeVariable).callCount).to.be(1);
    });

    it("onClientRequest should set variable PMUSER_DEVICETYPE to Desktop", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(requestMock.setVariable.called).to.be(true)
        expect((requestMock.setVariable).callCount).to.be(1);
        expect(requestMock.setVariable.calledWith('PMUSER_DEVICETYPE', 'Desktop')).to.be(true);

        expect((requestMock.cacheKey.includeVariable).callCount).to.be(1);
    });

  });




  