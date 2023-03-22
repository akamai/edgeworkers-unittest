const sinon = require("sinon");

export const mockHtmlRewritingStream = sinon.stub();
export const mockOnElement = sinon.stub().callsFake(() => {
  return {
    selector: String,
    handler: onElement()
  };
});
export const mockReadableStream = sinon.stub().callsFake(() => {
  return {};
});
export const mockWritableStream = sinon.stub().callsFake(() => {
  return {};
});
export const mockWritableStreamPipeThrough = sinon.stub().callsFake(() => {
  return {};
});

export const mockAfter = sinon.stub();
export const mockAppend = sinon.stub();
export const mockBefore = sinon.stub();
export const mockGetAttribute = sinon.stub();
export const mockPrepend = sinon.stub();
export const mockRemoveAttribute = sinon.stub();
export const mockReplaceChildren = sinon.stub();
export const mockReplaceWith = sinon.stub();
export const mockSetAttribute = sinon.stub();

const onElement = () => {
  this.after = mockAfter;
  this.append = mockAppend;
  this.before = mockBefore;
  this.getAttribute = mockGetAttribute;
  this.prepend = mockPrepend;
  this.removeAttribute = mockRemoveAttribute;
  this.replaceChildren = mockReplaceChildren;
  this.replaceWith = mockReplaceWith;
  this.setAttribute = mockSetAttribute;
}

export class HtmlRewritingStream {
  constructor() {
    this.readableStream = mockReadableStream;
    this.writableStream = mockWritableStream;
    this.onElement = mockOnElement;
  }
}

export const ReadableStream = sinon.stub().callsFake(() => {
  return {
    pipeThrough: mockWritableStreamPipeThrough
  };
});

export const WritableStream = sinon.stub().callsFake(() => {
  return {
    pipeThrough: mockWritableStreamPipeThrough
  };
});
