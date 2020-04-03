export async function refresh(accessToken, refreshToken) {
  let endpoint = "/user/refreshToken";

  let dataToSend = {
    AccessToken: accessToken,
    RefreshToken: refreshToken
  };

  let refreshRequest = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(dataToSend)
  };

  return fetch(endpoint, refreshRequest);
}
