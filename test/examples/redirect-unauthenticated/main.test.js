import {onClientRequest} from "../../../src/examples/redirect-unauthenticated/main";
import Request from "request";
import {Cookies, mock_Cookies_get} from "cookies";

describe('Redirect Unauthenticated Users to a Sign-In Page', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("onClientRequest should redirect unauthenticated users", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(Cookies).toHaveBeenCalled();
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(302, {"Location": "http://www.example.com/signin?redirect_url=https%3A%2F%2Fwww.example.com%2Fhelloworld%3Fparam1%3Dvalue1%26param2%3Dvalue2"}, "");
    });

    test("onClientRequest should not redirect if session-id is present", () => {
        let requestMock = new Request();
        mock_Cookies_get.mockReturnValue("sssssessionidddddd");
        onClientRequest(requestMock);
        expect(Cookies).toHaveBeenCalled();
        expect(requestMock.respondWith).not.toHaveBeenCalled();
    });

});

