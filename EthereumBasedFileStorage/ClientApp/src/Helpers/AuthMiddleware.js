import { refresh } from "./RefreshToken";
import { authHeader } from "./AuthorizationHeader";

export async function fetchRequest(endpoint, request) {
  let response = await fetch(endpoint, request);

  if (response.ok) {
    return response.json();
  }

  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  if (response.status === 401 && response.headers.has("Token-Expired")) {
    let refreshResponse = await refresh(accessToken, refreshToken);

    if (!refreshResponse.ok) {
      return response;
    }

    let jsonRefreshResponse = await refreshResponse.json();

    localStorage.setItem("accessToken", jsonRefreshResponse.accessToken);
    localStorage.setItem("refreshToken", jsonRefreshResponse.refreshToken);

    request.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${authHeader()}`
    };

    return await fetchRequest(endpoint, request);
  } else {
    return response;
  }
}
