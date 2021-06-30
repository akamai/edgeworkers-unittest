import {onClientRequest,  onClientResponse} from "../../../src/examples/remove-cookies-static-files/main";
import Request from "request";
import Response from "response";

describe('Remove incoming Cookies and Remove Set-Cookie for outgoing for Static Files', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("onClientRequest should remove Cookie from static files based on extensions", () => {
        let requestMock = new Request();
        requestMock.path = "/image.jpg";
        onClientRequest(requestMock);
        expect(requestMock.removeHeader).toHaveBeenCalledTimes(1);
        expect(requestMock.removeHeader).toHaveBeenCalledWith("Cookie");   
    });

    test("onClientRequest should not remove Cookie for normal request", () => {
        let requestMock = new Request();
        requestMock.path = "/books";
        onClientRequest(requestMock);
        expect(requestMock.removeHeader).not.toHaveBeenCalled();
    });

    test("onClientResponse should remove Set-Cookie for outgoing for Static Files based on extensions", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        requestMock.path = "/image.jpg";
        onClientResponse(requestMock, responseMock);
        expect(responseMock.removeHeader).toHaveBeenCalledTimes(1);
        expect(responseMock.removeHeader).toHaveBeenCalledWith("Set-Cookie"); 
    });

    test("onClientResponse should not remove Set-Cookie for normal request", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        requestMock.path = "/books";
        onClientResponse(requestMock, responseMock);
        expect(responseMock.removeHeader).not.toHaveBeenCalled();
    });

});

