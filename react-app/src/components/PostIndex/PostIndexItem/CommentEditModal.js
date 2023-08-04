import { useModal } from "../../../context/Modal";
import './CommentEditModal.css';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { thunkDeletePostById, fetchFollowingPosts, fetchAllPosts } from '../../../store/post';
import { thunkRemoveComment, thunkEditComment } from '../../../store/comment';
import { fetchLoggedInUserFollowing } from "../../../store/follow";


function CommentEditModal({ comment }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [commentContent, setCommentContent] = useState(comment.content);

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    const handleCommentEdit = async (e) => {
        e.preventDefault();
        const comment_tobe_updated = { "content": commentContent };
        try {
            await dispatch(thunkEditComment(comment.id, comment_tobe_updated))
            await dispatch(fetchLoggedInUserFollowing());
            await dispatch(fetchFollowingPosts())
            await dispatch(fetchAllPosts());
            closeModal();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="delete-modal-wrapper">
            <div className="delete-modal-title">
                <h1>Edit Your Comment</h1>
            </div>
            <form onSubmit={handleCommentEdit}>
                <div className='comment-container'>
                    <input
                    className="edit-comment-input"
                        type="text"
                        value={commentContent}
                        placeholder='Send something nice'
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                </div>
                <div className="delete-modal-button-wrapper">
                    <button className="edit-comment-submit" >Save your comment</button>
                    {/* <button className="cancelDelete-button" onClick={handleCancel}>Cancel</button> */}
                </div>
            </form>


        </div>
    );
}

export default CommentEditModal;
