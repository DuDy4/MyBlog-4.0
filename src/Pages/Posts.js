import PostList from "../Comps/PostList";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../providers/BlogProvider";
import {PostCard} from "../Comps/PostCard";

export default function Posts(){
    const {posts, handleSetPostsFilters} = useContext(BlogContext);
    const [fromQuery, setFromQuery] = useState('');
    const [toQuery, setToQuery] = useState('');
    const [textQuery, setTextQuery] = useState('');

    const handleUserFromInput = (evt) => {
        setFromQuery(evt.target.value);
    }
    const handleUserToInput = (evt) => {
        setToQuery(evt.target.value);
    }
    const handleUserTextInput = (evt) => {
        setTextQuery(evt.target.value);
    }

    useEffect(() => {
        const filterMap = new Map;
        if (fromQuery !== ''){
            filterMap.set('from', fromQuery)
        }
        if (toQuery !== ''){
            filterMap.set('to', toQuery)
        }
        if (textQuery !== ''){
            filterMap.set('text', textQuery)
        }
        handleSetPostsFilters(filterMap)
    }, [fromQuery,toQuery,textQuery]);

    return (
        <div>
            <h2>Posts: {posts.length}</h2>
            <p>Here is the list of my posts!<br/>You can filter them as follow:</p>
            <br/>From ID:<input type="number" onChange={handleUserFromInput}/> to ID:<input type="number" onChange={handleUserToInput}/>
            <br/><br/>
            Or filter by text: <input onChange={handleUserTextInput}/>
            <PostList>
                {posts
                    // .filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
                    .map((post) => <PostCard post={post}/>)
                }
            </PostList>
        </div>
    )
}