import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {router} from "./routes";
import {RouterProvider} from "react-router-dom";
import {BlogProvider} from "./providers/BlogProvider";
import {AuthProvider} from "./providers/AuthProvider";
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="171850772487-t35e7nm30qhl51r5e0rd8a4dt8b516ek.apps.googleusercontent.com">;
            <BlogProvider>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </BlogProvider>
        </GoogleOAuthProvider>
     </React.StrictMode>
);

reportWebVitals();
