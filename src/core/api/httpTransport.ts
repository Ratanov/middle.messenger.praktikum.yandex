export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function queryStringify(data: { [key: string]: any }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) =>
      `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

interface IOptions {
  timeout?: number;
  data?: object;
  headers?: { [key: string]: string };
  method?: METHOD;
}

type HTTPMethod = <R = unknown>(url: string, options?: IOptions) => Promise<R>;

export class HTTPTransport {
  protected apiUrl = 'https://ya-praktikum.tech/api/v2';

  constructor(apiPath: string) {
    this.apiUrl = `${this.apiUrl}${apiPath}`;
  }

  get: HTTPMethod = (url, options = {}) =>
    this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHOD.GET },
      options.timeout,
    );

  put: HTTPMethod = (url, options = {}) =>
    this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHOD.PUT },
      options.timeout,
    );

  post: HTTPMethod = (url, options = {}) =>
    this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHOD.POST },
      options.timeout,
    );

  patch: HTTPMethod = (url, options = {}) =>
    this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHOD.PATCH },
      options.timeout,
    );

  delete: HTTPMethod = (url, options = {}) =>
    this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHOD.DELETE },
      options.timeout,
    );

  request = <R>(
    url: string,
    options: IOptions = {},
    timeout = 5000,
  ): Promise<R> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.response === 'OK') {
          resolve(xhr.response);
        } else {
          resolve(JSON.parse(xhr.response));
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
