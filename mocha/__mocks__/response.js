const sinon = require("sinon");

export default class Response {
  // default to dummy data and stubs
  constructor() {
    this.status = "200";
    this.getHeader = sinon.stub();
    this.setHeader = sinon.stub();
    this.addHeader = sinon.stub();
    this.removeHeader = sinon.stub();
  }
}
