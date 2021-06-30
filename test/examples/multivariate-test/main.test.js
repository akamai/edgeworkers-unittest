import {onClientRequest, onClientResponse} from "../../../src/examples/multivariate-test/main";
import Request from "request";
import Response from "response";
import {SetCookie ,mock_Cookies_get, mock_Cookies_add, mock_Cookies_delete, mock_SetCookie_toHeader, mock_Cookies_toHeader} from "cookies";


describe('multivariate testing: assign new users to an A/B testing group', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test("randomly assign when no params and cookies are set", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(mock_Cookies_get).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_get).toHaveBeenCalledWith('test1');
        expect(mock_Cookies_get).toHaveBeenCalledWith('test2');
        expect(mock_Cookies_delete).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_delete).toHaveBeenCalledWith('test1');
        expect(mock_Cookies_delete).toHaveBeenCalledWith('test2');
        expect(mock_Cookies_add).toHaveBeenCalledTimes(2);
        expect(requestMock.setHeader).toHaveBeenCalledTimes(2);
        expect(requestMock.route).toHaveBeenCalled();
    });

    test("Forced assignment of a single variant", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?test2=2c"
        requestMock.query = "test2=2c";
        mock_Cookies_toHeader.mockReturnValue("2c");

        onClientRequest(requestMock);
        expect(mock_Cookies_get).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_get).toHaveBeenCalledWith('test1');
        expect(mock_Cookies_get).toHaveBeenCalledWith('test2');
        expect(mock_Cookies_delete).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_delete).toHaveBeenCalledWith('test1');
        expect(mock_Cookies_delete).toHaveBeenCalledWith('test2');
        expect(mock_Cookies_add).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_add).toHaveBeenCalledWith("test2", "2c");
        expect(requestMock.setHeader).toHaveBeenCalledTimes(2);
        expect(requestMock.setHeader).toHaveBeenCalledWith("Cookie", "2c");
        expect(requestMock.route).toHaveBeenCalled();
    });

    test("Forced assignment of both variant", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?test1=1a&test2=2c"
        requestMock.query = "test1=1a&test2=2c";
        mock_Cookies_toHeader.mockReturnValueOnce("1a").mockReturnValue("2c");

        onClientRequest(requestMock);
        expect(mock_Cookies_get).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_get).toHaveBeenCalledWith('test1');
        expect(mock_Cookies_get).toHaveBeenCalledWith('test2');
        expect(mock_Cookies_delete).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_delete).toHaveBeenCalledWith('test1');
        expect(mock_Cookies_delete).toHaveBeenCalledWith('test2');
        expect(mock_Cookies_add).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_add).toHaveBeenCalledWith("test1", "1a");
        expect(mock_Cookies_add).toHaveBeenCalledWith("test2", "2c");
        expect(requestMock.setHeader).toHaveBeenCalledTimes(2);
        expect(requestMock.setHeader).toHaveBeenCalledWith("Cookie", "1a");
        expect(requestMock.setHeader).toHaveBeenCalledWith("Cookie", "2c");
        expect(requestMock.respondWith).toHaveBeenCalled();
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json'] }, JSON.stringify({ heroImageUrl: '/assets/images/hero2c.jpg', text: 'This is variant 2c, generated from an Akamai EdgeWorker'}));
    });

    test("onClientResponse should call the responseAction function, if it exists on the variant", () => {
        let requestMock = new Request();
        mock_Cookies_get.mockReturnValueOnce("1a").mockReturnValue("2b");        
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValueOnce("1a").mockReturnValue("2b");

        onClientResponse(requestMock, responseMock);
        expect(mock_Cookies_get).toHaveBeenCalledTimes(2);
        expect(mock_Cookies_get).toHaveBeenCalledWith('test1');
        expect(mock_Cookies_get).toHaveBeenCalledWith('test1');
        expect(SetCookie).toHaveBeenCalledTimes(2);
        expect(SetCookie).toHaveBeenCalledWith({"name": "test1", "path": "/", "value": "1a"});
        expect(SetCookie).toHaveBeenCalledWith({"name": "test2", "path": "/", "value": "2b"});
        expect(mock_SetCookie_toHeader).toHaveBeenCalledTimes(2);
        expect(responseMock.addHeader).toHaveBeenCalledTimes(3);
        expect(responseMock.addHeader).toHaveBeenCalledWith("Set-Cookie", "1a");
        expect(responseMock.addHeader).toHaveBeenCalledWith("Set-Cookie", "2b");
        expect(responseMock.addHeader).toHaveBeenCalledWith("X-Variant", "2b");
    });

});

