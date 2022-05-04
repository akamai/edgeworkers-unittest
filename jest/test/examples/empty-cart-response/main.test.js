import {mock_Cookies_get} from "cookies";
import {onClientResponse} from "examples/respond-from-edgeworkers/respondwith/empty-cart/main"
import Request from "request";
import Response from "response";


describe('EdgeWorker that will respond with an empty JSON for an empty shopping cart', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("return empty JSON when shopping cart is empty", () => {
        const requestMock = new Request();
        const responseMock = new Response();

        onClientResponse(requestMock, responseMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json; charset=utf-8'] }, '{}');
    });

    test("respondWith is not called when shopping cart is not empty", () => {
        const requestMock = new Request();
        const responseMock = new Response();
        mock_Cookies_get.mockReturnValue('macbook pro');

        onClientResponse(requestMock, responseMock);
        expect(requestMock.respondWith).not.toHaveBeenCalled();
    });
});

