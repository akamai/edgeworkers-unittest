import {onClientResponse} from "../../../src/edgeworkers/examples/work-with-cookies/cookie-accrual/main";
import Request from "request";
import Response from "response";
import {SetCookie, mock_Cookies_get, mock_SetCookie_toHeader} from "cookies";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Accrue values in a cookie as a visitor traverses a site, and trigger a promotional cookie.', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("onClientResponse should set visited cookie in response header when no. of sections visited is zero", () => {
        let requestMock = new Request();
        requestMock.path = "/cookieaccrual/about-us/";
        let responseMock = new Response();
        mock_SetCookie_toHeader.returns("visited cookie: about-us");

        onClientResponse(requestMock, responseMock);

        expect((responseMock.setHeader).callCount).to.be(1);
        expect(responseMock.setHeader.calledWith("Set-Cookie", ["visited cookie: about-us"])).to.be(true);
    });

    it("onClientResponse should set visited cookie in response header when no. of sections visited is within max limit", () => {
        let requestMock = new Request();
        requestMock.path = "/cookie-accural/history/";
        let responseMock = new Response();
        mock_Cookies_get.returns("about-us");
        mock_SetCookie_toHeader.returns("visited cookie: about-us,history");

        onClientResponse(requestMock, responseMock);

        expect((responseMock.setHeader).callCount).to.be(1);
        expect(responseMock.setHeader.calledWith("Set-Cookie", ["visited cookie: about-us,history"])).to.be(true);
    });

    it("onClientResponse should set visited and promo cookie in response header when no. of sections visited exceeds max limit", () => {
        let requestMock = new Request();
        requestMock.path = "/cookie-accural/sizing/";
        let responseMock = new Response();
        mock_Cookies_get.returns("about-us,history,products,guarantee,pricing");
        mock_SetCookie_toHeader.onCall(0).returns("visited cookie: about-us,history,products,guarantee,pricing,sizing").returns("promo cookie: true");

        onClientResponse(requestMock, responseMock);

        expect((responseMock.setHeader).callCount).to.be(1);
        expect(responseMock.setHeader.calledWith("Set-Cookie", ["visited cookie: about-us,history,products,guarantee,pricing,sizing", "promo cookie: true"])).to.be(true);
    });

});

