export const mock_URLSearchParams_append = jest.fn();
export const mock_URLSearchParams_delete = jest.fn();
export const mock_URLSearchParams_entries = jest.fn();
export const mock_URLSearchParams_forEach = jest.fn();
export const mock_URLSearchParams_get = jest.fn();
export const mock_URLSearchParams_getAll = jest.fn();
export const mock_URLSearchParams_has = jest.fn();
export const mock_URLSearchParams_keys = jest.fn();
export const mock_URLSearchParams_set = jest.fn();
export const mock_URLSearchParams_sort = jest.fn();
export const mock_URLSearchParams_toString = jest.fn();
export const mock_URLSearchParams_values = jest.fn();

const URLSearchParams = jest.fn().mockImplementation(() => {
    return {
      append: mock_URLSearchParams_append,
      delete: mock_URLSearchParams_delete,
      entries: mock_URLSearchParams_entries,
      forEach: mock_URLSearchParams_forEach,
      get: mock_URLSearchParams_get,
      getAll: mock_URLSearchParams_getAll,
      has: mock_URLSearchParams_has,
      keys: mock_URLSearchParams_keys,
      set: mock_URLSearchParams_set,
      sort: mock_URLSearchParams_sort,
      toString: mock_URLSearchParams_toString,
      values: mock_URLSearchParams_values,
      };
  });

export default URLSearchParams;