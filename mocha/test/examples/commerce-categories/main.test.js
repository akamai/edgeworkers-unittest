import {onClientRequest} from "respond-from-edgeworkers/respondwith/commerce-categories/main";
import Request from "request";

describe('Reply to Product Category API call directly from Edge server', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("when invoked with search param beauty (title)", () => {
        let requestMock = new Request();
        requestMock.path = '/commerce/categories';
        requestMock.url = '/commerce/categories/?search=beauty';
        requestMock.query = "search=beauty";

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
        requestMock.query = "search=rugs";

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
        requestMock.query = "search=1150";

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
        requestMock.query = "search=2150";

        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        let expectedResponse = [];
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json'] },  JSON.stringify(expectedResponse));
        
    });

    test("when invoked with incorrect path", () => {
      let requestMock = new Request();
      requestMock.path = '/commerce/categ';

      onClientRequest(requestMock);
      expect(requestMock.respondWith).not.toHaveBeenCalled();
      
  });

  });

