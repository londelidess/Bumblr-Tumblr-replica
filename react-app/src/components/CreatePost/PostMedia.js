import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreatePost, fetchAllPosts } from '../../store/post';
import { thunkAddMediaToPost } from '../../store/media';
import { useModal } from '../../context/Modal';
import "./CreatePostForm.css"

const CreateMediaForm = () => {
    const [content, setContent] = useState('');
    const [media_file, setMedia_file] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()

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

            const postData = await dispatch(thunkCreatePost(formData));
            if (media_file) {
                await dispatch(thunkAddMediaToPost(postData.id, media_file));
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
        //     if (content.length < 5 || content.length > 2000) errors.content = 'Content text must be more than 5 characters and less than 2000'
        //     setValidationErrors(errors);
        // },[content])
return (
    <div className='form-container'>
            <form className='create-post-form' onSubmit={handleSubmit}
                encType="multipart/form-data" >
                <div className='media-input'>
                    {/* <label
                            className="Post-Media-input"
                            htmlFor='image'
                        >
                            Upload Images
                        </label> */}
                    <input
                        className='Post-Media-input'
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
export default CreateMediaForm
