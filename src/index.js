import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {router} from "./routes";
import {RouterProvider} from "react-router-dom";
import {BlogProvider} from "./providers/BlogProvider";
import {AuthProvider} from "./providers/AuthProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BlogProvider>
                <RouterProvider router={router}/>
            </BlogProvider>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
