export const mockHtmlRewritingStream = jest.fn();
export const mockOnElement = jest.fn();
export const mockReadableStream = jest.fn().mockReturnThis();
export const mockWritableStream = jest.fn().mockReturnThis();
export const mockWritableStreamPipeThrough = jest.fn().mockReturnThis();

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
