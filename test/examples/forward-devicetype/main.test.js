import onClientRequest from "../../../src/examples/forward-devicetype/main";
import Request from "request";

describe('onClientRequest should modify forward path based on device type to point to device specific content', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test("onClientRequest should modify forward path to /mobile if device type is mobile", () => {
        let requestMock = new Request();
        requestMock.device.isMobile = true;
        onClientRequest(requestMock);
        expect(requestMock.route).toHaveBeenCalled();
        expect(requestMock.route).toHaveBeenCalledTimes(1);
        expect(requestMock.route).toHaveBeenCalledWith({ path: '/mobile' + requestMock.path });
    });

    test("onClientRequest should modify forward path to /tablet if device type is tablet", () => {
        let requestMock = new Request();
        requestMock.device.isTablet = true;
        onClientRequest(requestMock);
        expect(requestMock.route).toHaveBeenCalled();
        expect(requestMock.route).toHaveBeenCalledTimes(1);
        expect(requestMock.route).toHaveBeenCalledWith({ path: '/tablet' + requestMock.path });
    });

    test("onClientRequest should not modify forward path", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(requestMock.setVariable).not.toHaveBeenCalled();
    });

});