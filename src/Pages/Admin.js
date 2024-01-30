import {useContext, useEffect} from "react";
import {AuthContext} from "../providers/AuthProvider";
import {useForm} from "react-hook-form";
import {BlogContext} from "../providers/BlogProvider";
import AdminComp from "../Comps/admin";

//This page will load the admin component -ONLY if the admin is logged in.
export default function Admin(){
    const {user} = useContext(AuthContext);

    return (
        <div>
            {user? <AdminComp/> : <h2>Please sign in to add post</h2>}


        </div>
    )
}