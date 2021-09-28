import {httpRequest, HttpResponse, mock_HttpResponse_json} from "http-request";
import {createResponse} from "create-response";
import {responseProvider} from "../../../src/edgeworkers/examples/respond-from-edgeworkers/responseprovider/api-orchestration-buffered/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Combine 3 api endpoints returning JSON into a single JSON response', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("return combined response of 3 API endpoints", async () => {
        let requestMock = new Request();
        let mockHttpResponse1 = new HttpResponse();
        mockHttpResponse1.json.returns(new Promise(function(resolve, reject) {
            resolve({"status":"success", "message":"API 1 response"});
        }));
        let mockHttpResponse2 = new HttpResponse();
        mockHttpResponse2.json.returns(new Promise(function(resolve, reject) {
            resolve({"status":"success", "message":"API 2 response"});
        }));
        let mockHttpResponse3 = new HttpResponse();
        mockHttpResponse3.json.returns(new Promise(function(resolve, reject) {
            resolve({"status":"success", "message":"API 3 response"});
        }));
        httpRequest
            .onCall(0).returns(new Promise(function(resolve) {resolve(mockHttpResponse1)}))
            .onCall(1).returns(new Promise(function(resolve) {resolve(mockHttpResponse2)}));
        httpRequest.returns(new Promise(function(resolve) {resolve(mockHttpResponse3)}));

        await responseProvider(requestMock);
        expect((createResponse).callCount).to.be(1);
        expect((createResponse).calledWith(200, { 'Content-Type': ['application/json'] },
            JSON.stringify({
                endPoint1: { status: 'success', message: 'API 3 response' },
                endPoint2: { status: 'success', message: 'API 3 response' },
                endPoint3: { status: 'success', message: 'API 3 response' }
            })));
    });

});

