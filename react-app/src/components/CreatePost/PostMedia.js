import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreatePost } from '../../store/post';
import { useModal } from '../../context/Modal';
    const CreateMediaForm = () => {
        const [content, setContent] = useState('');
        const [media_file, setMedia_file] = useState('');
        const [validationErrors, setValidationErrors] = useState([]);
        const dispatch = useDispatch();
        const history = useHistory();
        const {closeModal} = useModal()

        const handleSubmit = async (e) => {
            e.preventDefault()
            let errors = {}
            if (!content) errors.country = 'Content field is required'

            const formData = new FormData()
            formData.append("content", content)
            formData.append("media_file", media_file)
            
            await dispatch(thunkCreatePost(formData))
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
return (
    <div className='form-container'>
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
                            accept="image/*"
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