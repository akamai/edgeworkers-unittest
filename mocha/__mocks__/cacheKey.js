const sinon = require("sinon");

export default class CacheKey {
  constructor() {
    this.excludeQueryString = sinon.stub();
    this.includeQueryString = sinon.stub();
    this.includeQueryArgument = sinon.stub();
    this.includeCookie = sinon.stub();
    this.includeHeader = sinon.stub();
    this.includeVariable = sinon.stub();
  }
}
