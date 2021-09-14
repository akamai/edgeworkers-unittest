import {httpRequest, HttpResponse, mock_HttpResponse_json} from "http-request";
import {createResponse} from "create-response";
import {responseProvider} from "../../../src/edgeworkers/examples/respond-from-edgeworkers/responseprovider/api-orchestration-buffered/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Combine 3 api endpoints returning JSON into a single JSON response', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("return combined response of 3 API endpoints", async () => {
        let requestMock = new Request();
        let mockHttpResponse1 = new HttpResponse();
        mockHttpResponse1.json.mockReturnValue(new Promise(function(resolve, reject) {
                resolve({"status":"success", "message":"API 1 response"});
        }));
        let mockHttpResponse2 = new HttpResponse();
        mockHttpResponse2.json.mockReturnValue(new Promise(function(resolve, reject) {
            resolve({"status":"success", "message":"API 2 response"});
        }));
        let mockHttpResponse3 = new HttpResponse();
        mockHttpResponse3.json.mockReturnValue(new Promise(function(resolve, reject) {
            resolve({"status":"success", "message":"API 3 response"});
        }));
        httpRequest.mockReturnValueOnce(new Promise(function(resolve) {resolve(mockHttpResponse1)}))
        .mockReturnValueOnce(new Promise(function(resolve) {resolve(mockHttpResponse2)}))
        .mockReturnValue(new Promise(function(resolve) {resolve(mockHttpResponse3)}));

        await responseProvider(requestMock);
        expect((createResponse).callcount).to.be((createResponse));
        expect(createResponse).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json'] },
            JSON.stringify({
                endPoint1: { status: 'success', message: 'API 3 response' },
                endPoint2: { status: 'success', message: 'API 3 response' },
                endPoint3: { status: 'success', message: 'API 3 response' }
            }));        
    });

});

