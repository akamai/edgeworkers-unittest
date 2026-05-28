import {httpRequest, HttpResponse, mock_HttpResponse_getHeaders} from "http-request";
import {createResponse} from "create-response";
import {responseProvider} from "../../../src/edgecompute/examples/stream/response-manipulation/main";
import Request from "request";
import {TextDecoderStream, TextEncoderStream} from "text-encode-transform";

const sinon = require("sinon");
const expect = require('expect.js');

describe('demonstrates how an EdgeWorker can be used to modify an HTML response stream by adding content to the response.', () => {
    afterEach(() => {
        sinon.reset();
    });

    it("Simple Modify HTML Response - Streaming Response Version", async () => {
        let requestMock = new Request();
        let mockHttpResponse = new HttpResponse();
        createResponse.returns({"status":200, "headers":{}, "body":{}});
        mock_HttpResponse_getHeaders.returns({});
        httpRequest.returns(new Promise(function(resolve) {resolve(mockHttpResponse)}));

        const responsePromise = responseProvider(requestMock);
        expect(httpRequest.calledWith("https://www.example.com/helloworld?param1=value1&param2=value2")).to.be(true);

        const response = await responsePromise;

        // comparing using JSON.stringify to prevent property order from causing false negative
        expect(JSON.stringify(response) === JSON.stringify({"body": {}, "headers": {}, "status": 200}));
    });
});
