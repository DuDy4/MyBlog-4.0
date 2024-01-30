import {useState} from "react";
import {Link} from "react-router-dom";

export function PostCard({post}) {
    const [isVisible, setIsVisible] = useState(false);

    return (
         <li className='postsDisplay'>
             <div>

                 <h4 onClick={() => setIsVisible(!isVisible)}>{post.title}</h4>

                 {isVisible && <div>
                        {post.content}
                    </div>}
             </div>
             <Link to={ `/posts/${post.id}`} className="btn btn-primary"><h6>Read More</h6></Link>
        </li>
    )
}

