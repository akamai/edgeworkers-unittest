import Request, {mockRespondWith} from "request";
import Response, { mockGetHeaders } from "response";

function onOriginResponse(request, response) {
    response.getHeaders();
}

function onClientResponse(request, response) {
    request.respondWith(111, {}, JSON.stringify(response.getHeaders()));
}

describe('Verify getHeaders tracks invocation', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("Expect a single invocation of getHeaders() in onClientResponse", () => {
        let requestMock = new Request();
        let responseMock = new Response();

        mockGetHeaders.mockReturnValue({'first': ['1'], 'second': ['2']});

        onClientResponse(requestMock, responseMock);

        expect(mockGetHeaders).toHaveBeenCalled();
        expect(mockRespondWith.mock.calls[0][2]).toBe('{"first":["1"],"second":["2"]}')
    });

    test("Expect a single invocation of getHeaders() in onOriginResponse", () => {
        let responseMock = new Response();

        onOriginResponse(undefined, responseMock);

        expect(mockGetHeaders).toHaveBeenCalled();
    });
});