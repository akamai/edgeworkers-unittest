import {onClientRequest} from "../../../src/edgeworkers/examples/work-with-redirects/redirect-unauthenticated/main";
import Request from "request";
import {Cookies, mock_Cookies_get} from "cookies";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Redirect Unauthenticated Users to a Sign-In Page', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("onClientRequest should redirect unauthenticated users", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect((requestMock.respondWith).callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(302, {"Location": "http://www.example.com/signin?redirect_url=https%3A%2F%2Fwww.example.com%2Fhelloworld%3Fparam1%3Dvalue1%26param2%3Dvalue2"}, "")).to.be(true);

    });

    it("onClientRequest should not redirect if session-id is present", () => {
        let requestMock = new Request();
        mock_Cookies_get.returns("sssssessionidddddd");
        onClientRequest(requestMock);
        expect(requestMock.respondWith.callCount).to.be(0);
    });

});

