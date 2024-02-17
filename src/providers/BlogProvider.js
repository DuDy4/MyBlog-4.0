import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthProvider";


// Create special context Object
export const BlogContext = createContext(null);

export function BlogProvider({children}) {
  //This is the main data structure that contains all the posts in the blog.
  const [posts, setPosts] = useState([]);
  //This will tell the posts that there is no more posts in the server
  const [noMorePosts, setNoMorePosts] = useState(false)
  //This is the counter that saves the next id that will be given to the next post
  const [effect, setEffect] = useState(true)
  const [postsFilters, setPostsFilters] = useState(new Map())
  const {user} = useContext(AuthContext)

  const addPost = async (postToAdd) => {
    const packagePostUser = {
      userId: user.id,
      post: postToAdd
    }
    try {
      await fetch(process.env.REACT_APP_API_SERVER_URL + '/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(packagePostUser),
      })
      setEffect(!effect);
    } catch (error) {
      throw new Error('Could not add the post to server');
    }
  }

  const removePost = async (postId) => {
    try {
      await fetch(process.env.REACT_APP_API_SERVER_URL + `/posts/${postId}`, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: user.id})
      })
      setEffect(!effect);
    } catch (error) {
      throw new Error('Could not add the post to server');
    }
  }

  const editPost = async (id, title, content) => {
    const postData = {title: title, content: content}
    let bodyToSend = JSON.stringify({
      dataToChange: postData,
      userId: user.id
    });
    try {
      const url = process.env.REACT_APP_API_SERVER_URL + `/posts/` + String(id);
      await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: bodyToSend
      })
      setEffect(!effect);
    } catch (error) {
      throw new Error('Could not add the post to server');
    }
  }

    const handleSetPostsFilters = (postsFilterMap) => {
      setPostsFilters(postsFilterMap)
      setEffect(!effect)
    }



    //This section will load the Posts in the local storage, in case of reload (refresh) of the page
    useEffect(() => {
      let url = process.env.REACT_APP_API_SERVER_URL + '/posts?';
      const addKeyValueToUrl = (key, value) => {
        url += `${value}=${key}&`;
      }
      postsFilters.forEach(addKeyValueToUrl);
      url = url.slice(0, -1); //remove the last '&'

      const fetchPosts = async () => {
        try {
          const res = await fetch(url)
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await res.json()
          if (data.length === 6){
            setNoMorePosts(true);
            data.pop()
          }
          setPosts(data)
        } catch {
          console.log('There was a problem with fetching the posts')
        }
      }
      fetchPosts()
    }, [effect, postsFilters]);

    const value = {posts, noMorePosts, addPost, removePost, editPost, handleSetPostsFilters};

    return (
        <BlogContext.Provider value={value}>
          {children}
        </BlogContext.Provider>
    )

}
