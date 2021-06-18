export const mockGetHeader = jest.fn();
export const mockSetHeader = jest.fn();
export const mockAddHeader = jest.fn();
export const mockRemoveHeader= jest.fn();

const Response = jest.fn().mockImplementation(() => {
  return {
    status: "200",
    getHeader: mockGetHeader,
    setHeader: mockSetHeader,
    addHeader: mockAddHeader,
    removeHeader: mockRemoveHeader,
    };
});

export default Response;
