import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllPosts, thunkEditPost, fetchFollowingPosts } from '../../store/post';
import { thunkAddMediaToPost, thunkDeleteMedia } from '../../store/media';
import { useModal } from '../../context/Modal';
import DeleteIcon from '../IconCollection/DeleteIcon';
const EditPostForm = ({ post }) => {
    const [content, setContent] = useState(post.content);
    const [media_file, setMedia_file] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const [rerender, setRerender] = useState(1);

    const handleMediaDelete = async (mediaId) => {
        console.log(mediaId)
        await dispatch(thunkDeleteMedia(mediaId));
        await dispatch(fetchFollowingPosts())
        await dispatch(fetchAllPosts());
        setRerender(prevState => prevState + 1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        if (!content) {
            errors.content = 'Content field is required';
          } else if (content.length < 5 || content.length > 2000) {
            errors.content = 'Content text must be more than 5 characters and less than 2000';
          }
        if (Object.keys(errors).length === 0) {

        const formData = new FormData()
        formData.append("content", content)
        formData.append("media_file", media_file)

        const postData = await dispatch(thunkEditPost(post.id, formData));
        if (media_file) {
            await dispatch(thunkAddMediaToPost(post.id, media_file));
        }
        setContent('');
        setMedia_file('');
        setValidationErrors([]);
        await dispatch(fetchAllPosts())
        closeModal();
    }else{
        setValidationErrors(errors)    
    }
}

    // useEffect(() => {
    //     const errors = [];
    //     if (!content.length) errors.push("Content field is required");
    //     setValidationErrors(errors);
    // }, [content])

    return (
        <div className='form-container' key={rerender}>
            {
                post.medias.map((media, index) => (
                    <div key={media.id}>
                        <div>Media of index {index}</div>
                        <DeleteIcon onClick={() => handleMediaDelete(media.id)}/>
                    </div>
                ))
            }

            <form className='create-post-form' onSubmit={handleSubmit}
                encType="multipart/form-data" >
                <div className='media-input'>
                    <label
                        className="Post-Media-input"
                        htmlFor='image'
                    >
                        Upload Images
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*, .mp4"
                        onChange={(e) => setMedia_file(e.target.files[0])}
                    >
                    </input>
                </div>

                {validationErrors.content ? <p className="errors">{validationErrors.content}</p> : ''}
                <input className='PostForm-content'
                    placeholder='Whats on your mind?'
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className='Create-Form-Submit-btn'>
                    <button className='Create-Post-Submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default EditPostForm
