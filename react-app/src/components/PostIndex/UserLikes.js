import { useHistory } from 'react-router-dom';
import PostIndexItem from "./PostIndexItem";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts, fetchFollowingPosts, getFollowingPosts } from '../../store/post';
import { fetchUserLikes } from '../../store/like';

import { useEffect } from 'react';
import './PostIndex.css';
import { fetchLoggedInUserFollowing, thunkAddFollow, thunkRemoveFollow } from "../../store/follow";
import CreateBar from "../CreateBar"
import About from '../Footer';
const getPost = (state) => Object.values(state.posts.allPosts);

const UserLikes = () => {
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);
    const history = useHistory();
    const path = window.location.pathname;
    const allPosts = useSelector(getPost);
    const userLikes = useSelector((state) => state.likes.userLikes);
    const likePostIds = Object.values(userLikes).map(like => like.post_id);
    const likePosts = allPosts.filter(post => likePostIds.includes(post.id));
    const dispatch = useDispatch();
    const [displayOption, setDisplayOption] = useState("show_following");

    likePosts.sort((post1, post2) => {
        const a = new Date(post1.postDate);
        const b = new Date(post2.postDate);
        return b - a;
    });

    const showForYouTab = () => {
        setDisplayOption("show_foryou")
    }

    const showFollowingTab = () => {
        setDisplayOption("show_following")
    }

    useEffect( async () => {
        dispatch(fetchAllPosts());
        if (currentUser) {
            try {
                await dispatch(fetchLoggedInUserFollowing());
                await dispatch(fetchFollowingPosts());
                await dispatch(fetchUserLikes(currentUser.id));
            } catch (e) {
                return
            }
        }
    }, [dispatch, currentUser]);


    return (
        <div className='home-wrapper'>
            <div className='posts_option_tab'>

                {currentUser && (
                    <div>
                        <CreateBar />
                    </div>
                )}

            </div>

            { currentUser &&
                (
                    <div className='post-index-all'>
                        {likePosts.map((post, index) => (
                            <PostIndexItem
                                post={post}
                                key={post.id}
                            />
                        ))}
                    </div>
                )
            }
            <About/>
        </div>
    );
};

export default UserLikes;
