export const fetcher = (url, method = "GET", token, data) => {
  fetch(url, {
    method: method,
    headers: {
      Authorization: `bearer ${token}`,
    },
    body: data,
  });
};
