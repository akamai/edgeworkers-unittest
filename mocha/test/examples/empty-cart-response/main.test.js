import {mock_Cookies_get} from "cookies";
import {onClientResponse} from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/empty-cart/main"
import Request from "request";
import Response from "response";

const sinon = require("sinon");
const expect = require('expect.js');

describe('EdgeWorker that will respond with an empty JSON for an empty shopping cart', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("return empty JSON when shopping cart is empty", () => {
        const requestMock = new Request();
        const responseMock = new Response();

        onClientResponse(requestMock, responseMock);
        expect((requestMock.respondWith).callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(200, { 'Content-Type': ['application/json; charset=utf-8'] }, '{}')).to.be(true);
    });

    it("respondWith is not called when shopping cart is not empty", () => {
        const requestMock = new Request();
        const responseMock = new Response();
        mock_Cookies_get.returns('macbook pro');

        onClientResponse(requestMock, responseMock);
        expect(requestMock.respondWith.callCount).to.be(0);
    });

});
