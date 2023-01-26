import Request from "request";
import Response from "response";
import {
  onOriginRequest,
  onOriginResponse
} from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/index-of/main";

describe("EdgeWorker that will respond with a JSON based on query passed", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("return JSON when `respondWithonOriginRequestTest` is present in query parameters", () => {
    const requestMock = new Request();
    requestMock.query = "respondWithonOriginRequestTest=hello";

    onOriginRequest(requestMock);
    expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
    expect(requestMock.respondWith).toHaveBeenCalledWith(
      200,
      // eslint-disable-next-line camelcase
      { respond_with_stage: "onOriginRequest" },
      "response constructed by ew\r\n"
    );
  });

  test("return JSON when `respondWithonOriginResponseTest` is present in query parameters", () => {
    const requestMock = new Request();
    const responseMock = new Response();
    requestMock.query = "respondWithonOriginResponseTest=hi";

    onOriginResponse(requestMock, responseMock);
    expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
    expect(requestMock.respondWith).toHaveBeenCalledWith(
      200,
      // eslint-disable-next-line camelcase
      { respond_with_stage: "onOriginResponse" },
      "response constructed by ew\r\n"
    );
  });
});
