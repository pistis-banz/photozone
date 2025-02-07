export const fetcher = (url, options = {}, token) => {
  const { method = "GET", data } = options;
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `bearer ${token}`;
  }

  return fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw new Error(error.message);
      });
    }
  });
};
