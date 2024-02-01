import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";


export default function GoogleLogin(){
    return (
        <GoogleLogin onSuccess={credentialResponse => {
                let credentialDecoded = jwtDecode(credentialResponse.credential);
                console.log(credentialDecoded);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}