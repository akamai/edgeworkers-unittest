import {onClientResponse} from "../../../src/examples/cookie-geolocation/main";
import Request from "request";
import Response from "response";
import {SetCookie, mock_Cookies_get, mock_SetCookie_toHeader, mock_Cookies_add} from "cookies";


describe('Add a geoloation data to a cookie in the HTTP response.', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("onClientResponse should set location cookie in the response header when salesRegion is empty", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValue("location=CA+NS+HALIFAX; Max-Age=86400; Path=/");

        onClientResponse(requestMock, responseMock);
        expect(SetCookie).toHaveBeenCalledTimes(1);
        expect(SetCookie).toHaveBeenCalledWith({"maxAge": 86400, "name": "location", "path": "/", "value": "CA+NS+HALIFAX"});
        expect(responseMock.addHeader).toHaveBeenCalledTimes(1);
        expect(responseMock.addHeader).toHaveBeenCalledWith("Set-Cookie", "location=CA+NS+HALIFAX; Max-Age=86400; Path=/");   
    });


    test("should set location and salesRegion cookie in the response header when salesRegion is not empty", () => {
        let requestMock = new Request();
        requestMock.userLocation.country = 'US';
        requestMock.userLocation.region = 'CT';
        requestMock.userLocation.city = 'SYRACUSE';
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValueOnce("location=US+CT+SYRACUSE; Max-Age=86400; Path=/").mockReturnValue("salesRegion=Northeast:55982803; Max-Age=86400; Path=/");

        onClientResponse(requestMock, responseMock);
        expect(SetCookie).toHaveBeenCalledTimes(2);
        expect(SetCookie).toHaveBeenCalledWith({"maxAge": 86400, "name": "location", "path": "/", "value": "US+CT+SYRACUSE"});
        expect(SetCookie).toHaveBeenCalledWith({"maxAge": 86400, "name": "salesRegion", "path": "/", "value": "Northeast:55982803"});
        expect(responseMock.addHeader).toHaveBeenCalledTimes(2);
        expect(responseMock.addHeader).toHaveBeenCalledWith("Set-Cookie", "location=US+CT+SYRACUSE; Max-Age=86400; Path=/");
        expect(responseMock.addHeader).toHaveBeenCalledWith("Set-Cookie", "salesRegion=Northeast:55982803; Max-Age=86400; Path=/");   

    });

   
});

