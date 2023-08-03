import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreatePost } from '../../store/post';
import { thunkAddMediaToPost } from '../../store/media';
import { useModal } from '../../context/Modal';
import "./CreatePostForm.css"

    const CreateMediaForm = () => {
        const [content, setContent] = useState('');
        const [media_file, setMedia_file] = useState('');
        const [validationErrors, setValidationErrors] = useState([]);
        const [showMenu, setShowMenu] = useState(false);
        const dispatch = useDispatch();
        const history = useHistory();
        const {closeModal} = useModal()
        const [mediaFile, setMediaFile] = useState(null);
        const handleSubmit = async (e) => {
            e.preventDefault()
            let errors = {}
            if (!content) errors.content = 'Content field is required'

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
            closeModal();
        }
        useEffect(() => {
            const errors = [];
            if (!content.length) errors.push("Please enter a post caption!");
            setValidationErrors(errors);
        },[content])

        const handleFileChange = (e) => {
            // Get the selected file
            const file = e.target.files[0];
            setMediaFile(file);

            // Do any other handling of the selected file, e.g., upload to server, etc.
        };


return (
    <div className='form-container'>
            <form className='create-post-form' onSubmit={handleSubmit}
            encType="multipart/form-data" >
                <div className='media-input'>
                <label className="Post-Media-input" htmlFor="image">
                    Upload Images
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            {/* Display the selected image */}
            {mediaFile && (
                <div className="selected-file">
                    Selected Image: {mediaFile.name}
                </div>
            )}
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
