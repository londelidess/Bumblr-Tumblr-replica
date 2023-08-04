import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserFollowing, thunkAddFollow, thunkRemoveFollow } from "../../store/follow";
import "./Follow.css";
import stock from '../../images/stock.png'
import About from '../Footer'
function FollowsList() {
    const dispatch = useDispatch();
    const loggedInUserFollowing = useSelector((state) => state.follows.loggedInUserFollowing);
    const userFollowing = useSelector((state) => state.follows.userFollowing);
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);

    useEffect(() => {
        dispatch(fetchLoggedInUserFollowing());
    }, [dispatch]);

    const isUserFollowing = (userId) => {
        return loggedInUserFollowing.some((followedUser) => followedUser.id === userId);
    };

    const handleFollow = (userId) => {
        dispatch(thunkAddFollow(userId));
    };

    const handleUnfollow = (userId) => {
        dispatch(thunkRemoveFollow(userId));
    };

    return (
        <div className="follows-container">

            <h2 className="follow-title">Your Following</h2>


            <div className="following-list">
                {loggedInUserFollowing.map((user) => (
                    <div key={user.id} className="user-item">
                        <img src={stock} alt="follow-avatar" className="follow-tiny-image" />
                        <span className="follow-user">{user.username}</span>
                        {loggedInUserId !== user.id && (
                            isUserFollowing(user.id) ? (
                                <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
                            ) : (
                                <button onClick={() => handleFollow(user.id)}>Follow</button>
                            )
                        )}
                    </div>
                ))}

            </div>
            <About />
        </div>
    );
}

export default FollowsList;
