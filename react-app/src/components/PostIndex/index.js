import { useHistory } from 'react-router-dom';
import PostIndexItem from "./PostIndexItem";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts, fetchFollowingPosts, getFollowingPosts } from '../../store/post';
import { useEffect } from 'react';
import './PostIndex.css';
import { fetchLoggedInUserFollowing, thunkAddFollow, thunkRemoveFollow } from "../../store/follow";


const getPost = (state) => Object.values(state.posts.allPosts);

const PostIndex = () => {
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);
    const history = useHistory();
    const path = window.location.pathname;
    const allPosts = useSelector(getPost);
    const followingPosts = useSelector(getFollowingPosts);
    const dispatch = useDispatch();
    const [displayOption, setDisplayOption] = useState("show_following");
    followingPosts.sort((post1, post2) => {
        const a = new Date(post1.postDate);
        const b = new Date(post2.postDate);
        return b - a;
    });
    allPosts.sort((post1, post2) => {
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
            } catch (e) {
                return
            }
        }
    }, [dispatch, currentUser]);


    return (
        <div className='home-wrapper'>
            <div className='posts_option_tab'>
                
                {currentUser &&
                    (
                        <div className='foryou_following_tabs'>
                            <div className='following_tab' onClick={showFollowingTab}>Following</div>
                            <div className='foryou_tab' onClick={showForYouTab}>For you</div>
                        </div>
                    )
                }
                
            </div>

            {displayOption === "show_foryou" &&
                (
                    <div className='post-index-all'>
                        {allPosts.map((post, index) => (
                            <PostIndexItem
                                post={post}
                                key={index}
                            />
                        ))}
                    </div>
                )
            }

            {displayOption === "show_following" &&
                (
                    <div className='post-index-all'>
                        {followingPosts.map((post, index) => (
                            <PostIndexItem
                                post={post}
                                key={index}
                            />
                        ))}
                    </div>
                )
            }

            { !currentUser && 
                (
                    <div className='post-index-all'>
                        {allPosts.map((post, index) => (
                            <PostIndexItem
                                post={post}
                                key={index}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default PostIndex;