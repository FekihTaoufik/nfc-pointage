export const requestApi = (path, options = {}) => {
  const {method, headers, body} = options;
  const m = method || 'GET';
  const h = headers || {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const b = JSON.stringify(body || {});
  console.log(`https://nfc.miage-project.tk/api${path}`);
  return fetch(`https://nfc.miage-project.tk/api${path}`, {
    method: m,
    headers: h,
    body: m !== 'GET' && b,
  }).then((response) => response.json());
};
