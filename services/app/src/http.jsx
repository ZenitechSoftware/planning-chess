export async function get(url, options = {}) {
  return await request(url, undefined, { method: 'GET', ...options });
}

export async function post(url, data, options = {}) {
  return await request(url, data, { method: 'POST', ...options });
}

export async function put(url, data, options = {}) {
  return await request(url, data, { method: 'PUT', ...options });
}

export async function DELETE(url, data, options = {}) {
  return await request(url, data, { method: 'DELETE', ...options });
}

async function request(url, data, options) {
  let body = undefined;
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

export default {
  get,
  post,
  put,
  delete: DELETE,
};
