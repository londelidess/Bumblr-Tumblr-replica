import { useHistory } from 'react-router-dom';
import PostIndexItem from "./PostIndexItem";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts, fetchFollowingPosts, getFollowingPosts } from '../../store/post';
import { fetchUserLikes } from '../../store/like';
import About from '../Footer';
import { useEffect } from 'react';
import './PostIndex.css';
import { fetchLoggedInUserFollowing, thunkAddFollow, thunkRemoveFollow } from "../../store/follow";
import CreateBar from "../CreateBar"

const getPost = (state) => Object.values(state.posts.allPosts);

const UserCurrent = () => {
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);
    const history = useHistory();
    const path = window.location.pathname;
    const allPosts = useSelector(getPost);
    const currentPosts = allPosts.filter(post => post.user.id === currentUser.id);
    const dispatch = useDispatch();
    const [displayOption, setDisplayOption] = useState("show_following");

    currentPosts.sort((post1, post2) => {
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

    useEffect(() => {
        dispatch(fetchAllPosts());
        if (currentUser) {
            try {
                dispatch(fetchLoggedInUserFollowing());
                dispatch(fetchFollowingPosts());
                dispatch(fetchUserLikes(currentUser.id));
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
                        {currentPosts.map((post, index) => (
                            <PostIndexItem
                                post={post}
                                key={index}
                            />
                        ))}
                    </div>
                )
            }
            <About />
        </div>
    );
};

export default UserCurrent;
