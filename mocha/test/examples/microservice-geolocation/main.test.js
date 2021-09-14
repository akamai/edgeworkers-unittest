import {onClientRequest} from "../../../src/edgeworkers/examples/respond-from-edgeworkers/respondwith/microservice-geolocation/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Respond with JSON formatted geographical location information', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("return geographical location information", () => {
        let requestMock = new Request();
        requestMock.userLocation.continent = 'EU';
        requestMock.userLocation.country = 'SE';
        requestMock.userLocation.zipCode = 'N/A';
        requestMock.userLocation.region = 'AB';
        requestMock.userLocation.city = 'STOCKHOLM';
        onClientRequest(requestMock);
        expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
                expect(requestMock.respondWith.calledWith(200, {}, JSON.stringify({ geoInfo: {"continent":"EU","country":"SE","zip":"N/A","region":"AB","city":"STOCKHOLM","source":"Akamai EdgeWorkers"} }))).to.be(true);

        
    });

});

