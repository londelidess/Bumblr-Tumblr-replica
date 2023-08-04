import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostLikes, thunkAddLike, thunkRemoveLike, fetchUserLikes } from "../../store/like";
import { fetchAllPosts, fetchFollowingPosts, getFollowingPosts } from '../../store/post';
import LikeButton from "./Button";


const Likes = ({ post }) => {
    const dispatch = useDispatch();
    const userLikes = useSelector((state) => state.likes.userLikes);
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    // const post = useSelector((state) => state.posts.postId)


    let originalLikeId = null
    post.likes.forEach(like => {
        if (like.user_id === loggedInUserId) {
            originalLikeId = like.id
        }
    })
    const [likeId, setLikeId] = useState(originalLikeId)

    // useEffect(() => {
    //     dispatch(fetchPostLikes(post.id));
    // }, [dispatch, post.id]);

    const isUserLiked = () => {
        return userLikes.some((like) => like.post_id === post.id);
    };

    const handleLike = async () => {
        if (isUserLiked()) {
            await dispatch(thunkRemoveLike(likeId));
            await dispatch(fetchUserLikes(loggedInUserId));
            await dispatch(fetchFollowingPosts());
            await dispatch(fetchAllPosts());
        } else {
            const data = await dispatch(thunkAddLike(post.id));
            setLikeId(data.id)
            await dispatch(fetchUserLikes(loggedInUserId));
            await dispatch(fetchFollowingPosts());
            await dispatch(fetchAllPosts());
        }
    };

    return (
        <div>
            {loggedInUserId && (
                <div className="likes-container">
                    <LikeButton isLiked={isUserLiked()} onLike={handleLike} />
                </div>
            )}
        </div>
    );
};

export default Likes;
