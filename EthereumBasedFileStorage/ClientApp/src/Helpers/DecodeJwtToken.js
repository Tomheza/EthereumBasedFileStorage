import * as jwt_decode from "jwt-decode";
import {authHeader} from "./AuthorizationHeader";


export function decodeJwtToken(){
    let token = authHeader();

    let decodedToken = undefined;
  
    if (token !== "") {
      decodedToken = jwt_decode(token);
    }

    return decodedToken;
}