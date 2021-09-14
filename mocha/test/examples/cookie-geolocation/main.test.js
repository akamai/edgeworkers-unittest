import {onClientResponse} from "../../../src/edgeworkers/examples/work-with-cookies/cookie-geolocation/main";
import Request from "request";
import Response from "response";
import {SetCookie, mock_Cookies_get, mock_SetCookie_toHeader, mock_Cookies_add} from "cookies";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Add a geoloation data to a cookie in the HTTP response.', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("onClientResponse should set location cookie in the response header when salesRegion is empty", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValue("location=CA+NS+HALIFAX; Max-Age=86400; Path=/");

        onClientResponse(requestMock, responseMock);
        expect((SetCookie).callcount).to.be((SetCookie));
                expect(SetCookie.calledWith({"maxAge": 86400, "name": "location", "path": "/", "value": "CA+NS+HALIFAX"})).to.be(true);

        expect((responseMock.addHeader).callcount).to.be((responseMock.addHeader));
                expect(responseMock.addHeader.calledWith("Set-Cookie", "location=CA+NS+HALIFAX; Max-Age=86400; Path=/")).to.be(true);
   
    });


    it("should set location and salesRegion cookie in the response header when salesRegion is not empty", () => {
        let requestMock = new Request();
        requestMock.userLocation.country = 'US';
        requestMock.userLocation.region = 'CT';
        requestMock.userLocation.city = 'SYRACUSE';
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValueOnce("location=US+CT+SYRACUSE; Max-Age=86400; Path=/").mockReturnValue("salesRegion=Northeast:55982803; Max-Age=86400; Path=/");

        onClientResponse(requestMock, responseMock);
        expect((SetCookie).callcount).to.be((SetCookie));
                expect(SetCookie.calledWith({"maxAge": 86400, "name": "location", "path": "/", "value": "US+CT+SYRACUSE"})).to.be(true);

                expect(SetCookie.calledWith({"maxAge": 86400, "name": "salesRegion", "path": "/", "value": "Northeast:55982803"})).to.be(true);

        expect((responseMock.addHeader).callcount).to.be((responseMock.addHeader));
                expect(responseMock.addHeader.calledWith("Set-Cookie", "location=US+CT+SYRACUSE; Max-Age=86400; Path=/")).to.be(true);

                expect(responseMock.addHeader.calledWith("Set-Cookie", "salesRegion=Northeast:55982803; Max-Age=86400; Path=/")).to.be(true);
   

    });

   
});

