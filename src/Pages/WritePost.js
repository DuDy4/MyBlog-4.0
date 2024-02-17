import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";
import AdminComp from "../Comps/writePost";

//This page will load the admin component -ONLY if the admin is logged in.
export default function WritePost(){
    const {user} = useContext(AuthContext);

    return (
        <div>
            {user? <AdminComp/> : <h2>Please sign in to add post</h2>}
        </div>
    )
}