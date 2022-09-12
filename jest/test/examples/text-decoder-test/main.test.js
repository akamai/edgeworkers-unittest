import Request from "request";
import {onClientRequest} from "../../../edgeworkers/examples/respond-from-edgeworkers/encoding/text-decoder/main";
import {mock_TextDecoder_decode} from "../../../__mocks__/encoding";

describe('EdgeWorker that converts Uint8Array array of bytes into string and respond with fatal value', () => {

    test('onClientRequest should retrieve the fatal value', () => {
        const requestMock = new Request();

        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(mock_TextDecoder_decode).toHaveBeenCalledTimes(1);

        expect(mock_TextDecoder_decode).toHaveBeenCalledWith(new Uint8Array([84,104,105,115,32,105,115,32,97,32,115,97,109,112,108,101,32,112,97,114,97,103,114,97,112,104,46]));
        expect(requestMock.respondWith).toHaveBeenCalledWith(231, {}, false);
    });
});