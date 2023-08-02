import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreatePost } from '../../store/post';
import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";
const CreatePostForm = () => {
    const [content, setContent] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        if (!content) errors.country = 'Content field is required'

        const formData = new FormData()
        formData.append("content", content)
        await dispatch(thunkCreatePost(formData))
        setContent('');
        setValidationErrors([]);
        closeModal()

    }


useEffect(() => {
    const errors = [];
    if (!content.length) errors.push('Content field is required');
    setValidationErrors(errors);
}, [content])
return (
    <div className='form-container'>
        <form className='create-post-form' onSubmit={handleSubmit}>
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
export default CreatePostForm