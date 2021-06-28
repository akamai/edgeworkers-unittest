import {httpRequest, HttpResponse, mock_HttpResponse_getHeaders} from "../../../__mocks__/http-request";
import {createResponse} from "../../../__mocks__/create-response";
import {responseProvider} from "../../../src/examples/find-replace-stream/main";
import Request, {mockGetVariable} from "../../../__mocks__/request";
import {TextDecoderStream, TextEncoderStream} from "../../../__mocks__/text-encode-transform";


describe('Modify an HTML streamed response by replacing text string', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("should remove content-encoding & content-length headers and modify HTTP response by performing a find & replace operation", () => {
        let requestMock = new Request();
        let mockHttpResponse = new HttpResponse();
        requestMock.url = "/helloworld";
        mockGetVariable.mockReturnValueOnce("xyz").mockReturnValue("abc");
        mock_HttpResponse_getHeaders.mockReturnValue({"content-encoding":"zip", "content-length":"200", "header3":"value3"});
        httpRequest.mockReturnValue(new Promise(function(resolve) {resolve(mockHttpResponse)}));
        createResponse.mockReturnValue({"status":200, "headers":{"header3": "value3"}, "body":"modified HTTP response abc"});

        const responsePromise = responseProvider(requestMock);
        expect(httpRequest).toHaveBeenCalledWith("https://www.example.com/helloworld");
        responsePromise.then( (response) => {
            expect(createResponse).toHaveBeenCalledWith(200, {"header3": "value3"}, mockHttpResponse.body);
            expect(TextEncoderStream).toHaveBeenCalled();
            expect(response).toEqual({"status":200, "headers":{"header3": "value3"}, "body":"modified HTTP response abc"});
            expect(TextDecoderStream).toHaveBeenCalled();
        }).catch((error)=>console.log(error));
               
    });

});

