export const requestApi = (path, options = {}) => {
  const { method, headers, body } = options;
  const m = method || "GET";
  const h = headers || {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
  const b = JSON.stringify(body || {})
  return fetch(`http://192.168.1.17:4000/api${path}`, {
    method: m,
    headers: h,
    body: b,
  }).then((response) => response.json());
};
