export const mockHtmlRewritingStream = jest.fn();
export const mockOnElement = jest.fn().mockImplementation(() => {
  return {
    selector: String,
    handler: onElement()
  };
});
export const mockReadableStream = jest.fn().mockReturnThis();
export const mockWritableStream = jest.fn().mockReturnThis();
export const mockWritableStreamPipeThrough = jest.fn().mockReturnThis();
export const mockAfter = jest.fn();
export const mockAppend = jest.fn();
export const mockBefore = jest.fn();
export const mockGetAttribute = jest.fn();
export const mockPrepend = jest.fn();
export const mockRemoveAttribute = jest.fn();
export const mockReplaceChildren = jest.fn();
export const mockReplaceWith = jest.fn();
export const mockSetAttribute = jest.fn();

export const onElement = jest.fn().mockImplementation(() => {
  return {
    after: mockAfter,
    append: mockAppend,
    before: mockBefore,
    getAttribute: mockGetAttribute,
    prepend: mockPrepend,
    removeAttribute: mockRemoveAttribute,
    replaceChildren: mockReplaceChildren,
    replaceWith: mockReplaceWith,
    setAttribute: mockSetAttribute
  };
});

export const HtmlRewritingStream = mockHtmlRewritingStream.mockImplementation(
  () => {
    return {
      readableStream: mockReadableStream,
      writableStream: mockWritableStream,
      onElement: mockOnElement
    };
  }
);

export const ReadableStream = jest.fn().mockImplementation(() => {
  return {
    pipeThrough: mockWritableStreamPipeThrough
  };
});

export const WritableStream = jest.fn().mockImplementation(() => {
  return {
    pipeThrough: mockWritableStreamPipeThrough
  };
});
