export function authHeader(){
    let token = localStorage.getItem("accessToken");

    if(token){
        return token;
    }
    else{
        return '';
    }
}