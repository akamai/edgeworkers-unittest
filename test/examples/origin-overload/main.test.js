import onOriginResponse from "../../../src/examples/origin-overload/main";
import Request from "../../../__mocks__/object/request";
import Response from "../../../__mocks__/object/response";

describe('onOriginResponse: This event happens as the origin response is created.', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

test("onOriginResponse should invoke respondWith if response.status is 503", () => {
    let requestMock = new Request();
    let responseMock = new Response();
    responseMock.status = 503;
    onOriginResponse(requestMock, responseMock);
    expect(responseMock.addHeader).toHaveBeenCalled();
    expect(responseMock.addHeader).toHaveBeenCalledTimes(1);
    expect(responseMock.addHeader).toHaveBeenCalledWith('Origin-Response-Status', responseMock.status);
    expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
  });

test("onOriginResponse should not invoke respondWith if response.status is not 503", () => {
    let requestMock = new Request();
    let responseMock = new Response();
    responseMock.status = 200;
    onOriginResponse(requestMock, responseMock);
    expect(responseMock.addHeader).toHaveBeenCalled();
    expect(responseMock.addHeader).toHaveBeenCalledTimes(1);
    expect(responseMock.addHeader).toHaveBeenCalledWith('Origin-Response-Status', responseMock.status);
    expect(requestMock.respondWith).not.toHaveBeenCalled();
  });

});
