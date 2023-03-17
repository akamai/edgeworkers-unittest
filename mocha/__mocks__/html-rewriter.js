const sinon = require("sinon");

export const mockHtmlRewritingStream = sinon.stub();
export const mockOnElement = sinon.stub();
export const mockReadableStream = sinon.stub().callsFake(() => {
  return {};
});
export const mockWritableStream = sinon.stub().callsFake(() => {
  return {};
});
export const mockWritableStreamPipeThrough = sinon.stub().callsFake(() => {
  return {};
});

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
