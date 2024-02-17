import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// import {BlogContext} from "../providers/BlogProvider";
import PostPageComp from "../Comps/PostPageComp";
import EditPost from "../Comps/editPost";
import {AuthContext} from "../providers/AuthProvider";

export default function PostPage(){
    const {user} = useContext(AuthContext);
    const {id} = useParams()
    const [post, setPost] = useState({});
    const [editMode, setEditMode] = useState(false);

    //This is a generic hook to rerender the page whenever I need to
    const [renderChecker, setRenderChecker] = useState(true);
    const [postCreator, setPostCreator] = useState() //This is the user who created the post

    async function fetchPost(){
        const url = process.env.REACT_APP_API_SERVER_URL + "/posts/" + id;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const currentPost = await res.json()
        await setPost(currentPost);
        const creatorId = await currentPost.createdBy;
        if (creatorId !== null){ //if the post was created by a user, it should fetch the user data
            await fetchUser(creatorId);
        }
    }

    async function fetchUser(createdBy){
        const url = process.env.REACT_APP_API_SERVER_URL + "/users/" + createdBy;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const creator = await res.json()
        setPostCreator(creator)
    }


    //This state manipulation is crucial to the page.
    //This will deter if the component will be the regular post or the post
    //in "edit mode" (a different component).
    const handleEditMode = () => {
        setEditMode(!editMode)
    }
    //This enters and exits from edit mode
    useEffect(() => {
        fetchPost();
        setRenderChecker(!renderChecker)
        return () => { //This will ensure that leaving the page will reset the edit mode
            //so the next time somebody will read the post it will be the regular component.
            setEditMode(false)
        }
    }, [id]);
    // I put the id in the re-render stage to catch URL "manipulations"
    // and reset the edit mode when moving through post-pages


    return (
        editMode ?
            (user ?
                <EditPost post={post}  creator = {postCreator} handleEditMode={handleEditMode}/> : <h2>Only Admin can edit this post (and other posts)</h2>)
            : <PostPageComp post={post} creator = {postCreator} handleEditMode={handleEditMode}/>
    )
}