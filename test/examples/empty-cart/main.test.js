import {mock_Cookies_get} from "../../../__mocks__/cookies";
import {onClientRequest} from "../../../src/examples/empty-cart/main";
import Request from "../../../__mocks__/request";

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

