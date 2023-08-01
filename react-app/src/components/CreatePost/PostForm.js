import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreatePost, thunkEditPost } from '../../store/post';

const PostForm = ({ post, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [content, setContent] = useState(post.content)
    const [media_file, setMedia_file] = useState(post.medias.media_url)
    const [validationErrors, setValidationErrors] = useState({})
    useEffect(() => {
        if (post) {
            setContent(post.content || '');
            setMedia_file(post.medias.media_url || '');
        }
    }, [post])
    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        if (!content) errors.country = 'Content field is required'
    }
    setValidationErrors(errors)
    if (Object.keys(errors).length === 0) {
        post = {
            ...post,
            content,
            media_file
        }
    }
    if (formType === "Create Post") {
        const newPost = dispatch(thunkCreatePost(post))
        history.push(`/posts/${post.id}`)
        if (post.validationErrors) {
            return setValidationErrors(newPost.validationErrors)
        }
    } if (formType === 'Update Post') {
        const editedPost = dispatch(thunkEditPost(post))
        post = editedPost
        history.push(`/posts/${spot.id}`)
        if (spot.validationErrors) {
            return setValidationErrors(editedPost.validationErrors)
        }
    }
    return (
        <div className='form-container'>
            <form className='create-post-form' onSubmit={handleSubmit}>
            {formType === 'Create Post' && (
                    <h1>Create a Post</h1>
                )}
                {formType === 'Update Post' && (
                    <h1>Update your Post</h1>
                )}
                
                {validationErrors.content ? <p className="errors">{validationErrors.content}</p> : ''}
                <input className='PostForm-content'
                placeholder='Whats on your mind?'
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className='Create-Form-Submit-btn'>
                <button className='Create-Post-Submit' type='submit'>{formType}</button>
                </div>
                </form>
                </div>
    )
}