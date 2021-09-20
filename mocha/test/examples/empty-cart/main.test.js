import {mock_Cookies_get} from "cookies";
import {onClientRequest} from "../../../src/edgeworkers/examples/respond-from-edgeworkers/respondwith/empty-cart/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('EdgeWorker that will respond with an empty JSON for an empty shopping cart', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("return empty JSON when shopping cart is empty", () => {
        let requestMock = new Request();
        onClientRequest(requestMock);
        expect((requestMock.respondWith).callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(200, { 'Content-Type': ['application/json; charset=utf-8'] }, '{}')).to.be(true);

        
    });

    it("respondWith is not called when shopping cart is not empty", () => {
        let requestMock = new Request();
        mock_Cookies_get.returns('macbook pro');
        onClientRequest(requestMock);
        expect(requestMock.respondWith.callCount).to.be(0);
        
    });

});

