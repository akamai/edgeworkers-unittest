import {onClientResponse} from "../../../src/edgeworkers/examples/work-with-cookies/cookie-geolocation/main";
import Request from "request";
import Response from "response";
import {SetCookie, mock_Cookies_get, mock_SetCookie_toHeader, mock_Cookies_add} from "cookies";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Add a geoloation data to a cookie in the HTTP response.', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("onClientResponse should set location cookie in the response header when salesRegion is empty", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        mock_SetCookie_toHeader.returns("location=CA+NS+HALIFAX; Max-Age=86400; Path=/");

        onClientResponse(requestMock, responseMock);
        expect((responseMock.addHeader).callCount).to.be(1);
        expect(responseMock.addHeader.calledWith("Set-Cookie", "location=CA+NS+HALIFAX; Max-Age=86400; Path=/")).to.be(true);
    });


    it("should set location and salesRegion cookie in the response header when salesRegion is not empty", () => {
        let requestMock = new Request();
        requestMock.userLocation.country = 'US';
        requestMock.userLocation.region = 'CT';
        requestMock.userLocation.city = 'SYRACUSE';
        let responseMock = new Response();
        mock_SetCookie_toHeader.onCall(0).returns("location=US+CT+SYRACUSE; Max-Age=86400; Path=/").returns("salesRegion=Northeast:55982803; Max-Age=86400; Path=/");

        onClientResponse(requestMock, responseMock);
        expect((responseMock.addHeader).callCount).to.be(2);
        expect(responseMock.addHeader.calledWith("Set-Cookie", "location=US+CT+SYRACUSE; Max-Age=86400; Path=/")).to.be(true);
        expect(responseMock.addHeader.calledWith("Set-Cookie", "salesRegion=Northeast:55982803; Max-Age=86400; Path=/")).to.be(true);
   

    });

   
});

