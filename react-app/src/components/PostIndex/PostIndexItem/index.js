import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeletePostById, fetchFollowingPosts, fetchAllPosts } from '../../../store/post';
import { thunkCreateComment, thunkRemoveComment } from '../../../store/comment'
import { fetchLoggedInUserFollowing, thunkAddFollow, thunkRemoveFollow } from "../../../store/follow";
import DeleteIcon from "../../IconCollection/DeleteIcon"
import Likes from '../../Likes';
import './PostIndexItem.css';
import stock from '../../../images/stock.png'

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
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                        </div>
                    )
                }


                <div className='postItem-tail-bar'>
                    <div className='post-item-notes'>
                        <span className='tail-bar-notes' onClick={toggleShowCommentArea}>{post.likes_count + post.comments_count} notes</span>
                    </div>
                    <div className='post-index-item-icons'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M400 255.4V240 208c0-8.8-7.2-16-16-16H352 336 289.5c-50.9 0-93.9 33.5-108.3 79.6c-3.3-9.4-5.2-19.8-5.2-31.6c0-61.9 50.1-112 112-112h48 16 32c8.8 0 16-7.2 16-16V80 64.6L506 160 400 255.4zM336 240h16v48c0 17.7 14.3 32 32 32h3.7c7.9 0 15.5-2.9 21.4-8.2l139-125.1c7.6-6.8 11.9-16.5 11.9-26.7s-4.3-19.9-11.9-26.7L409.9 8.9C403.5 3.2 395.3 0 386.7 0C367.5 0 352 15.5 352 34.7V80H336 304 288c-88.4 0-160 71.6-160 160c0 60.4 34.6 99.1 63.9 120.9c5.9 4.4 11.5 8.1 16.7 11.2c4.4 2.7 8.5 4.9 11.9 6.6c3.4 1.7 6.2 3 8.2 3.9c2.2 1 4.6 1.4 7.1 1.4h2.5c9.8 0 17.8-8 17.8-17.8c0-7.8-5.3-14.7-11.6-19.5l0 0c-.4-.3-.7-.5-1.1-.8c-1.7-1.1-3.4-2.5-5-4.1c-.8-.8-1.7-1.6-2.5-2.6s-1.6-1.9-2.4-2.9c-1.8-2.5-3.5-5.3-5-8.5c-2.6-6-4.3-13.3-4.3-22.4c0-36.1 29.3-65.5 65.5-65.5H304h32zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V376c0-13.3-10.7-24-24-24s-24 10.7-24 24v64c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
                    </div>
                </div>

                {
                    showCommentArea && (

                        <div className='post-index-comment-area'>
                            <div className='post-index-comment-area-header'>
                                <div className='svg-comments' onClick={showCommentTab}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>
                                </div>
                                <div>{post.comments_count}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z" /></svg>
                                <div className='svg-likes' onClick={showLikeTab}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
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
