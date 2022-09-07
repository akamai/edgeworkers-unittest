import {createResponse} from "create-response";
import {responseProvider} from "examples/respond-from-edgeworkers/responseprovider/hello-world-request-body-property/main";
import Request from "request";

describe('EdgeWorker that generates a simple html page at the Edge and adds the request body to the response header', () => {
  
    test('responseProvider should retrieve the body of the request', () => {
        const requestMock = new Request();
        
        responseProvider(requestMock);

        expect(createResponse).toHaveBeenCalledWith(200, {'request-body': [requestMock.body]}, '<html><body><p>Hello World</p></body></html>');
    });
});