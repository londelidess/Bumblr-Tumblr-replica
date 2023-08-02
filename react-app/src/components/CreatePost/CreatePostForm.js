import PostForm from './PostForm'

const CreatePostForm= () =>{
    const post={
        content:'',
        medias:''
    }

return (
    <PostForm
    post={post}
    formType="Create Post"
    />
)
}