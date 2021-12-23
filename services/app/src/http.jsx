async function request(url, data, options) {
  let body;
  const extraHeaders = {};

  if (data !== undefined) {
    body = JSON.stringify(data);
    extraHeaders['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    body,
    ...options,
    headers: {
      ...extraHeaders,
      ...options.headers,
    },
  });

  if ((res.headers.get('Content-Type') || '').includes('application/json')) {
    res.data = await res.json();
  }

  if (!res.ok) {
    throw res;
  }

  return res;
}

export function get(url, options = {}) {
  return request(url, undefined, { method: 'GET', ...options });
}

export function post(url, data, options = {}) {
  return request(url, data, { method: 'POST', ...options });
}

export function put(url, data, options = {}) {
  return request(url, data, { method: 'PUT', ...options });
}

export function DELETE(url, data, options = {}) {
  return request(url, data, { method: 'DELETE', ...options });
}

export default {
  get,
  post,
  put,
  delete: DELETE,
};
