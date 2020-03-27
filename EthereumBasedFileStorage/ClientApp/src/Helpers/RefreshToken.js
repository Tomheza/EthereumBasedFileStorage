export async function refresh(jwtToken, refreshToken) {
  let endpoint = "/user/refreshtoken";

  let dataToSend = {
    AccessToken: jwtToken,
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
