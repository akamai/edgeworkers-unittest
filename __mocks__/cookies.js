const cookies = jest.mock(
    "cookies",
    () => ({
        Cookies: jest.fn(),
        SetCookie: jest.fn(),
    }),
    { virtual: true }
);

export default cookies;