import {onClientRequest, onClientResponse} from "../../../src/edgeworkers/examples/control-origin-routes/multivariate-test/main";
import Request from "request";
import Response from "response";
import {SetCookie, mock_Cookies_get, mock_Cookies_add, mock_Cookies_delete, mock_SetCookie_toHeader, mock_Cookies_toHeader} from "cookies";

const sinon = require("sinon");
const expect = require('expect.js');

describe('multivariate testing: assign new users to an A/B testing group', () => {

    afterEach(() => {
        sinon.reset();
    });

    it("randomly assign when no params and cookies are set", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect((mock_Cookies_get).callCount).to.be(2);
        expect(mock_Cookies_get.calledWith('test1')).to.be(true);
        expect(mock_Cookies_get.calledWith('test2')).to.be(true);

        expect((mock_Cookies_delete).callCount).to.be(2);
        expect(mock_Cookies_delete.calledWith('test1')).to.be(true);
        expect(mock_Cookies_delete.calledWith('test2')).to.be(true);

        expect((mock_Cookies_add).callCount).to.be(2);
        expect((requestMock.setHeader).callCount).to.be(2);
        expect(requestMock.route.called).to.be(true)
    });

    it("Forced assignment of a single variant", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?test2=2c"
        requestMock.query = "test2=2c";
        mock_Cookies_toHeader.returns("2c");

        onClientRequest(requestMock);
        expect((mock_Cookies_get).callCount).to.be(2);
        expect(mock_Cookies_get.calledWith('test1')).to.be(true);
        expect(mock_Cookies_get.calledWith('test2')).to.be(true);

        expect((mock_Cookies_delete).callCount).to.be(2);
        expect(mock_Cookies_delete.calledWith('test1')).to.be(true);
        expect(mock_Cookies_delete.calledWith('test2')).to.be(true);

        expect((mock_Cookies_add).callCount).to.be(2);
        expect(mock_Cookies_add.calledWith("test2", "2c")).to.be(true);

        expect((requestMock.setHeader).callCount).to.be(2);
        expect(requestMock.setHeader.calledWith("Cookie", "2c")).to.be(true);

        expect(requestMock.route.called).to.be(true)
    });

    it("Forced assignment of both variant", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?test1=1a&test2=2c"
        requestMock.query = "test1=1a&test2=2c";
        mock_Cookies_toHeader.onCall(0).returns("1a").returns("2c");

        onClientRequest(requestMock);
        expect((mock_Cookies_get).callCount).to.be(2);
        expect(mock_Cookies_get.calledWith('test1')).to.be(true);
        expect(mock_Cookies_get.calledWith('test2')).to.be(true);

        expect((mock_Cookies_delete).callCount).to.be(2);
        expect(mock_Cookies_delete.calledWith('test1')).to.be(true);
        expect(mock_Cookies_delete.calledWith('test2')).to.be(true);

        expect((mock_Cookies_add).callCount).to.be(2);
        expect(mock_Cookies_add.calledWith("test1", "1a")).to.be(true);
        expect(mock_Cookies_add.calledWith("test2", "2c")).to.be(true);

        expect((requestMock.setHeader).callCount).to.be(2);
        expect(requestMock.setHeader.calledWith("Cookie", "1a")).to.be(true);
        expect(requestMock.setHeader.calledWith("Cookie", "2c")).to.be(true);

        expect(requestMock.respondWith.called).to.be(true)
        expect(requestMock.respondWith.calledWith(200, { 'Content-Type': ['application/json'] }, JSON.stringify({ heroImageUrl: '/assets/images/hero2c.jpg', text: 'This is variant 2c, generated from an Akamai EdgeWorker'}))).to.be(true);
    });

    it("onClientResponse should call the responseAction function, if it exists on the variant", () => {
        let requestMock = new Request();
        mock_Cookies_get.onCall(0).returns("1a").returns("2b");        
        let responseMock = new Response();
        mock_SetCookie_toHeader.onCall(0).returns("1a").returns("2b");

        onClientResponse(requestMock, responseMock);
        expect((mock_Cookies_get).callCount).to.be(2);
        expect(mock_Cookies_get.calledWith('test1')).to.be(true);
        expect(mock_Cookies_get.calledWith('test1')).to.be(true);

        expect((mock_SetCookie_toHeader).callCount).to.be(2);
        expect((responseMock.addHeader).callCount).to.be(3);
        expect(responseMock.addHeader.calledWith("Set-Cookie", "1a")).to.be(true);
        expect(responseMock.addHeader.calledWith("Set-Cookie", "2b")).to.be(true);
        expect(responseMock.addHeader.calledWith("X-Variant", "2b")).to.be(true);
    });
});
