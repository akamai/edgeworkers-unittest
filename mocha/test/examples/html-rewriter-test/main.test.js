import Request from "request";
import { mockHtmlRewritingStream, mockOnElement } from "html-rewriter";
import { responseProvider as appendResponseProvider } from "../../../edgeworkers/examples/html-rewriter/append/main";
import { responseProvider as replaceResponseProvider } from "../../../edgeworkers/examples/html-rewriter/append/main";
import { handler as removeHandler } from "../../../edgeworkers/examples/html-rewriter/remove-attribute/main";
import { handler as replaceHandler } from "../../../edgeworkers/examples/html-rewriter/replace-children/main";
import { createResponse } from "create-response";
import { httpRequest, HttpResponse } from "http-request";
import { Element } from "../../../__mocks__/html-rewriter";

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

    const responsePromise = appendResponseProvider(requestMock);
    responsePromise.then(response => {
      expect(mockHtmlRewritingStream.callCount).to.be(1);
      expect(mockOnElement.callCount).to.be(1);
      expect(createResponse.callCount).to.be(1);
      expect(createResponse.calledWith(200, {}, "<b>Hello World!</b>"));
      expect(response).equal({
        status: 200,
        headers: {},
        body: "<b>Hello World!</b>"
      });
    });
  });

  it("responseProvider should retrieve the body of the request and remove the attribute successfully", () => {
    let mockElement = new Element();
    mockElement.getAttribute.returns("value");

    removeHandler(mockElement);
    expect(mockElement.getAttribute.callCount).to.be(1);
    expect(mockElement.removeAttribute.callCount).to.be(1);
  });

  it("responseProvider should retrieve the body of the request but fails to get the attribute", () => {
    let mockElement = new Element();
    mockElement.getAttribute.returns(undefined);

    removeHandler(mockElement);
    expect(mockElement.getAttribute.callCount).to.be(1);
    expect(mockElement.removeAttribute.callCount).to.be(0);
  });

  it("responseProvider should retrieve the body of the request and successfully replace the children in it", () => {
    let requestMock = new Request();
    let mockHttpResponse = new HttpResponse();
    requestMock.body = "<b>Hello </b>";
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

    const responsePromise = replaceResponseProvider(requestMock);
    responsePromise.then(response => {
      expect(mockHtmlRewritingStream.callCount).to.be(1);
      expect(mockOnElement.callCount).to.be(1);
      expect(createResponse.callCount).to.be(1);
      expect(response).toEqual({
        status: 200,
        headers: {},
        body: "<b>Hello World!</b>"
      });
    });
  });

  it("responseProvider should retrieve the body of the request and successfully replace the children in it", () => {
    let mockElement = new Element();
    mockElement.getAttribute.returns(undefined);

    replaceHandler(mockElement);
    expect(mockElement.getAttribute.callCount).to.be(1);
    expect(mockElement.replaceChildren.callCount).to.be(0);
  });
});
