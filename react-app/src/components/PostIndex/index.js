import { useHistory } from 'react-router-dom';
import PostIndexItem from "./PostIndexItem";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts, fetchFollowingPosts, getFollowingPosts } from '../../store/post';
import { useEffect } from 'react';
import './PostIndex.css';

const getPost = (state) => Object.values(state.posts.allPosts);

const PostIndex = () => {
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);
    const history = useHistory();
    const path = window.location.pathname;
    const allPosts = useSelector(getPost);
    const followingPosts = useSelector(getFollowingPosts);
    const dispatch = useDispatch();
    const [postsToShow, setPostsToShow] = useState(allPosts);

    const showForYouTab = () => {
        setPostsToShow(allPosts)
    }

    const showFollowingTab = () => {
        setPostsToShow(followingPosts)
    }

    useEffect(() => {
        dispatch(fetchAllPosts());
        if (currentUser) {
            dispatch(fetchFollowingPosts())
        }
    }, [dispatch]);

    return (
        <div className='home-wrapper'>
            <div className='posts_option_tab'>
                <div className='foryou_tab' onClick={showForYouTab}>For you</div>
                {currentUser &&
                    (
                        <div className='following_tab' onClick={showFollowingTab}>Following</div>
                    )
                }
            </div>

            <div className='post-index-all'>
                {postsToShow.map((post, index) => (
                    <PostIndexItem
                        post={post}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostIndex;