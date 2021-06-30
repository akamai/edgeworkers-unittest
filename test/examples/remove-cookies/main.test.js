import {onOriginRequest} from "../../../src/examples/remove-cookies/main";
import Request from "request";
import {Cookies, mock_Cookies_names, mock_Cookies_delete} from "cookies";

describe('Remove unwanted Cookies from being sent to the Origin', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("onClientRequest should remove all GA, doubleClick, Quant Capital, and ADDThis cookies", () => {
        let requestMock = new Request();
        mock_Cookies_names.mockReturnValue(['_ga', '__qc', 'site_cookie', 'utmctr', '__gads', '__atuv.']);

        onOriginRequest(requestMock);
        expect(Cookies).toHaveBeenCalled();
        expect(mock_Cookies_delete).toHaveBeenCalledTimes(5);
        expect(mock_Cookies_delete).toHaveBeenCalledWith("_ga");
        expect(mock_Cookies_delete).toHaveBeenCalledWith("__qc");
        expect(mock_Cookies_delete).not.toHaveBeenCalledWith("site_cookie");
        expect(mock_Cookies_delete).toHaveBeenCalledWith("utmctr");
        expect(mock_Cookies_delete).toHaveBeenCalledWith("__gads");
        expect(mock_Cookies_delete).toHaveBeenCalledWith("__atuv.");
        expect(requestMock.setHeader).toHaveBeenCalled();
    });

});

