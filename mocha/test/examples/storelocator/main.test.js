
// mocking geokdbush and kdbush for this test file
jest.mock('geokdbush', () => {
    return {
        around: jest.fn(),
        distance: jest.fn()
    }
}, {virtual: true});

jest.mock('kdbush', () => {
    return {
      return {
        default: jest.fn()
      };
    });
  },{virtual: true});
  
import {onClientRequest} from "../../../src/edgeworkers/examples/bundle-third-party-modules/storelocator/main";
import Request from "request";
import geokdbush from 'geokdbush';

const sinon = require("sinon");
const expect = require('expect.js');

describe('store locator API: returns the two stores nearest to the provide latitude and longitude', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("onClientRequest should return error when longitude is not provided in query params", () => {
        let requestMock = new Request();
        requestMock.query = 'lat=42.262';
        requestMock.path = '/storelocator';

        onClientRequest(requestMock);        
        expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
        expect(requestMock.respondWith).toHaveBeenCalledWith(400,
            { 'Content-Type': ['application/json;charset=utf-8'] },
            JSON.stringify({ error: 'lat and lon parameters must be provided' }));
    });

    it("onClientRequest should return error when nearest stores does not exist", () => {
        let requestMock = new Request();
        requestMock.query = 'lat=42.262&lon=-84.416';
        requestMock.path = '/storelocator';
        geokdbush.around.mockReturnValue(undefined);

        onClientRequest(requestMock);        
        expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
        expect(requestMock.respondWith).toHaveBeenCalledWith(400,
            { 'Content-Type': ['application/json;charset=utf-8'] },
            JSON.stringify({ error: `Error locating nearby locations. lat:42.262, lon:-84.416` }));
    });

    it("onClientRequest should return 2 closest locations when lat and lon are present and nearby stores exist", () => {
        let requestMock = new Request();
        requestMock.query = 'lat=42.262&lon=-84.416';
        requestMock.path = '/storelocator';
        const location_data = [{
            "type": "node",
            "id": 207731972,
            "lat": 34.8850980,
            "lon": -92.1125500,
            "tags": {
              "addr:city": "Jacksonville",
              "addr:country": "US",
              "addr:full": "2000 John Harden Dr",
              "addr:housenumber": "2000",
              "addr:postcode": "72076",
              "addr:state": "AR",
              "addr:street": "John Harden Drive",
              "brand": "Walmart",
              "brand:wikidata": "Q483551",
              "brand:wikipedia": "en:Walmart",
              "name": "Walmart Supercenter",
              "opening_hours": "24/7",
              "operator": "Walmart",
              "phone": "+1-501-985-8731",
              "ref:walmart": "24",
              "shop": "supermarket",
              "website": "https://www.walmart.com/store/24/jacksonville-ar/whats-new"
            }
          },
          {
            "type": "node",
            "id": 309761248,
            "lat": 28.5361908,
            "lon": -81.2091148,
            "tags": {
              "addr:city": "Orlando",
              "addr:country": "US",
              "addr:full": "600 S Alafaya Trl",
              "addr:housenumber": "600",
              "addr:postcode": "32828",
              "addr:state": "FL",
              "addr:street": "South Alafaya Trl",
              "brand": "Walmart",
              "name": "Walmart Neighborhood Market",
              "opening_hours": "Mo-Su 06:00-24:00",
              "operator": "Walmart",
              "phone": "+1-407-380-0384",
              "ref": "3617",
              "ref:walmart": "3617",
              "shop": "supermarket",
              "website": "https://www.walmart.com/store/3617/orlando-fl/whats-new"
            }
          }]        
        geokdbush.around.mockReturnValue(location_data);
        geokdbush.distance.mockReturnValueOnce(10).mockReturnValue(20);

        onClientRequest(requestMock);        
        expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
        const expected_result = [
            {
              distance: 6.215040397762586,
              location: {
                type: 'node',
                id: 207731972,
                lat: 34.885098,
                lon: -92.11255,
                tags: {
                    "addr:city": "Jacksonville",
                    "addr:country": "US",
                    "addr:full": "2000 John Harden Dr",
                    "addr:housenumber": "2000",
                    "addr:postcode": "72076",
                    "addr:state": "AR",
                    "addr:street": "John Harden Drive",
                    "brand": "Walmart",
                    "brand:wikidata": "Q483551",
                    "brand:wikipedia": "en:Walmart",
                    "name": "Walmart Supercenter",
                    "opening_hours": "24/7",
                    "operator": "Walmart",
                    "phone": "+1-501-985-8731",
                    "ref:walmart": "24",
                    "shop": "supermarket",
                    "website": "https://www.walmart.com/store/24/jacksonville-ar/whats-new"
                  }
              }
            },
            {
              distance: 12.430080795525171,
              location: {
                type: 'node',
                id: 309761248,
                lat: 28.5361908,
                lon: -81.2091148,
                tags: {
                    "addr:city": "Orlando",
                    "addr:country": "US",
                    "addr:full": "600 S Alafaya Trl",
                    "addr:housenumber": "600",
                    "addr:postcode": "32828",
                    "addr:state": "FL",
                    "addr:street": "South Alafaya Trl",
                    "brand": "Walmart",
                    "name": "Walmart Neighborhood Market",
                    "opening_hours": "Mo-Su 06:00-24:00",
                    "operator": "Walmart",
                    "phone": "+1-407-380-0384",
                    "ref": "3617",
                    "ref:walmart": "3617",
                    "shop": "supermarket",
                    "website": "https://www.walmart.com/store/3617/orlando-fl/whats-new"
                  }
              }
            }
          ]
        expect(requestMock.respondWith).toHaveBeenCalledWith(200,
            { 'Content-Type': ['application/json;charset=utf-8'] },
            JSON.stringify(expected_result, null, 2));
    });

});

