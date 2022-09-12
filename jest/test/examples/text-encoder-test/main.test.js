import Request from "request";
import {onClientRequest} from "../../../edgeworkers/examples/respond-from-edgeworkers/encoding/text-encoder/main";
import {mock_TextEncoder_encode} from "../../../__mocks__/encoding";

describe('EdgeWorker that converts a string into a Uint8Array array of bytes and respond with encoding information', () => {

    test('onClientRequest should retrieve the encoding information', () => {
        const requestMock = new Request();

        onClientRequest(requestMock);

        expect(mock_TextEncoder_encode).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);

        expect(mock_TextEncoder_encode).toHaveBeenCalledWith("This is a sample paragraph.");
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, {}, "utf-8");
    });
});