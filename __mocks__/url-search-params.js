const URLSearchParams = jest.mock(
    "url-search-params",
    () => ({
        URLSearchParams: jest.fn()
    }),
    { virtual: true }
);

export default URLSearchParams;