import {onClientRequest} from "../../../src/edgeworkers/examples/respond-from-edgeworkers/respondwith/fast-autocomplete/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('EdgeWorker serves responses for popular search terms at the Edge', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("return search result when search term is present", () => {
        let requestMock = new Request();
        requestMock.query = "term=bmw";
        onClientRequest(requestMock);
        expect((requestMock.respondWith).callCount).to.be(1);
        let searchResult = [{ label: 'bmw*... (2088)', value: 'bmw*' }, { label: 'BMW M3 (280)', value: 'BMW M3' }, { label: 'BMW M1 (196)', value: 'BMW M1' }, { label: 'BMW 3 (1982-1990) (193)', value: 'BMW 3 (1982-1990)' }, { label: 'BMW 3 (1990-1998) (125)', value: 'BMW 3 (1990-1998)' }, { label: 'BMW 02 (121)', value: 'BMW 02' }, { label: 'BMW 635 (120)', value: 'BMW 635' }, { label: 'BMW Z4 (95)', value: 'BMW Z4' }, { label: 'BMW 320 (84)', value: 'BMW 320' }];
        expect(requestMock.respondWith.calledWith(200, { 'Content-Type': ['application/json;charset=utf-8'] }, JSON.stringify(searchResult))).to.be(true);

        
    });

    it("respondWith is not called when search term is not present", () => {
        let requestMock = new Request();
        requestMock.query = "term=maruti";
        onClientRequest(requestMock);
        expect(requestMock.respondWith.callCount).to.be(0);
        
    });
});

