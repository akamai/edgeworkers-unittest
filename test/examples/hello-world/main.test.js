import {onClientRequest, onClientResponse} from "../../../src/examples/hello-world/main";
import Request from "../../../__mocks__/request";
import Response from "../../../__mocks__/response";

describe('EdgeWorker that generates a simple html page at the Edge and adds a response header', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("onClientRequest should respondWith hello world ", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, {}, "<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>");
    });

    test("onClientResponse should setHeader X-Hello-World in response", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        onClientResponse(requestMock, responseMock);
        expect(responseMock.setHeader).toHaveBeenCalledTimes(1);
        expect(responseMock.setHeader).toHaveBeenCalledWith("X-Hello-World", "From Akamai EdgeWorkers");
    });

});

