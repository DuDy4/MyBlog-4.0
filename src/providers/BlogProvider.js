import {createContext, useEffect, useState} from "react";


// Create special context Object
export const BlogContext = createContext(null);

export function BlogProvider({children}) {
  //This is the main data structure that contains all the posts in the blog.
  const [posts, setPosts] = useState([]);
  //This will tell the posts that there is no more posts in the server
  const [noMorePosts, setNoMorePosts] = useState(false)
  //This is the counter that saves the next id that will be given to the next post
  const [idCounter, setCounter] = useState(0)
  const [effect, setEffect] = useState(true)
  const [postsFilters, setPostsFilters] = useState(new Map())
  const addPost = async (postToAdd) => {
    try {
      await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postToAdd),
      })
      console.log('post was sent')
      setEffect(!effect);
    } catch (error) {
      throw new Error('Could not add the post to server');
    }
  }

  const removePost = async (postToRemove) => {
    try {
      await fetch(`http://localhost:4000/posts/${postToRemove.id}`, {
        method: 'delete',
      })
      setEffect(!effect);
    } catch (error) {
      throw new Error('Could not add the post to server');
    }
  }

  const editPost = async (id, title, content) => {
    let bodyToSend = JSON.stringify({
      title: title,
      content: content
    });
    try {
      const url = `http://localhost:4000/posts/` + String(id);
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

    const getId = () => {
      return idCounter;
    }

    // This function returns the next id that will be, if we add another post.
    const assignId = () => {
      const id = idCounter;
      setCounter(idCounter + 1);
      return id;
    }

    const handleSetPostsFilters = (postsFilterMap) => {
      setPostsFilters(postsFilterMap)
      setEffect(!effect)
    }



    //This section will load the Posts in the local storage, in case of reload (refresh) of the page
    useEffect(() => {
      let url = 'http://localhost:4000/posts?';
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

    const value = {posts, noMorePosts, addPost, removePost, editPost, getId, assignId, handleSetPostsFilters};

    return (
        <BlogContext.Provider value={value}>
          {children}
        </BlogContext.Provider>
    )

}
