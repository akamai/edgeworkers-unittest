import {httpRequest, HttpResponse, mock_HttpResponse_json} from "../../../__mocks__/http-request";
import {createResponse} from "../../../__mocks__/create-response";
import {responseProvider} from "../../../src/examples/response-manipulation-stream/main";
import Request from "../../../__mocks__/request";
import {TextDecoderStream, TextEncoderStream} from "../../../__mocks__/text-encode-transform";


describe('demonstrates how an EdgeWorker can be used to modify an HTML response stream by adding content to the response.', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("Simple Modify HTML Response - Streaming Response Version", () => {
        let requestMock = new Request();
        let mockHttpResponse = new HttpResponse();
        createResponse.mockReturnValue({"status":200, "headers":{}, "body":{}});
        httpRequest.mockReturnValue(new Promise(function(resolve) {resolve(mockHttpResponse)}));

        const responsePromise = responseProvider(requestMock);
        expect(httpRequest).toHaveBeenCalledWith("https://www.example.com/helloworld?param1=value1&param2=value2");
        expect(responsePromise).resolves.toEqual({"body": {}, "headers": {}, "status": 200});
               
    });

});
