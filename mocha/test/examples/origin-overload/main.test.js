import {onOriginResponse} from "../../../src/edgeworkers/examples/work-with-origin-issues/origin-overload/main";
import Request from "request";
import Response from "response";

const sinon = require("sinon");
const expect = require('expect.js');

describe('onOriginResponse: This event happens as the origin response is created.', () => {

    afterEach(() => {
        sinon.restore();
    });

test("onOriginResponse should invoke respondWith if response.status is 503", () => {
    let requestMock = new Request();
    let responseMock = new Response();
    responseMock.status = 503;
    onOriginResponse(requestMock, responseMock);
    expect(responseMock.addHeader.called).to.be(true)
    expect((responseMock.addHeader).callcount).to.be((responseMock.addHeader));
            expect(responseMock.addHeader.calledWith('Origin-Response-Status', responseMock.status)).to.be(true);

    expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
            expect(requestMock.respondWith.calledWith(200, { 'Content-Type': ['text/html'] }, '<html><script> setTimeout(function () { window.location.href="' + escape(requestMock.path) + '"; }, ' + 10 + '*1000);</script> <body>The origin server is currently overloaded, please retry in ' + 10 + ' seconds </body></html>')).to.be(true);

  });

test("onOriginResponse should not invoke respondWith if response.status is not 503", () => {
    let requestMock = new Request();
    let responseMock = new Response();
    responseMock.status = 200;
    onOriginResponse(requestMock, responseMock);
    expect(responseMock.addHeader.called).to.be(true)
    expect((responseMock.addHeader).callcount).to.be((responseMock.addHeader));
            expect(responseMock.addHeader.calledWith('Origin-Response-Status', responseMock.status)).to.be(true);

    expect(requestMock.respondWith).not.toHaveBeenCalled();
  });

});
