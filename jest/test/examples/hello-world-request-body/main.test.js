import {createResponse} from "create-response";
import {responseProvider} from "examples/respond-from-edgeworkers/responseprovider/hello-world-request-body/main";
import Request from "request";

describe('EdgeWorker that generates a simple html page at the Edge and adds the request body to the response header', () => {
  
    test('responseProvider should retrieve the body of the request', () => {
        const requestMock = new Request();
        
        responseProvider(requestMock);

        expect(requestMock.text).toHaveBeenCalled();
        expect(createResponse).toHaveBeenCalledWith(200, {'request-body': [requestMock.text()]}, '<html><body><p>Hello World</p></body></html>');
    });
});