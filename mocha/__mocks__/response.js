const sinon = require("sinon");

export const mockGetHeader = sinon.stub();
export const mockSetHeader = sinon.stub();
export const mockAddHeader = sinon.stub();
export const mockRemoveHeader = sinon.stub();

export default class Response {
  // default to dummy data and stubs
  constructor() {
    this.status = "200";
    this.getHeader = mockGetHeader;
    this.setHeader = mockSetHeader;
    this.addHeader = mockAddHeader;
    this.removeHeader = mockRemoveHeader;
  }
}
