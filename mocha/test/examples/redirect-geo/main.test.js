import {onClientRequest} from "../../../src/edgeworkers/examples/work-with-redirects/redirect-geo/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

test("onClientRequest calling respondWith", () => {
    let requestMock = new Request();
    requestMock.host = "www.example.com";
    onClientRequest(requestMock);
    expect(requestMock.respondWith.called).to.be(true)
    expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
    expect(requestMock.respondWith).toHaveBeenCalledWith(302, {
        Location: [requestMock.scheme + '://' + 'www.example.ca' + requestMock.url]
      }, '');
  });

  