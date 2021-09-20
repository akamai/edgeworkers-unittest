import {onOriginRequest} from "../../../src/edgeworkers/examples/work-with-cookies/remove-cookies/main";
import Request from "request";
import {Cookies, mock_Cookies_names, mock_Cookies_delete} from "cookies";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Remove unwanted Cookies from being sent to the Origin', () => {

    afterEach(() => {
        sinon.reset();
    });
  
    it("onClientRequest should remove all GA, doubleClick, Quant Capital, and ADDThis cookies", () => {
        let requestMock = new Request();
        mock_Cookies_names.returns(['_ga', '__qc', 'site_cookie', 'utmctr', '__gads', '__atuv.']);

        onOriginRequest(requestMock);
        expect(mock_Cookies_delete.callCount).to.be(5);
        expect(mock_Cookies_delete.calledWith("_ga")).to.be(true);
        expect(mock_Cookies_delete.calledWith("__qc")).to.be(true);
        expect(mock_Cookies_delete.calledWith("site_cookie")).to.be(false);
        expect(mock_Cookies_delete.calledWith("utmctr")).to.be(true);
        expect(mock_Cookies_delete.calledWith("__gads")).to.be(true);
        expect(mock_Cookies_delete.calledWith("__atuv.")).to.be(true);
        expect(requestMock.setHeader.called).to.be(true)
    });
});
