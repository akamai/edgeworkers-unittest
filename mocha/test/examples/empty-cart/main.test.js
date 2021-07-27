import {mock_Cookies_get} from "cookies";
import {onClientRequest} from "respond-from-edgeworkers/respondwith/empty-cart/main";
import Request from "request";

describe('EdgeWorker that will respond with an empty JSON for an empty shopping cart', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("return empty JSON when shopping cart is empty", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json; charset=utf-8'] }, '{}');
        
    });

    test("respondWith is not called when shopping cart is not empty", () => {
        let requestMock = new Request();
        mock_Cookies_get.mockReturnValue('macbook pro');
        onClientRequest(requestMock);
        expect(requestMock.respondWith).not.toHaveBeenCalled();
        
    });

});

