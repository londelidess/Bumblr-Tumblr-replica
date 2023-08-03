import { useModal } from "../../context/Modal";
import './DeleteConfirmModal.css';
import { useDispatch } from 'react-redux';
import { thunkDeletePostById, fetchFollowingPosts, fetchAllPosts } from '../../store/post';
import { thunkRemoveComment } from '../../store/comment';
import { fetchLoggedInUserFollowing } from "../../store/follow";
import { thunkDeleteMedia } from '../../store/media'


function DeleteConfirmModal({ comment, post, type }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    const handleDeleteComment = async (commentId) => {
        try {
            dispatch(thunkRemoveComment(commentId)).then(() => {
                dispatch(fetchLoggedInUserFollowing());
                dispatch(fetchFollowingPosts());
                dispatch(fetchAllPosts());
            });
            closeModal();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeletePost = async (post) => {
        try {
            dispatch(thunkDeletePostById(post)).then(() => {
                dispatch(fetchLoggedInUserFollowing());
                dispatch(fetchFollowingPosts());
                dispatch(fetchAllPosts());
            });
            closeModal();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="delete-modal-wrapper">
            <div className="delete-modal-title">
                <h1>Confirm Delete</h1>
            </div>
            <div className="delete-confirm-text">
                <p>Are you sure you want to delete this {type} ?</p>
            </div>
            <div className="delete-modal-button-wrapper">
                {type === 'comment' && <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>Yes (Delete {type})</button>}
                {type === 'post' && <button className="delete-button" onClick={() => handleDeletePost(post)}>Yes (Delete {type})</button>}
                <button className="cancelDelete-button" onClick={handleCancel}>No (Keep {type})</button>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;
