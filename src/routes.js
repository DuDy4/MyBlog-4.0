import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import WritePost from "./Pages/WritePost";
import Posts from "./Pages/Posts";
import Contact from "./Pages/Contact";
import PostPage from "./Pages/PostPage";


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element:<App/>,
            children:[
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/posts',
                    element: <Posts />
                },
                {
                    path: '/posts/:id',
                    element: <PostPage />
                },
                {
                    path:'/contact',
                    element: <Contact />
                },
                {
                    path: '/write_post',
                    element: <WritePost />
                }
            ]
        }
    ]
)