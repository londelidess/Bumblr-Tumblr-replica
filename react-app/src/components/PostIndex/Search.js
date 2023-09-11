import { useHistory } from 'react-router-dom';
import PostIndexItem from "./PostIndexItem";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts, fetchFollowingPosts, fetchSearchPosts, getSearchPosts } from '../../store/post';
import { fetchUserLikes } from '../../store/like';
import About from '../Footer';
import { useEffect } from 'react';
import './PostIndex.css';
import CreateBar from "../CreateBar"
import { fetchLoggedInUserFollowing } from '../../store/follow';


const Search = () => {
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);
    const history = useHistory();
    const path = window.location.pathname;
    const allPosts = useSelector(getSearchPosts);
    const dispatch = useDispatch();
    const [displayOption, setDisplayOption] = useState("show_following");

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
        // dispatch(fetchSearchPosts());
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
                        {allPosts?.length === 0 && <h3 className='no_search_result'>No result found! Please try something else...</h3>}
                        {allPosts.map((post, index) => (
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

export default Search;
