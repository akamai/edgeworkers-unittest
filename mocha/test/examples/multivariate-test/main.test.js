import {onClientRequest, onClientResponse} from "../../../src/edgeworkers/examples/control-origin-routes/multivariate-test/main";
import Request from "request";
import Response from "response";
import {SetCookie, mock_Cookies_get, mock_Cookies_add, mock_Cookies_delete, mock_SetCookie_toHeader, mock_Cookies_toHeader} from "cookies";

const sinon = require("sinon");
const expect = require('expect.js');

describe('multivariate testing: assign new users to an A/B testing group', () => {

    afterEach(() => {
        sinon.restore();
    });


    it("randomly assign when no params and cookies are set", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect((mock_Cookies_get).callcount).to.be((mock_Cookies_get));
                expect(mock_Cookies_get.calledWith('test1')).to.be(true);

                expect(mock_Cookies_get.calledWith('test2')).to.be(true);

        expect((mock_Cookies_delete).callcount).to.be((mock_Cookies_delete));
                expect(mock_Cookies_delete.calledWith('test1')).to.be(true);

                expect(mock_Cookies_delete.calledWith('test2')).to.be(true);

        expect((mock_Cookies_add).callcount).to.be((mock_Cookies_add));
        expect((requestMock.setHeader).callcount).to.be((requestMock.setHeader));
        expect(requestMock.route.called).to.be(true)
    });

    it("Forced assignment of a single variant", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?test2=2c"
        requestMock.query = "test2=2c";
        mock_Cookies_toHeader.mockReturnValue("2c");

        onClientRequest(requestMock);
        expect((mock_Cookies_get).callcount).to.be((mock_Cookies_get));
                expect(mock_Cookies_get.calledWith('test1')).to.be(true);

                expect(mock_Cookies_get.calledWith('test2')).to.be(true);

        expect((mock_Cookies_delete).callcount).to.be((mock_Cookies_delete));
                expect(mock_Cookies_delete.calledWith('test1')).to.be(true);

                expect(mock_Cookies_delete.calledWith('test2')).to.be(true);

        expect((mock_Cookies_add).callcount).to.be((mock_Cookies_add));
                expect(mock_Cookies_add.calledWith("test2", "2c")).to.be(true);

        expect((requestMock.setHeader).callcount).to.be((requestMock.setHeader));
                expect(requestMock.setHeader.calledWith("Cookie", "2c")).to.be(true);

        expect(requestMock.route.called).to.be(true)
    });

    it("Forced assignment of both variant", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?test1=1a&test2=2c"
        requestMock.query = "test1=1a&test2=2c";
        mock_Cookies_toHeader.mockReturnValueOnce("1a").mockReturnValue("2c");

        onClientRequest(requestMock);
        expect((mock_Cookies_get).callcount).to.be((mock_Cookies_get));
                expect(mock_Cookies_get.calledWith('test1')).to.be(true);

                expect(mock_Cookies_get.calledWith('test2')).to.be(true);

        expect((mock_Cookies_delete).callcount).to.be((mock_Cookies_delete));
                expect(mock_Cookies_delete.calledWith('test1')).to.be(true);

                expect(mock_Cookies_delete.calledWith('test2')).to.be(true);

        expect((mock_Cookies_add).callcount).to.be((mock_Cookies_add));
                expect(mock_Cookies_add.calledWith("test1", "1a")).to.be(true);

                expect(mock_Cookies_add.calledWith("test2", "2c")).to.be(true);

        expect((requestMock.setHeader).callcount).to.be((requestMock.setHeader));
                expect(requestMock.setHeader.calledWith("Cookie", "1a")).to.be(true);

                expect(requestMock.setHeader.calledWith("Cookie", "2c")).to.be(true);

        expect(requestMock.respondWith.called).to.be(true)
                expect(requestMock.respondWith.calledWith(200, { 'Content-Type': ['application/json'] }, JSON.stringify({ heroImageUrl: '/assets/images/hero2c.jpg', text: 'This is variant 2c, generated from an Akamai EdgeWorker'}))).to.be(true);

    });

    it("onClientResponse should call the responseAction function, if it exists on the variant", () => {
        let requestMock = new Request();
        mock_Cookies_get.mockReturnValueOnce("1a").mockReturnValue("2b");        
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValueOnce("1a").mockReturnValue("2b");

        onClientResponse(requestMock, responseMock);
        expect((mock_Cookies_get).callcount).to.be((mock_Cookies_get));
                expect(mock_Cookies_get.calledWith('test1')).to.be(true);

                expect(mock_Cookies_get.calledWith('test1')).to.be(true);

        expect((SetCookie).callcount).to.be((SetCookie));
                expect(SetCookie.calledWith({"name": "test1", "path": "/", "value": "1a"})).to.be(true);

                expect(SetCookie.calledWith({"name": "test2", "path": "/", "value": "2b"})).to.be(true);

        expect((mock_SetCookie_toHeader).callcount).to.be((mock_SetCookie_toHeader));
        expect((responseMock.addHeader).callcount).to.be((responseMock.addHeader));
                expect(responseMock.addHeader.calledWith("Set-Cookie", "1a")).to.be(true);

                expect(responseMock.addHeader.calledWith("Set-Cookie", "2b")).to.be(true);

                expect(responseMock.addHeader.calledWith("X-Variant", "2b")).to.be(true);

    });

});

