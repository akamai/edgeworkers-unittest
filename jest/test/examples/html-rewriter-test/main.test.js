import Request from "request";
import { mockHtmlRewritingStream, mockOnElement } from "html-rewriter";
import { responseProvider } from "edgeworkers/examples/html-rewriter/main";
import { createResponse } from "create-response";
import { httpRequest, HttpResponse } from "http-request";

describe("EdgeWorker that consumes an HTML document and rewrites it", () => {
  test("responseProvider should retrieve the body of the request", async () => {
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

    const responsePromise = responseProvider(requestMock);
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
});
