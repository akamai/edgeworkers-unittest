// eslint-disable-next-line camelcase
import {mock_Cookies_get, mock_Cookies_add, mock_Cookies_delete, mock_SetCookie_toHeader, mock_Cookies_toHeader} from "cookies";
import {onClientRequest, onClientResponse} from "../../../src/edgeworkers/examples/control-origin-routes/a-b-test/main";
import Request from "request";
import Response from "response";

const sinon = require("sinon");
const expect = require('expect.js');

describe('assign a new user to a group for A/B testing ', () => {

    afterEach(() => {
        sinon.resetHistory();
    });
  
    it("randomly assign", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        
        expect(mock_Cookies_get.callCount).to.be(1);
        expect(mock_Cookies_get.calledWith('testGroup')).to.be(true);

        expect((mock_Cookies_delete).callCount).to.be(1);
        expect(mock_Cookies_delete.calledWith('testGroup')).to.be(true);

        expect((mock_Cookies_add).callCount).to.be(1);
        expect((requestMock.setHeader).callCount).to.be(1);
        expect((requestMock.route).callCount).to.be(1);
    });

    it("forced assignment when query params same as existing cookie", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?testGroup=B"
        requestMock.query = "testGroup=B";
        mock_Cookies_get.returns("B");

        onClientRequest(requestMock);
        expect((mock_Cookies_get).callCount).to.be(1);
        expect(mock_Cookies_get.calledWith('testGroup')).to.be(true);

        expect(mock_Cookies_delete.callCount).to.be(0);
        expect(mock_Cookies_add.callCount).to.be(0);
        expect(requestMock.setHeader.callCount).to.be(0);
        expect(requestMock.route.callCount).to.be(0);
    });

    it("forced assignment when query param different than cookie value", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?testGroup=B"
        requestMock.query = "testGroup=B";
        mock_Cookies_get.returns("A");
        mock_Cookies_toHeader.returns('B');

        onClientRequest(requestMock);
        expect((mock_Cookies_get).callCount).to.be(1);
        expect(mock_Cookies_get.calledWith('testGroup')).to.be(true);

        expect(mock_Cookies_delete.called).to.be(true);
        expect(mock_Cookies_delete.calledWith("testGroup")).to.be(true);

        expect(mock_Cookies_add.called).to.be(true);
        expect(mock_Cookies_add.calledWith("testGroup", "B")).to.be(true);

        expect(requestMock.setHeader.called).to.be(true);
        expect(requestMock.setHeader.calledWith("Cookie", "B")).to.be(true);

        expect(requestMock.route.callCount).to.be(0);
    });

    it("onClientResponse Set-Cookie", () => {
        let requestMock = new Request();
        mock_Cookies_get.returns("B");        
        let responseMock = new Response();
        mock_SetCookie_toHeader.returns("B");

        onClientResponse(requestMock, responseMock);
        expect((mock_Cookies_get).callCount).to.be(1);
        expect(mock_Cookies_get.calledWith('testGroup')).to.be(true);

        expect((mock_SetCookie_toHeader).callCount).to.be(1);
        expect(responseMock.setHeader.calledWith("Set-Cookie", "B")).to.be(true);

    });
  });

