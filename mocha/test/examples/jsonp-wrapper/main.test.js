import {httpRequest, HttpResponse} from "http-request";
import {createResponse} from "create-response";
import {responseProvider} from "../../../src/edgeworkers/examples/respond-from-edgeworkers/responseprovider/jsonp-wrapper/main";
import Request from "request";
import {TransformStream} from "streams";

const sinon = require("sinon");
const expect = require('expect.js');

describe('wrap JSON response with dynamic unique callback function leveraging Response Provider and Stream API ', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("should remove callback query param & makes a sub-request to fetch the JSON data, serving it as a stream", () => {
        let requestMock = new Request();
        let mockHttpResponse = new HttpResponse();
        requestMock.query = "param1=value1&callback=xyz";
        createResponse.returns({"status":200, "headers":{}, "body":{}});
        httpRequest.returns(new Promise(function(resolve) {resolve(mockHttpResponse)}));

        const responsePromise = responseProvider(requestMock);
        expect((TransformStream).callCount).to.be(1);
        expect(httpRequest.calledWith("https://www.example.com/helloworld?param1=value1", { 'headers': {'Accept': 'application/json'} })).to.be(true);

        responsePromise.then( (response) => {
            expect(createResponse.calledWith(200, {}, mockHttpResponse.body)).to.be(true);
            expect(response).toEqual({"status":200, "headers":{}, "body":{}});
        }).catch((error)=>console.log(error));
    });
});
