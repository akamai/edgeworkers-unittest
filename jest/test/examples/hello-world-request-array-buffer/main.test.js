import {createResponse} from "create-response";
import {responseProvider} from "examples/respond-from-edgeworkers/responseprovider/hello-world-request-arrayBuffer/main";
import Request from "request";
import {mockArrayBuffer} from "request";

describe('EdgeWorker that generates a simple html page at the Edge and adds the request body to the response header', () => {
  
    test('responseProvider should retrieve the body of the request', async () => {
        const requestMock = new Request();
        
        mockArrayBuffer.mockReturnValue(new Promise(function(resolve) {
            const encoder = new TextEncoder();
            resolve(encoder.encode("Hello World").buffer);
        }));

        await responseProvider(requestMock);

        expect(requestMock.arrayBuffer).toHaveBeenCalled();
        expect(createResponse).toHaveBeenCalledWith(200, {}, '<html><body><p>Hello World</p></body></html>');
    });
});