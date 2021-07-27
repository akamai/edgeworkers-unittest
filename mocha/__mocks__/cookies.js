export const mock_Cookies_toHeader = jest.fn();
export const mock_Cookies_get = jest.fn();
export const mock_Cookies_getAll = jest.fn();
export const mock_Cookies_names = jest.fn();
export const mock_Cookies_add = jest.fn();
export const mock_Cookies_delete = jest.fn();

export const Cookies = jest.fn().mockImplementation(() => {
    return {
      toHeader: mock_Cookies_toHeader,
      get: mock_Cookies_get,
      getAll: mock_Cookies_getAll,
      names: mock_Cookies_names,
      add: mock_Cookies_add,
      delete: mock_Cookies_delete,
      };
  });


export const mock_SetCookie_toHeader = jest.fn();

export const SetCookie = jest.fn().mockImplementation(() => {
    return {
      name: 'c',
      value: '',
      maxAge: 100,
      domain: '',
      path: 'c',
      expires: '',
      httpOnly: false,
      secure: false,
      sameSite: '',
      toHeader: mock_SetCookie_toHeader,
      };
  });
