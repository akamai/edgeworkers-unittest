import {mock_Cookies_get, mock_Cookies_add, mock_Cookies_delete, mock_SetCookie_toHeader, mock_Cookies_toHeader} from "../../../__mocks__/cookies";
import {onClientRequest, onClientResponse} from "../../../src/examples/a-b-test/main";
import Request from "../../../__mocks__/request";
import Response from "../../../__mocks__/response";

describe('assign a new user to a group for A/B testing ', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("randomly assign", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        
        expect(mock_Cookies_get).toHaveBeenCalledTimes(1);
        expect(mock_Cookies_get).toHaveBeenCalledWith('testGroup');
        expect(mock_Cookies_delete).toHaveBeenCalledTimes(1);
        expect(mock_Cookies_delete).toHaveBeenCalledWith('testGroup');
        expect(mock_Cookies_add).toHaveBeenCalledTimes(1);
        expect(requestMock.setHeader).toHaveBeenCalledTimes(1);
        expect(requestMock.route).toHaveBeenCalledTimes(1);
    });

    test("forced assignment when query params same as existing cookie", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?testGroup=B"
        requestMock.query = "testGroup=B";
        mock_Cookies_get.mockReturnValue("B");

        onClientRequest(requestMock);
        expect(mock_Cookies_get).toHaveBeenCalledTimes(1);
        expect(mock_Cookies_get).toHaveBeenCalledWith('testGroup');
        expect(mock_Cookies_delete).not.toHaveBeenCalled();
        expect(mock_Cookies_add).not.toHaveBeenCalled();
        expect(requestMock.setHeader).not.toHaveBeenCalled();
        expect(requestMock.route).not.toHaveBeenCalled();
    });

    test("forced assignment when query param different than cookie value", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?testGroup=B"
        requestMock.query = "testGroup=B";
        mock_Cookies_get.mockReturnValue("A");
        mock_Cookies_toHeader.mockReturnValue('B');

        onClientRequest(requestMock);
        expect(mock_Cookies_get).toHaveBeenCalledTimes(1);
        expect(mock_Cookies_get).toHaveBeenCalledWith('testGroup');
        expect(mock_Cookies_delete).toHaveBeenCalled();
        expect(mock_Cookies_delete).toHaveBeenCalledWith("testGroup");
        expect(mock_Cookies_add).toHaveBeenCalled();
        expect(mock_Cookies_add).toHaveBeenCalledWith("testGroup", "B");
        expect(requestMock.setHeader).toHaveBeenCalled();
        expect(requestMock.setHeader).toHaveBeenCalledWith("Cookie", "B");
        expect(requestMock.route).not.toHaveBeenCalled();
    });

    test("onClientResponse Set-Cookie", () => {
        let requestMock = new Request();
        mock_Cookies_get.mockReturnValue("B");        
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValue("B");

        onClientResponse(requestMock, responseMock);
        expect(mock_Cookies_get).toHaveBeenCalledTimes(1);
        expect(mock_Cookies_get).toHaveBeenCalledWith('testGroup');
        expect(mock_SetCookie_toHeader).toHaveBeenCalledTimes(1);
        expect(responseMock.setHeader).toHaveBeenCalledWith("Set-Cookie", "B");
    });


  });

