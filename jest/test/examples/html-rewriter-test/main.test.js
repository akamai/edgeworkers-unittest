import Request from "request";
import { mockHtmlRewritingStream, mockOnElement } from "html-rewriter";
import { responseProvider as appendResponseProvider } from "edgeworkers/examples/html-rewriter/append/main";
import { responseProvider as replaceResponseProvider } from "edgeworkers/examples/html-rewriter/append/main";
import { handler as removeHandler } from "edgeworkers/examples/html-rewriter/remove-attribute/main";
import { handler as replaceHandler } from "edgeworkers/examples/html-rewriter/replace-children/main";
import { createResponse } from "create-response";
import { httpRequest, HttpResponse } from "http-request";
import { onElement } from "../../../__mocks__/html-rewriter";

describe("EdgeWorker that consumes an HTML document and rewrites it", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("responseProvider should retrieve the body of the request and successfully rewrites it", async () => {
    let requestMock = new Request();
    let mockHttpResponse = new HttpResponse();
    requestMock.body = "<b>Hello</b>";
    createResponse.mockReturnValue({
      status: 200,
      headers: {},
      body: "<b>Hello World!</b>"
    });
    httpRequest.mockReturnValue(
      new Promise(function(resolve) {
        resolve(mockHttpResponse);
      })
    );

    const responsePromise = appendResponseProvider(requestMock);
    responsePromise.then(response => {
      expect(mockHtmlRewritingStream).toHaveBeenCalledTimes(1);
      expect(mockOnElement).toHaveBeenCalledTimes(1);
      expect(createResponse).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        status: 200,
        headers: {},
        body: "<b>Hello World!</b>"
      });
    });
  });

  test("responseProvider should retrieve the body of the request and remove the attribute successfully", async () => {
    let mockElement = new onElement();
    mockElement.getAttribute.mockReturnValue("value");

    removeHandler(mockElement);
    expect(mockElement.getAttribute).toHaveBeenCalledTimes(1);
    expect(mockElement.removeAttribute).toHaveBeenCalledTimes(1);
  });

  test("responseProvider should retrieve the body of the request but fails to get the attribute", async () => {
    let mockElement = new onElement();
    mockElement.getAttribute.mockReturnValue(undefined);

    removeHandler(mockElement);
    expect(mockElement.getAttribute).toHaveBeenCalledTimes(1);
    expect(mockElement.removeAttribute).toHaveBeenCalledTimes(0);
  });

  test("responseProvider should retrieve the body of the request and successfully replace the children in it", async () => {
    let requestMock = new Request();
    let mockHttpResponse = new HttpResponse();
    requestMock.body = "<b>Hello </b>";
    createResponse.mockReturnValue({
      status: 200,
      headers: {},
      body: "<b>Hello World!</b>"
    });
    httpRequest.mockReturnValue(
      new Promise(function(resolve) {
        resolve(mockHttpResponse);
      })
    );

    const responsePromise = replaceResponseProvider(requestMock);
    responsePromise.then(response => {
      expect(mockHtmlRewritingStream).toHaveBeenCalledTimes(1);
      expect(mockOnElement).toHaveBeenCalledTimes(1);
      expect(createResponse).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        status: 200,
        headers: {},
        body: "<b>Hello World!</b>"
      });
    });
  });

  test("responseProvider should retrieve the body of the request and successfully replace the children in it", async () => {
    let mockElement = new onElement();
    mockElement.getAttribute.mockReturnValue(undefined);

    replaceHandler(mockElement);
    expect(mockElement.getAttribute).toHaveBeenCalledTimes(1);
    expect(mockElement.replaceChildren).toHaveBeenCalledTimes(0);
  });
});
