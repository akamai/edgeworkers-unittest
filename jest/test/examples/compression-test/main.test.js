import { mockCompressionStream, mockDecompressionStream } from "streams";
import { mockHtmlRewritingStream, mockOnElement } from "html-rewriter";
import Request from "request";
import { createResponse } from "create-response";
import { httpRequest, HttpResponse } from "http-request";

import { responseProvider } from "examples/respond-from-edgeworkers/responseprovider/hello-world-compressed/main";

describe("EdgeWorker that consumes an HTML document and rewrites it", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("responseProvider should pipe body through compression streams", async () => {
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
      expect(mockCompressionStream).toHaveBeenCalledTimes(1);
      expect(mockDecompressionStream).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        status: 200,
        headers: {},
        body: "<b>Hello World!</b>"
      });
    });
  });
});
