import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// import {BlogContext} from "../providers/BlogProvider";
import PostPageComp from "../Comps/PostPageComp";
import EditPost from "../Comps/editPost";
import {AuthContext} from "../providers/AuthProvider";

export default function PostPage(){
    const {user} = useContext(AuthContext);
    const {id} = useParams()
    // const {posts} = useContext(BlogContext)
    // const post = posts.find(element => element.id === Number(id)) //This will help us hold the chosen post
    const [post, setPost] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [renderChecker, setRenderChecker] = useState(true)

    useEffect(() => {
        async function fetchPost(){
            const url = "http://localhost:3000/posts/" + id;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            setPost(await res.json())
        }
        fetchPost()
        setRenderChecker(!renderChecker)
    }, [editMode]);

    //This state manipulation is crucial to the page.
    //This will deter if the component will be the regular post or the post
    //in "edit mode" (a different component).

    //This enters and exits from edit mode
    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    //This will ensure that leaving the page will reset the edit mode
    //so the next time somebody will read the post it will be the regular component.
    useEffect(() => {
        return () => {
            setEditMode(false)
        }
    }, [id]) // I put the id in the re-render stage to catch URL "manipulations"
    // and reset the edit mode when moving through post-pages

    return (
        editMode ?
            (user ?
                <EditPost post={post} handleEditMode={handleEditMode}/> : <h2>Only Admin can edit this post (and other posts)</h2>)
            : <PostPageComp post={post} handleEditMode={handleEditMode}/>
    )
}