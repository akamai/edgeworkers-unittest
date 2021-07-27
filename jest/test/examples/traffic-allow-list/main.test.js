import {onClientRequest}from "work-with-request-properties/traffic-allow-list/main";
import Request from "request";

describe('onClientRequest should modify allow or deny message depending on country of end user', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test("onClientRequest should allow message if country of end user is not present in US embargoed countries list", () => {
        let requestMock = new Request();
        requestMock.userLocation.country = 'CA';
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalled();
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, {"Content-Type": ["text/html;charset=utf-8"]}, "<html><body><h1>Hello CA from Akamai EdgeWorkers!</h1></body></html>");
    });

    test("onClientRequest should deny message if country of end user is present in US embargoed countries list", () => {
        let requestMock = new Request();
        requestMock.userLocation.country = 'KP';
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalled();
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(403, {"Content-Type": ["text/html;charset=utf-8"]}, "<html><body><h1>Sorry, users from KP may not view this content</h1></body></html>", "EW-embargo");
    });

});