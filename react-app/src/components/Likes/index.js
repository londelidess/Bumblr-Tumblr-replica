import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostLikes, thunkAddLike, thunkRemoveLike } from "../path/to/likesReducer";

const Likes = ({ postId }) => {
    const dispatch = useDispatch();
    const postLikes = useSelector((state) => state.likes.postLikes);
    const userLikes = useSelector((state) => state.likes.userLikes);
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);

    useEffect(() => {
        // Fetch post likes when the component mounts
        dispatch(fetchPostLikes(postId));
    }, [dispatch, postId]);

    const isUserLiked = () => {
        return userLikes.some((like) => like.postId === postId);
    };

    const handleLike = () => {
        // Dispatch the thunk to add a like
        dispatch(thunkAddLike(postId));
    };

    const handleUnlike = () => {
        // Find the user's like for this post
        const userLike = userLikes.find((like) => like.postId === postId);

        if (userLike) {
            // Dispatch the thunk to remove the like
            dispatch(thunkRemoveLike(userLike.id));
        }
    };

    return (
        <div className="likes-container">
            <div className="likes-count">{postLikes.length} Likes</div>
            {!isUserLiked() ? (
                <button onClick={handleLike}>Like</button>
            ) : (
                <button onClick={handleUnlike}>Unlike</button>
            )}
        </div>
    );
};

export default Likes;
