import * as edgeworker from "../../../src/examples/cachekey-devicetype/main.js"
import Request from "../../../__mocks__/object/request.js";

describe('Include devcie type in cachekey', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("onClientRequest should set variable PMUSER_DEVICETYPE to Mobile", () => {
        let requestMock = new Request();
        requestMock.device.isMobile = true;
        edgeworker.onClientRequest(requestMock);
        expect(requestMock.setVariable).toHaveBeenCalled();
        expect(requestMock.setVariable).toHaveBeenCalledTimes(2);
        expect(requestMock.setVariable).toHaveBeenCalledWith('PMUSER_DEVICETYPE', 'Mobile');
        expect(requestMock.cacheKey.includeVariable).toHaveBeenCalledTimes(1);
    });

    test("onClientRequest should set variable PMUSER_DEVICETYPE to Tablet", () => {
        let requestMock = new Request();
        requestMock.device.isTablet = true;
        edgeworker.onClientRequest(requestMock);
        expect(requestMock.setVariable).toHaveBeenCalled();
        expect(requestMock.setVariable).toHaveBeenCalledTimes(2);
        expect(requestMock.setVariable).toHaveBeenCalledWith('PMUSER_DEVICETYPE', 'Tablet');
        expect(requestMock.cacheKey.includeVariable).toHaveBeenCalledTimes(1);
    });

    test("onClientRequest should set variable PMUSER_DEVICETYPE to Desktop", () => {
        let requestMock = new Request();
        edgeworker.onClientRequest(requestMock);
        expect(requestMock.setVariable).toHaveBeenCalled();
        expect(requestMock.setVariable).toHaveBeenCalledTimes(1);
        expect(requestMock.setVariable).toHaveBeenCalledWith('PMUSER_DEVICETYPE', 'Desktop');
        expect(requestMock.cacheKey.includeVariable).toHaveBeenCalledTimes(1);
    });

  });




  