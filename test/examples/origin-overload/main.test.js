import onOriginResponse from "../../../src/examples/origin-overload/main";
import Request from "request";
import Response from "response";

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
    expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['text/html'] }, '<html><script> setTimeout(function () { window.location.href="' + escape(requestMock.path) + '"; }, ' + 10 + '*1000);</script> <body>The origin server is currently overloaded, please retry in ' + 10 + ' seconds </body></html>');
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
