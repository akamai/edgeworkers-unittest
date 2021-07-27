import {onClientResponse} from "work-with-cookies/cookie-accrual/main";
import Request from "request";
import Response from "response";
import {SetCookie, mock_Cookies_get, mock_SetCookie_toHeader} from "cookies";


describe('Accrue values in a cookie as a visitor traverses a site, and trigger a promotional cookie.', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("onClientResponse should set visited cookie in response header when no. of sections visited is zero", () => {
        let requestMock = new Request();
        requestMock.path = "/cookieaccrual/about-us/";
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValue("visited cookie: about-us");

        onClientResponse(requestMock, responseMock);
        expect(SetCookie).toHaveBeenCalledTimes(1);
        expect(SetCookie).toHaveBeenCalledWith({"maxAge": 86400, "name": "visited", "path": "/", "value": ",about-us"});
        expect(responseMock.setHeader).toHaveBeenCalledTimes(1);
        expect(responseMock.setHeader).toHaveBeenCalledWith("Set-Cookie", ["visited cookie: about-us"]);   
    });

    test("onClientResponse should set visited cookie in response header when no. of sections visited is within max limit", () => {
        let requestMock = new Request();
        requestMock.path = "/cookie-accural/history/";
        let responseMock = new Response();
        mock_Cookies_get.mockReturnValue("about-us");
        mock_SetCookie_toHeader.mockReturnValue("visited cookie: about-us,history");

        onClientResponse(requestMock, responseMock);
        expect(SetCookie).toHaveBeenCalledTimes(1);
        expect(SetCookie).toHaveBeenCalledWith({"maxAge": 86400, "name": "visited", "path": "/", "value": "about-us,history"});
        expect(responseMock.setHeader).toHaveBeenCalledTimes(1);
        expect(responseMock.setHeader).toHaveBeenCalledWith("Set-Cookie", ["visited cookie: about-us,history"]);   
    });

    test("onClientResponse should set visited and promo cookie in response header when no. of sections visited exceeds max limit", () => {
        let requestMock = new Request();
        requestMock.path = "/cookie-accural/sizing/";
        let responseMock = new Response();
        mock_Cookies_get.mockReturnValue("about-us,history,products,guarantee,pricing");
        mock_SetCookie_toHeader.mockReturnValueOnce("visited cookie: about-us,history,products,guarantee,pricing,sizing").mockReturnValue("promo cookie: true");

        onClientResponse(requestMock, responseMock);
        expect(SetCookie).toHaveBeenCalledTimes(2);
        expect(SetCookie).toHaveBeenCalledWith({"maxAge": 86400, "name": "visited", "path": "/", "value": "about-us,history,products,guarantee,pricing,sizing"});
        expect(SetCookie).toHaveBeenCalledWith({ "name": "promo", "value": "true", "path": "/", "maxAge": 900 });
        expect(responseMock.setHeader).toHaveBeenCalledTimes(1);
        expect(responseMock.setHeader).toHaveBeenCalledWith("Set-Cookie", ["visited cookie: about-us,history,products,guarantee,pricing,sizing", "promo cookie: true"]);   
    });

});

