export const mock_TextEncoder_encode = jest.fn();
export const TextEncoder = jest.fn().mockImplementation(() => {
    return {
        encoding: "utf-8",
        encode: mock_TextEncoder_encode,
    };
});

export const mock_TextDecoder_decode = jest.fn();
export const TextDecoder = jest.fn().mockImplementation( () => {
    return {
        fatal: false,
        ignoreBOM: false,
        encoding: "utf-8",
        decode: mock_TextDecoder_decode
    };
});

export const atob = jest.fn();
export const btoa = jest.fn();

export const mock_base64_decode = jest.fn();
const Base64 = jest.fn().mockImplementation( () => {
    return {
        decode: mock_base64_decode,
    };
});
export const base64 = new Base64();

export const mock_base64url_decode = jest.fn();
const Base64url = jest.fn().mockImplementation( () => {
    return {
        decode: mock_base64url_decode,
    };
});
export const base64url = new Base64url();

export const mock_base16_decode = jest.fn();
const Base16 = jest.fn().mockImplementation( () => {
    return {
        decode: mock_base16_decode,
    };
});
export const base16 = new Base16();
