import {onClientRequest, onClientResponse} from "bundle-third-party-modules/typescript-module-bundle/src/main";
import Request from "../../../__mocks__/request";
import Response from "../../../__mocks__/response";

describe('demonstrates unit testing edgeworker written in TypeScript', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test("onClientRequest should respond with Hello World", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        onClientRequest(requestMock, responseMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, {}, "<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>");
    });

    test("onClientResponse should set X-Hello-World header to a hashed value", () => {
        let requestMock = new Request();
        let responseMock = new Response();
        onClientResponse(requestMock, responseMock);
        expect(responseMock.setHeader).toHaveBeenCalledTimes(1);
        expect(responseMock.setHeader).toHaveBeenCalledWith('X-Hello-World','5e748421a43bbfa7eaffe4f8e0be823e');
    });

});