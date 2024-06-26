import PostList from "../Comps/PostList";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../providers/BlogProvider";
import {PostCard} from "../Comps/PostCard";

export default function Posts(){
    const {posts, noMorePosts, handleSetPostsFilters} = useContext(BlogContext);
    const [fromQuery, setFromQuery] = useState('');
    const [toQuery, setToQuery] = useState('');
    const [textQuery, setTextQuery] = useState('');
    const [lastNameQuery, setLastNameQuery] = useState('');
    const [fromPage, setFromPage] = useState(0);

    const handleUserFromInput = (evt) => {
        setFromQuery(evt.target.value);
    }
    const handleUserToInput = (evt) => {
        setToQuery(evt.target.value);
    }
    const handleUserTextInput = (evt) => {
        setTextQuery(evt.target.value);
    }
    const handleUserLastNameInput = (evt) => {
        setLastNameQuery(evt.target.value);
    }
    const handleFromPage = async(num) => {
        setFromPage(fromPage + num);
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
        if (lastNameQuery !== ''){
            filterMap.set('userLastName', lastNameQuery)
        }
        filterMap.set('fromPage', fromPage);
        handleSetPostsFilters(filterMap)
    }, [fromQuery,toQuery,textQuery, lastNameQuery, fromPage]);
    return (
        <div>
            <h2>Posts</h2>
            <p>Here is the list of my posts!<br/></p>

            <div className="formLines">
                You can filter them as follow:
                <div>From post number:<input type="number" onChange={handleUserFromInput}/> to post number:<input type="number" onChange={handleUserToInput}/></div>
                <div>Or filter by text (in title): <input onChange={handleUserTextInput}/></div>
                <div>Or filter by the user that created the post (last name): <input onChange={handleUserLastNameInput}/></div>
            </div>
            <br/>
            <div>
                <PostList>
                    {posts
                        .map((post) => <PostCard key={post.id} post={post}/>)
                    }
                </PostList>
                <div className="buttons">
                    {(fromPage !== 0) && <button onClick={() => handleFromPage(-5)}>Previous page</button>}
                    {(posts.length >= 5) && <button onClick={() => handleFromPage(5)}>Next page</button>}
                </div>
            </div>

        </div>
    )
}