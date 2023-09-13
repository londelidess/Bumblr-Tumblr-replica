import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowingPosts, fetchAllPosts } from "../../../store/post";
import { thunkCreateComment, thunkRemoveComment } from "../../../store/comment";
import {
  fetchLoggedInUserFollowing,
  thunkAddFollow,
  thunkRemoveFollow,
} from "../../../store/follow";
import { fetchPostLikes } from "../../../store/like";
import ThreeDotsIcon from "../../IconCollection/ThreeDotsIcon";
import EditPostForm from "../../CreatePost/EditPostForm";

import Likes from "../../Likes";
import "./PostIndexItem.css";
import stock from "../../../images/stock.png";
import LikeIcon from "../../IconCollection/LikeIcon";
import RePostIcon from "../../IconCollection/RePostIcon";
import CommentIcon from "../../IconCollection/CommentIcon";
import SharingIcon from "../../IconCollection/SharingIcon";
import DeleteConfirmModal from "../../DeleteConfirmModal";
import CommentEditModal from "./CommentEditModal";
import OpenModalMenuItem from "../OpenModalMenuItem";
import { useModal } from "../../../context/Modal";
import BeatLoader from "react-spinners/BeatLoader";

const getPost = (state) => Object.values(state.posts.allPosts);

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const PostIndexItem = ({ post, fromPath }) => {
  const { closeModal } = useModal();
  const getCurrentUser = (state) => state.session.user;
  const currentUser = useSelector(getCurrentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const allPosts = useSelector(getPost);
  const [showCommentArea, setShowCommentArea] = useState(false);
  const loggedInUserFollowing = useSelector(
    (state) => state.follows.loggedInUserFollowing
  );
  const loggedInUserId = useSelector(
    (state) => state.session.user && state.session.user.id
  );
  const [commentContent, setCommentContent] = useState("");
  const [commentAreaOption, setCommentAreaOption] = useState("show_comments");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  post?.comments?.sort((comment1, comment2) => {
    const a = new Date(comment1.post_date);
    const b = new Date(comment2.post_date);
    return b - a;
  });

  const handleReserveClick = () => {
    alert("Feature coming soon");
  };

  const toggleShowCommentArea = () => {
    setShowCommentArea((prevState) => !prevState);
  };

  const handleFollow = (userId) => {
    dispatch(thunkAddFollow(userId)).then(() => {
      dispatch(fetchLoggedInUserFollowing());
      dispatch(fetchFollowingPosts());
    });
  };

  const handleUnfollow = (userId) => {
    dispatch(thunkRemoveFollow(userId)).then(() => {
      dispatch(fetchLoggedInUserFollowing());
      dispatch(fetchFollowingPosts());
    });
  };

  const isUserFollowing = (userId) => {
    return loggedInUserFollowing.some(
      (followedUser) => followedUser?.id === userId
    );
  };

  // Check if it's the user's own post
  const isOwnPost = post.user?.id === loggedInUserId;

  // Check if the logged-in user is following the user of the post
  const isCurrentUserFollowingPostUser = isUserFollowing(post.user?.id);

  const showCommentTab = () => {
    setCommentAreaOption("show_comments");
  };

  const showLikeTab = () => {
    setCommentAreaOption("show_likes");
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (commentContent.length < 10 || commentContent.length > 200) {
      setError("Comment must be between 10 and 200 characters");
      return;
    }
    const comment_tobe_added = { content: commentContent };
    try {
      await dispatch(thunkCreateComment(post.id, comment_tobe_added));
      await dispatch(fetchLoggedInUserFollowing());
      await dispatch(fetchFollowingPosts());
      await dispatch(fetchAllPosts());
      setCommentContent("");
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      dispatch(thunkRemoveComment(commentId)).then(() => {
        dispatch(fetchLoggedInUserFollowing());
        dispatch(fetchFollowingPosts());
        dispatch(fetchAllPosts());
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (post.id) {
      dispatch(fetchPostLikes(post.id));
    }
  }, [dispatch]);

  return (
    <div className="post-index-item-wrapper">
      <div className="avatar-area">
        <img src={stock} alt="Avatar" className="tiny-image" />
      </div>

      <div className="post-index-item">
        <Link className="postItem-title-bar" to="/">
          <div className="post-user-follow">
            <span className="title-bar-username">{post.user?.username}</span>
            {currentUser && !isOwnPost && !isCurrentUserFollowingPostUser && (
              <button
                className="follow-but"
                onClick={() => handleFollow(post.user?.id)}
              >
                Follow
              </button>
            )}
            {currentUser && !isOwnPost && isCurrentUserFollowingPostUser && (
              <button
                className="unfollow-but"
                onClick={() => handleUnfollow(post.user?.id)}
              >
                Unfollow
              </button>
            )}
          </div>
          <div className="post-index-item-menu">
            <ThreeDotsIcon />
          </div>
        </Link>

        <div className="">
          <div className="postItem-img-wrapper">
            {post.medias?.map((item, index) => (
              <div className="postItem-img" key={index}>
                {isLoading && (
                  <BeatLoader
                    color="#ffffff"
                    loading={isLoading}
                    css={override}
                    size={50}
                  />
                )}
                {item.media_url.endsWith("mp4") ? (
                  <video
                    controls
                    width="490"
                    height="360"
                    onLoadedData={() => setIsLoading(false)}
                  >
                    <source src={`${item.media_url}`} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    alt="image"
                    src={`${item.media_url}`}
                    onLoad={() => setIsLoading(false)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="post-item-content">
            <p>{post.content}</p>
          </div>
        </div>

        {currentUser && currentUser.id === post.user?.id && (
          <div className="postitem-delete-edit-wrapper">
            <OpenModalMenuItem
              itemType="delete_icon"
              // itemText="Delete"
              // onItemClick={closeMenu}
              modalComponent={<DeleteConfirmModal post={post} type="post" />}
            />
            <OpenModalMenuItem
              itemType="edit_icon"
              modalComponent={<EditPostForm post={post} />}
              // onItemClick={closeMenu}
              // i className="fas fa-pencil-alt fa-lg"
            />
          </div>
        )}

        <div className="postItem-tail-bar">
          <div className="post-item-notes">
            <span className="tail-bar-notes" onClick={toggleShowCommentArea}>
              {post.likes_count + post.comments_count} notes
            </span>
          </div>
          <div className="post-index-item-icons">
            {/* <button className='unused-but' onClick={handleReserveClick}>
                            <SharingIcon />
                        </button> */}
            <button className="unused-but" onClick={toggleShowCommentArea}>
              <CommentIcon />
            </button>
            {/* <button className='unused-but' onClick={handleReserveClick}>
                            <RePostIcon />
                        </button> */}
            <Likes post={post} />
          </div>
        </div>

        {showCommentArea && (
          <div className="post-index-comment-area">
            <div className="post-index-comment-area-header">
              <div className="svg-comments" onClick={showCommentTab}>
                <CommentIcon />
              </div>
              <div>{post.comments_count}</div>
              {/* <RePostIcon /> */}
              <div className="svg-likes" onClick={showLikeTab}>
                <LikeIcon />
              </div>
              <div>{post.likes_count}</div>
            </div>

            {commentAreaOption === "show_comments" && (
              <div>
                <div className="comment-form-wrapper">
                  <div>
                    <img
                      src={stock}
                      alt="Avatar"
                      className="comment-tiny-image"
                    />
                  </div>

                  {currentUser && (
                    <div>
                      {error && (
                        <div>
                          <p className="comment-error">{error}</p>
                        </div>
                      )}
                      <form
                        className="comment-form-container"
                        onSubmit={handleCommentSubmit}
                      >
                        <div className="comment-form-content">
                          <input
                            className="comment-submit"
                            type="text"
                            value={commentContent}
                            placeholder="Send something nice"
                            onChange={(e) => setCommentContent(e.target.value)}
                          />
                        </div>
                        <div>
                          <button className="comment-reply">Reply</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
                <div className="scrolldown-right">
                  {post.comments.map((item, index) => (
                    <div className="postItem-comment" key={index}>
                      <div>
                        <img
                          src={stock}
                          alt="Avatar"
                          className="comment-tiny-image"
                        />
                      </div>
                      <div>
                        {item.username}
                        <div>{item.content}</div>
                      </div>
                      {currentUser && currentUser.id === item.user_id && (
                        <div className="comment-delete-button">
                          <OpenModalMenuItem
                            itemType="edit_icon"
                            itemText="Delete"
                            // onItemClick={closeMenu}
                            modalComponent={<CommentEditModal comment={item} />}
                          />
                          <OpenModalMenuItem
                            itemType="delete_icon"
                            itemText="Delete"
                            // onItemClick={closeMenu}
                            modalComponent={
                              <DeleteConfirmModal
                                comment={item}
                                type="comment"
                              />
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {commentAreaOption === "show_likes" && (
              <div className="scrolldown-right">
                {post.likes.map((item, index) => (
                  <div className="postItem-like" key={index}>
                    <div>
                      <img
                        src={stock}
                        alt="Avatar"
                        className="comment-tiny-image"
                      />
                    </div>
                    <div>{item.username}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostIndexItem;
