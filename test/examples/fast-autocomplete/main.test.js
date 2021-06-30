import {onClientRequest} from "../../../src/examples/fast-autocomplete/main";
import Request from "request";

describe('EdgeWorker serves responses for popular search terms at the Edge', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("return search result when search term is present", () => {
        let requestMock = new Request();
        requestMock.query = "term=bmw";
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        let searchResult = [{ label: 'bmw*... (2088)', value: 'bmw*' }, { label: 'BMW M3 (280)', value: 'BMW M3' }, { label: 'BMW M1 (196)', value: 'BMW M1' }, { label: 'BMW 3 (1982-1990) (193)', value: 'BMW 3 (1982-1990)' }, { label: 'BMW 3 (1990-1998) (125)', value: 'BMW 3 (1990-1998)' }, { label: 'BMW 02 (121)', value: 'BMW 02' }, { label: 'BMW 635 (120)', value: 'BMW 635' }, { label: 'BMW Z4 (95)', value: 'BMW Z4' }, { label: 'BMW 320 (84)', value: 'BMW 320' }];
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['application/json;charset=utf-8'] }, JSON.stringify(searchResult));
        
    });

    test("respondWith is not called when search term is not present", () => {
        let requestMock = new Request();
        requestMock.query = "term=maruti";
        onClientRequest(requestMock);
        expect(requestMock.respondWith).not.toHaveBeenCalled();
        
    });
});

