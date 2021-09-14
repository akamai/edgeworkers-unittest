import {httpRequest, HttpResponse, mock_HttpResponse_getHeaders} from "http-request";
import {createResponse} from "create-response";
import {responseProvider} from "../../../src/edgeworkers/libraries/find-replace-stream/main";
import Request, {mockGetVariable} from "request";
import {TextDecoderStream, TextEncoderStream} from "text-encode-transform";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Modify an HTML streamed response by replacing text string', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("should remove content-encoding & content-length headers and modify HTTP response by performing a find & replace operation", () => {
        let requestMock = new Request();
        let mockHttpResponse = new HttpResponse();
        requestMock.url = "/helloworld";
        mockGetVariable.mockReturnValueOnce("xyz").mockReturnValue("abc");
        mock_HttpResponse_getHeaders.mockReturnValue({"content-encoding":"zip", "content-length":"200", "header3":"value3"});
        httpRequest.mockReturnValue(new Promise(function(resolve) {resolve(mockHttpResponse)}));
        createResponse.mockReturnValue({"status":200, "headers":{"header3": "value3"}, "body":"modified HTTP response abc"});

        const responsePromise = responseProvider(requestMock);
                expect(httpRequest.calledWith("https://www.example.com/helloworld")).to.be(true);

        responsePromise.then( (response) => {
                    expect(createResponse.calledWith(200, {"header3": "value3"}, mockHttpResponse.body)).to.be(true);

            expect(TextEncoderStream.called).to.be(true)
            expect(response).toEqual({"status":200, "headers":{"header3": "value3"}, "body":"modified HTTP response abc"});
            expect(TextDecoderStream.called).to.be(true)
        }).catch((error)=>console.log(error));
               
    });

});

