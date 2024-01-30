import {useForm} from "react-hook-form";
import {BlogContext} from "../providers/BlogProvider";
import {useContext} from "react";


//This component will be rendered only when in PostPage AND in edit mode.
export default function EditPost({post, handleEditMode}){
    const {editPost} = useContext(BlogContext)
    const { register, handleSubmit,
        formState, reset } = useForm();

    const handleEditPost = (data) => {
        editPost(post.id, data.title, data.content);
        post.title = data.title;
        post.content = data.content;
        reset();
        handleEditMode(); //This will exit edit mode
    }

    return (
        <form className='postPage' onSubmit={handleSubmit(handleEditPost)}>
            <h2>Edit Mode</h2><br/>
            <div>
                <label htmlFor="title">Title</label>
                <input defaultValue={post ? post.title : ''} type="text"
                       {...register('title', {required: true})}/>
                {formState.errors.title && <span className="text-danger">Error in this field!</span>}
            </div>

            <div>
                <label htmlFor="content">Content</label>
                <textarea defaultValue={post ? post.content : ''}
                          {...register('content', {minLength: 5, required: true})}></textarea>
                {formState.errors.content && <span className="text-danger">Error in this field!</span>}
            </div>

            <div className="buttons">
                <button type="submit" onSubmit={handleEditPost}>Save edits</button>
                <button onClick={handleEditMode}>Cancel</button>
            </div>
        </form>
    )
}