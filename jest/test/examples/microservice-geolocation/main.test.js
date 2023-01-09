import {onClientRequest} from "examples/respond-from-edgeworkers/respondwith/microservice-geolocation/main";
import Request from "request";

describe('Respond with JSON formatted geographical location information', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("return geographical location information", () => {
        let requestMock = new Request();
        requestMock.userLocation.latitude = '42.364948';
        requestMock.userLocation.longitude = '-71.088783';
        requestMock.userLocation.continent = 'NA';
        requestMock.userLocation.country = 'US';
        requestMock.userLocation.zipCode = 'N/A';
        requestMock.userLocation.region = 'MA';
        requestMock.userLocation.city = 'BOSTON';
        requestMock.userLocation.dma = '506';
        requestMock.userLocation.timezone = 'EST';
        requestMock.userLocation.networkType = 'mobile';
        requestMock.userLocation.bandwidth = '257';
        requestMock.userLocation.areaCodes = ["617"];
        requestMock.userLocation.fips = ["25025", "25017"];

        onClientRequest(requestMock);
        
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, {}, JSON.stringify({ geoInfo: {"latitude":"42.364948","longitude":"-71.088783","continent":"NA","country":"US","zipCode":"N/A","region":"MA","city":"BOSTON","dma":"506","timezone":"EST","networkType":"mobile","bandwidth":"257","areaCodes":["617"],"fips":["25025","25017"],"source": "Akamai EdgeWorkers"}}));
    });

});

