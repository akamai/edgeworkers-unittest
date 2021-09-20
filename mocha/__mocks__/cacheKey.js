const sinon = require("sinon");

export const mockExcludeQueryString = sinon.stub();
export const mockIncludeQueryString= sinon.stub();
export const mockIncludeQueryArgument = sinon.stub();
export const mockIncludeCookie = sinon.stub();
export const mockIncludeHeader = sinon.stub();
export const mockIncludeVariable = sinon.stub();

export default class CacheKey {
  constructor() {
    this.excludeQueryString = mockExcludeQueryString;
    this.includeQueryString = mockIncludeQueryString;
    this.includeQueryArgument = mockIncludeQueryArgument;
    this.includeCookie = mockIncludeCookie;
    this.includeHeader = mockIncludeHeader;
    this.includeVariable = mockIncludeVariable;
  }
}
