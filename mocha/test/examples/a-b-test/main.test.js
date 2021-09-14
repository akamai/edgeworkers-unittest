import {mock_Cookies_get, mock_Cookies_add, mock_Cookies_delete, mock_SetCookie_toHeader, mock_Cookies_toHeader} from "cookies";
import {onClientRequest, onClientResponse} from "../../../src/edgeworkers/examples/control-origin-routes/a-b-test/main";
import Request from "request";
import Response from "response";

const sinon = require("sinon");
const expect = require('expect.js');

describe('assign a new user to a group for A/B testing ', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("randomly assign", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        
        expect((mock_Cookies_get).callcount).to.be((mock_Cookies_get));
                expect(mock_Cookies_get.calledWith('testGroup')).to.be(true);

        expect((mock_Cookies_delete).callcount).to.be((mock_Cookies_delete));
                expect(mock_Cookies_delete.calledWith('testGroup')).to.be(true);

        expect((mock_Cookies_add).callcount).to.be((mock_Cookies_add));
        expect((requestMock.setHeader).callcount).to.be((requestMock.setHeader));
        expect((requestMock.route).callcount).to.be((requestMock.route));
    });

    it("forced assignment when query params same as existing cookie", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?testGroup=B"
        requestMock.query = "testGroup=B";
        mock_Cookies_get.mockReturnValue("B");

        onClientRequest(requestMock);
        expect((mock_Cookies_get).callcount).to.be((mock_Cookies_get));
                expect(mock_Cookies_get.calledWith('testGroup')).to.be(true);

        expect(mock_Cookies_delete).not.toHaveBeenCalled();
        expect(mock_Cookies_add).not.toHaveBeenCalled();
        expect(requestMock.setHeader).not.toHaveBeenCalled();
        expect(requestMock.route).not.toHaveBeenCalled();
    });

    it("forced assignment when query param different than cookie value", () => {
        let requestMock = new Request();
        requestMock.host = "www.example.com?testGroup=B"
        requestMock.query = "testGroup=B";
        mock_Cookies_get.mockReturnValue("A");
        mock_Cookies_toHeader.mockReturnValue('B');

        onClientRequest(requestMock);
        expect((mock_Cookies_get).callcount).to.be((mock_Cookies_get));
                expect(mock_Cookies_get.calledWith('testGroup')).to.be(true);

        expect(mock_Cookies_delete.called).to.be(true)
                expect(mock_Cookies_delete.calledWith("testGroup")).to.be(true);

        expect(mock_Cookies_add.called).to.be(true)
                expect(mock_Cookies_add.calledWith("testGroup", "B")).to.be(true);

        expect(requestMock.setHeader.called).to.be(true)
                expect(requestMock.setHeader.calledWith("Cookie", "B")).to.be(true);

        expect(requestMock.route).not.toHaveBeenCalled();
    });

    it("onClientResponse Set-Cookie", () => {
        let requestMock = new Request();
        mock_Cookies_get.mockReturnValue("B");        
        let responseMock = new Response();
        mock_SetCookie_toHeader.mockReturnValue("B");

        onClientResponse(requestMock, responseMock);
        expect((mock_Cookies_get).callcount).to.be((mock_Cookies_get));
                expect(mock_Cookies_get.calledWith('testGroup')).to.be(true);

        expect((mock_SetCookie_toHeader).callcount).to.be((mock_SetCookie_toHeader));
                expect(responseMock.setHeader.calledWith("Set-Cookie", "B")).to.be(true);

    });


  });

