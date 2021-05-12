// this would need to get filled in with a better mock
const mockResponse = {};
const createResponse = jest.fn((status, headers, body) => {return mockResponse});

export {createResponse};
