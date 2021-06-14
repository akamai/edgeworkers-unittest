import {mock_URLSearchParams_get} from "../../../__mocks__/url-search-params";
import {onClientRequest} from "../../../src/examples/commerce-categories/main";
import Request from "../../../__mocks__/object/request";

describe('Reply to Product Category API call directly from Edge server', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("when invoked with search param beauty (title)", () => {
        let requestMock = new Request();
        requestMock.path = '/commerce/categories';
        requestMock.url = '/commerce/categories/?search=beauty';
        mock_URLSearchParams_get.mockReturnValue('beauty');
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        let expectedResponse = [{
            title: 'Beauty',
            id: 1110,
            desc: 'Makeup, skin care, perfume, cologne, hair care, shampoo, conditioner.'
          }]
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json'] },  JSON.stringify(expectedResponse));
        
    });

    test("when invoked with search param rugs (desc)", () => {
        let requestMock = new Request();
        requestMock.path = '/commerce/categories';
        requestMock.url = '/commerce/categories/?search=rugs';
        mock_URLSearchParams_get.mockReturnValue('rugs');
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        let expectedResponse = [{
            title: 'Furniture',
            id: 1040,
            desc: 'Desks, chairs, couches, tables, lamps, rugs.'
          }];
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json'] },  JSON.stringify(expectedResponse));
        
    });

    test("when invoked with search param 1150 (id)", () => {
        let requestMock = new Request();
        requestMock.path = '/commerce/categories';
        requestMock.url = '/commerce/categories/?search=1150';
        mock_URLSearchParams_get.mockReturnValue(1150);
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        let expectedResponse = [{
            title: 'Jewelry',
            id: 1150,
            desc: 'Watches, bracelets, necklaces, earings, gemstones, pearls, diamonds, rings.'
          }];
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json'] },  JSON.stringify(expectedResponse));
        
    });

    test("when invoked with search param 2150 (id not present) should return empty list in response", () => {
        let requestMock = new Request();
        requestMock.path = '/commerce/categories';
        requestMock.url = '/commerce/categories/?search=2150';
        mock_URLSearchParams_get.mockReturnValue(2150);
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        let expectedResponse = [];
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json'] },  JSON.stringify(expectedResponse));
        
    });

  });

