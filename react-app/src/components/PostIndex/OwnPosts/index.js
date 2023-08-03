import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentPosts } from '../../../store/post';
import '../PostIndex.css';

const OwnPosts = () => {
    const dispatch = useDispatch();
    const currentPostsFromRedux = useSelector(state => Object.values(state.posts.currentPosts));

    useEffect(() => {
        dispatch(fetchCurrentPosts());
    }, [dispatch]);

    return (
        <div className="home-wrapper">
            <div className="post-index-all">
                {currentPostsFromRedux.map((post, index) => (
                    <p key={index}>{post.content}</p>
                ))}
            </div>
        </div>
    );
};
export default OwnPosts;
