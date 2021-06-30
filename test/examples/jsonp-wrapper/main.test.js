import {httpRequest, HttpResponse} from "http-request";
import {createResponse} from "create-response";
import {responseProvider} from "../../../src/examples/jsonp-wrapper/main";
import Request from "request";
import {TransformStream} from "streams";


describe('wrap JSON response with dynamic unique callback function leveraging Response Provider and Stream API ', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("should remove callback query param & makes a sub-request to fetch the JSON data, serving it as a stream", () => {
        let requestMock = new Request();
        let mockHttpResponse = new HttpResponse();
        requestMock.query = "param1=value1&callback=xyz";
        createResponse.mockReturnValue({"status":200, "headers":{}, "body":{}});
        httpRequest.mockReturnValue(new Promise(function(resolve) {resolve(mockHttpResponse)}));

        const responsePromise = responseProvider(requestMock);
        expect(TransformStream).toHaveBeenCalledTimes(1);
        expect(httpRequest).toHaveBeenCalledWith("https://www.example.com/helloworld?param1=value1", { 'headers': {'Accept': 'application/json'} });
        responsePromise.then( (response) => {
            expect(createResponse).toHaveBeenCalledWith(200, {}, mockHttpResponse.body);
            expect(response).toEqual({"status":200, "headers":{}, "body":{}});
        }).catch((error)=>console.log(error));
               
    });

});

