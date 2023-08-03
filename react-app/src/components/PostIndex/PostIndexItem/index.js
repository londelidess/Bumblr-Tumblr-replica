import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeletePostById, fetchFollowingPosts, fetchAllPosts } from '../../../store/post';
import { thunkCreateComment, thunkRemoveComment } from '../../../store/comment'
import { fetchLoggedInUserFollowing, thunkAddFollow, thunkRemoveFollow } from "../../../store/follow";
import DeleteIcon from "../../IconCollection/DeleteIcon"
import ThreeDotsIcon from "../../IconCollection/ThreeDotsIcon"
import EditIcon from '../../IconCollection/EditIcon';

import Likes from '../../Likes';
import './PostIndexItem.css';
import stock from '../../../images/stock.png'
import LikeIcon from '../../IconCollection/LikeIcon';
import RePostIcon from '../../IconCollection/RePostIcon';
import CommentIcon from '../../IconCollection/CommentIcon';
import SharingIcon from '../../IconCollection/SharingIcon';
import likesReducer from '../../../store/like';

const getPost = (state) => Object.values(state.posts.allPosts);

const PostIndexItem = ({ post, fromPath }) => {
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);
    const history = useHistory();
    const dispatch = useDispatch();
    const allPosts = useSelector(getPost)
    const [showCommentArea, setShowCommentArea] = useState(false);
    const loggedInUserFollowing = useSelector((state) => state.follows.loggedInUserFollowing);
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    const [commentContent, setCommentContent] = useState("");
    const [commentAreaOption, setCommentAreaOption] = useState("show_comments");
    post.comments.sort((comment1, comment2) => {
        const a = new Date(comment1.post_date);
        const b = new Date(comment2.post_date);
        return b - a;
    });

    const toggleShowCommentArea = () => {
        setShowCommentArea(prevState => !prevState)
    };

    const handleFollow = (userId) => {
        dispatch(thunkAddFollow(userId)).then(() => {
            dispatch(fetchLoggedInUserFollowing());
            dispatch(fetchFollowingPosts())
        });
    };

    const handleUnfollow = (userId) => {
        dispatch(thunkRemoveFollow(userId)).then(() => {
            dispatch(fetchLoggedInUserFollowing());
            dispatch(fetchFollowingPosts())
        });
    };

    const isUserFollowing = (userId) => {
        return loggedInUserFollowing.some((followedUser) => followedUser.id === userId);
    };

    // Check if it's the user's own post
    const isOwnPost = post.user.id === loggedInUserId;

    // Check if the logged-in user is following the user of the post
    const isCurrentUserFollowingPostUser = isUserFollowing(post.user.id);

    const showCommentTab = () => {
        setCommentAreaOption("show_comments")
    }

    const showLikeTab = () => {
        setCommentAreaOption("show_likes")
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const comment_tobe_added = { "content": commentContent };
        try {
            await dispatch(thunkCreateComment(post.id, comment_tobe_added))
            await dispatch(fetchLoggedInUserFollowing());
            await dispatch(fetchFollowingPosts())
            await dispatch(fetchAllPosts());
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            dispatch(thunkRemoveComment(commentId)).then(() => {
                dispatch(fetchLoggedInUserFollowing());
                dispatch(fetchFollowingPosts());
                dispatch(fetchAllPosts());
            });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

    }, [dispatch]);

    return (
        <div className='post-index-item-wrapper'>
            <div className='avatar-area'>
                <img src={stock} alt="Avatar" className="tiny-image" />
            </div>

            <div className="post-index-item">
                <Link className='postItem-title-bar' to='/'>
                    <div className='post-user-follow'>
                        <span className='title-bar-username'>{post.user.username}</span>
                        {currentUser && !isOwnPost && !isCurrentUserFollowingPostUser && (
                            <button onClick={() => handleFollow(post.user.id)}>Follow</button>
                        )}
                        {currentUser && !isOwnPost && isCurrentUserFollowingPostUser && (
                            <button onClick={() => handleUnfollow(post.user.id)}>Unfollow</button>
                        )}
                    </div>
                    <div className='post-index-item-menu'>
                        <ThreeDotsIcon />
                    </div>
                </Link>

                <div className=''>
                    <div className='postItem-img-wrapper'>
                        {post.medias.map((item, index) => (
                            <div className='postItem-img' key={index}>
                                <img alt='house' src={`${item.media_url}`} />
                            </div>
                        ))}
                    </div>
                    <div className='post-item-content'>
                        <p>{post.content}</p>
                    </div>
                </div>

                { currentUser && currentUser.id === post.user.id &&
                    (
                        <div className='postitem-delete-edit-wrapper'>
                            <DeleteIcon />
                            <EditIcon />
                        </div>
                    )
                }


                <div className='postItem-tail-bar'>
                    <div className='post-item-notes'>
                        <span className='tail-bar-notes' onClick={toggleShowCommentArea}>{post.likes_count + post.comments_count} notes</span>
                    </div>
                    <div className='post-index-item-icons'>
                        <SharingIcon />
                        <CommentIcon />
                        <RePostIcon />
                        <Likes post={post}  />
                    </div>
                </div>

                {
                    showCommentArea && (

                        <div className='post-index-comment-area'>
                            <div className='post-index-comment-area-header'>
                                <div className='svg-comments' onClick={showCommentTab}>
                                    <CommentIcon />
                                </div>
                                <div>{post.comments_count}</div>
                                <RePostIcon />
                                <div className='svg-likes' onClick={showLikeTab}>
                                    <LikeIcon />
                                </div>
                                <div>{post.likes_count}</div>
                            </div>


                            {commentAreaOption === "show_comments" &&
                                (<div >
                                    <div className='comment-form-wrapper'>
                                        <div>
                                            avatar area
                                        </div>

                                        {currentUser &&
                                            (
                                                <form onSubmit={handleCommentSubmit}>
                                                    <div className='comment-form-content'>
                                                        <input
                                                            type="text"
                                                            value={commentContent}
                                                            placeholder='Send something nice'
                                                            onChange={(e) => setCommentContent(e.target.value)}
                                                        />
                                                    </div>
                                                    <div><button>Reply</button></div>
                                                </form>
                                            )
                                        }

                                    </div>
                                    <div className='scrolldown-right'>
                                        {post.comments.map((item, index) => (
                                            <div className='postItem-comment' key={index}>
                                                <div>
                                                    avatar area
                                                </div>
                                                <div>
                                                    {item.username}
                                                    <div>
                                                        {item.content}
                                                    </div>
                                                </div>
                                                {currentUser && currentUser.id === item.user_id &&
                                                    (
                                                        <div className='comment-delete-button' onClick={() => handleDeleteComment(item.id)}>
                                                            <DeleteIcon />
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        ))}
                                    </div>
                                </div>)
                            }

                            {commentAreaOption === "show_likes" &&
                                (<div className='scrolldown-right'>
                                    {post.likes.map((item, index) => (
                                        <div>
                                            <div className='postItem-like' key={index}>
                                                <div>
                                                    avatar area
                                                </div>
                                                <div>
                                                    {item.username}
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>)
                            }
                        </div>
                    )
                }

            </div >
        </div>
    );
};

export default PostIndexItem;
