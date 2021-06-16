import {onClientRequest} from "../../../src/examples/microservice-geolocation/main";
import Request from "../../../__mocks__/request";

describe('Respond with JSON formatted geographical location information', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("return geographical location information", () => {
        let requestMock = new Request();
        requestMock.userLocation.continent = 'EU';
        requestMock.userLocation.country = 'SE';
        requestMock.userLocation.zipCode = 'N/A';
        requestMock.userLocation.region = 'AB';
        requestMock.userLocation.city = 'STOCKHOLM';
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, {}, JSON.stringify({ geoInfo: {"continent":"EU","country":"SE","zip":"N/A","region":"AB","city":"STOCKHOLM","source":"Akamai EdgeWorkers"} }));
        
    });

});

