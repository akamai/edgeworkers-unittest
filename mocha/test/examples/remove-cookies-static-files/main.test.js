import {onClientRequest,  onClientResponse} from "../../../src/edgeworkers/examples/work-with-cookies/remove-cookies-static-files/main";
import Request from "request";
import Response from "response";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Remove incoming Cookies and Remove Set-Cookie for outgoing for Static Files', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("onClientRequest should remove Cookie from static files based on extensions", () => {
        let requestMock = new Request();
        requestMock.path = "/image.jpg";
        onClientRequest(requestMock);
        expect((requestMock.removeHeader).callcount).to.be((requestMock.removeHeader));
                expect(requestMock.removeHeader.calledWith("Cookie")).to.be(true);
   
    });

    it("onClientRequest should not remove Cookie for normal request", () => {
        let requestMock = new Request();
        requestMock.path = "/books";
        onClientRequest(requestMock);
        expect(requestMock.removeHeader).not.toHaveBeenCalled();
    });

    it("onClientResponse should remove Set-Cookie for outgoing for Static Files based on extensions", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        requestMock.path = "/image.jpg";
        onClientResponse(requestMock, responseMock);
        expect((responseMock.removeHeader).callcount).to.be((responseMock.removeHeader));
                expect(responseMock.removeHeader.calledWith("Set-Cookie")).to.be(true);
 
    });

    it("onClientResponse should not remove Set-Cookie for normal request", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        requestMock.path = "/books";
        onClientResponse(requestMock, responseMock);
        expect(responseMock.removeHeader).not.toHaveBeenCalled();
    });

});

