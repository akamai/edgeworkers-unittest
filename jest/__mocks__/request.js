import Device from './device';
import UserLocation from './userLocation';
import CacheKey from './cacheKey';
import { ReadableStream } from './streams'

export const mockRespondWith = jest.fn();
export const mockWasTerminated = jest.fn();
export const mockGetHeader = jest.fn();
export const mockSetHeader = jest.fn();
export const mockAddHeader = jest.fn();
export const mockRemoveHeader = jest.fn();
export const mockGetHeaders = jest.fn();
export const mockGetVariable = jest.fn();
export const mockSetVariable = jest.fn();
export const mockRoute = jest.fn();
export const mockJson = jest.fn();
export const mockText = jest.fn();
export const mockArrayBuffer = jest.fn();

const Request = jest.fn().mockImplementation(() => {
  return {
    host: "www.example.com",
    method: "GET",
    path: "/helloworld",
    scheme: "https",
    query: "param1=value1&param2=value2",
    url: "/helloworld?param1=value1&param2=value2",
    userLocation: new UserLocation(),
    device: new Device(),
    cpCode: 1191398,
    clientIp: "1.1.1.1",
    cacheKey: new CacheKey(),
    respondWith: mockRespondWith,
    wasTerminated: mockWasTerminated,
    getHeader: mockGetHeader,
    setHeader: mockSetHeader,
    addHeader: mockAddHeader,
    removeHeader: mockRemoveHeader,
    getHeaders: mockGetHeaders,
    getVariable: mockGetVariable,
    setVariable: mockSetVariable,
    route: mockRoute,
    json: mockJson,
    text: mockText,
    arrayBuffer: mockArrayBuffer,
    body: new ReadableStream()
  };
});

export default Request;
