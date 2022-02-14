import getPosts from '../../services/getPosts'
import getUsers from '../../services/getUsers';
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';


const PostWidget = () =>{
  
const dispatch = useDispatch();
const { posts } = useSelector((state) => state.postDuck);
const { users } = useSelector((state) => state.userDuck);


useEffect(() => {
    
    dispatch(getPosts("?_sort=likes&_order=desc&_star=1&_end=5"));
    
  }, [dispatch]);
  




    return(
        <div className="post-widget-content">

            <div className="header-div">

                <div className="header-content">

                    <span>Popular Posts</span>

                </div>

            </div>

            {
                posts.map(post=>(

                    <div key={post.id} className='post-element'>

                        <div className='post-avatar'>

                            <img src={''} alt={''}/>

                        </div>

                        <div className='post-content'>

                            <Link to={`/posts/${post.id}`}>

                            <span>{`${post.content.slice(0,60)} . . .`}</span>

                            </Link>

                        </div>

                        
                    </div>
                ))
            }

        </div>
    )
}

export default PostWidget