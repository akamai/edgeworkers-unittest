import * as edgeworker from "../../../src/examples/redirect-geo/main.js";
import Request from "../../../__mocks__/request.js";

test("onClientRequest calling respondWith", () => {
    let requestMock = new Request();
    requestMock.host = "www.example.com";
    // requestMock.respondWith.mockReturnValue(10);
    edgeworker.onClientRequest(requestMock);
    expect(requestMock.respondWith).toHaveBeenCalled();
    expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
    expect(requestMock.respondWith).toHaveBeenCalledWith(302, {
        Location: [requestMock.scheme + '://' + 'www.example.ca' + requestMock.url]
      }, '');
  });

  