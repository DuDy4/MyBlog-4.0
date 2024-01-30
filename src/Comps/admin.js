import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../providers/BlogProvider";
import {useForm} from "react-hook-form";


export default function AdminComp() {

    const {addPost, assignId} = useContext(BlogContext)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const { register, handleSubmit, formState, reset } = useForm();


    const prevTitle = localStorage.getItem('title')
    const prevContent = localStorage.getItem('content')

    //This function will be running every keyup event (using useEffect rerender stage),
    // and update the local storage so it will remember the draft of the post
    const setDraftToLocalStorage = () => {
        localStorage.setItem("title", title);
        localStorage.setItem("content", content);
    }

    useEffect(() => {
        setDraftToLocalStorage();
    }, [title, content]);


    const handleNewPostSubmit = (data) => {
        addPost({
            id: assignId(),
            title: data.title,
            content: data.content
        })
        reset()
        setTitle('')
        setContent('') //Remove the current draft from local storage
    }


    return (
        <div>
            <h2>Add a post to the blog:</h2>
            <br/>
            <form className='form' onSubmit={handleSubmit(handleNewPostSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input defaultValue={prevTitle ? prevTitle : ''}
                           onKeyUp={event => {setTitle(event.target.value)}} //save to draft
                           type="text" {...register('title', {required: true})}/>
                    {formState.errors.title && <span className="text-danger">Error in this field!</span>}
                </div>
                <br/>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea defaultValue={prevContent ? prevContent : ''}
                              onKeyUp={event => {setContent(event.target.value)}} //save to draft
                              {...register('content', {minLength: 5, required: true})}></textarea>
                    {formState.errors.content && <span className="text-danger">Must write at least 5 characters</span>}
                </div>

                <br/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}