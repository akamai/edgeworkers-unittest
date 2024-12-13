export const mockGetHeader = jest.fn();
export const mockSetHeader = jest.fn();
export const mockAddHeader = jest.fn();
export const mockRemoveHeader= jest.fn();
export const mockGetHeaders = jest.fn();

const Response = jest.fn().mockImplementation(() => {
  return {
    status: "200",
    getHeader: mockGetHeader,
    setHeader: mockSetHeader,
    addHeader: mockAddHeader,
    removeHeader: mockRemoveHeader,
    getHeaders: mockGetHeaders,
    };
});

export default Response;
