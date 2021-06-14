import {httpRequest, HttpResponse, mock_HttpResponse_json} from "../../../__mocks__/http-request";
import {createResponse} from "../../../__mocks__/create-response";
import {responseProvider} from "../../../src/examples/jsonp-wrapper/main";
import Request from "../../../__mocks__/object/request";
import {TransformStream} from "../../../__mocks__/streams";
import URLSearchParams from "../../../__mocks__/url-search-params";
import {mock_URLSearchParams_toString, mock_URLSearchParams_delete} from "../../../__mocks__/url-search-params";


describe('wrap JSON response with dynamic unique callback function leveraging Response Provider and Stream API ', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("should remove callback query param & makes a sub-request to fetch the JSON data, serving it as a stream", () => {
        let requestMock = new Request();
        let mockHttpResponse = new HttpResponse();
    
        mock_URLSearchParams_toString.mockReturnValue("param1=value1");
        createResponse.mockReturnValue({"status":"success"});
        httpRequest.mockReturnValue(new Promise(function(resolve) {resolve(mockHttpResponse)}));

        const responsePromise = responseProvider(requestMock);
        expect(mock_URLSearchParams_delete).toHaveBeenCalledWith("callback");
        expect(URLSearchParams).toHaveBeenCalledTimes(1);
        expect(TransformStream).toHaveBeenCalledTimes(1);
        expect(httpRequest).toHaveBeenCalledWith("https://www.example.com/helloworld?param1=value1", { 'Content-Type': ['application/json'] });
        responsePromise.then( (response) => {
            console.log(response);
            expect(response).toEqual({"status":"success"});
        }).catch((error)=>console.log(error));
               
    });

});

