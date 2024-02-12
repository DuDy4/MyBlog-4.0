import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";
import {BlogContext} from "../providers/BlogProvider";
import {useNavigate} from "react-router-dom";

//This component will load in PostPage, when not in edit mode.
//I used props drilling instead of provider because I only needed
// post and handleEditMode on one level of children.
export default function PostPageComp({post, handleEditMode, creator}){

    const {user} = useContext(AuthContext)
    const {removePost} = useContext(BlogContext)
    const navigate = useNavigate()

    const handleRemovePost = () => {
        removePost(post)
        navigate('/posts') //return to the posts list page instead of stay on loading...
    }

    return (
        <div className='postPage'>
            {post ? (
                <div>
                    <h1>{post.title}</h1>
                    <p>
                        {post.content}
                    </p>

                    <p className="created-by">
                        Created by: {creator? (creator.firstName + ' ' + creator.lastName) : <div className="spinner-border"
                                                                       style={{width: '3rem', height: '3rem',}}
                                                                       role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                    </p>
                </div>
            ) : (
                <div className="spinner-border"
                     style={{width: '3rem', height: '3rem',}}
                     role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            <div className="buttons">
                {user && <button onClick={handleEditMode}>Edit</button>}
                {user && <button onClick={handleRemovePost}>Delete</button>}
            </div>
        </div>
    )
}
