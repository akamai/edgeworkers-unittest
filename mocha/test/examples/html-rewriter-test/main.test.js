import Request from "request";
import { mockHtmlRewritingStream, mockOnElement } from "html-rewriter";
import { responseProvider } from "../../../edgeworkers/examples/html-rewriter/main";
import { createResponse } from "create-response";
import { httpRequest, HttpResponse } from "http-request";

const sinon = require("sinon");
const expect = require('expect.js');

describe("EdgeWorker that consumes an HTML document and rewrites it", () => {
  afterEach(() => {
    sinon.reset();
  });
  it("responseProvider should retrieve the body of the request", () => {
    let requestMock = new Request();
    let mockHttpResponse = new HttpResponse();
    requestMock.body = "<b>Hello</b>";
    createResponse.returns({
      status: 200,
      headers: {},
      body: "<b>Hello World!</b>"
    });
    httpRequest.returns(
      new Promise(function(resolve) {
        resolve(mockHttpResponse);
      })
    );

    const responsePromise = responseProvider(requestMock);
    responsePromise.then(response => {
      expect(mockHtmlRewritingStream.callCount).to.be(1);
      expect(mockOnElement.callCount).to.be(1);
      expect(createResponse.callCount).to.be(1);
      expect(createResponse.calledWith(200, {}, "<b>Hello World!</b>"));
      expect(response).toEqual({
        status: 200,
        headers: {},
        body: "<b>Hello World!</b>"
      });
    });
  });
});
