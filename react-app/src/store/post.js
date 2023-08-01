// Constants
const SET_ALL_POSTS = "posts/SET_POSTS";
const ADD_POST = "posts/ADD_POST";
const REMOVE_POST = "posts/REMOVE_POST";
const SET_POST = "posts/SET_POST";
const UPDATE_POST = "posts/UPDATE_POST";

// Action Creators
const setPosts = (posts) => ({
  type: SET_ALL_POSTS,
  posts,
});

const setPost = (post) => ({
  type: SET_POST,
  post,
});

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

const updatePostAction = (post) => ({
  type: UPDATE_POST,
  post,
});

const removePost = (postId) => ({
  type: REMOVE_POST,
  postId,
});

export const fetchAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/all");
  if (response.ok) {
    const { posts } = await response.json();
    dispatch(setPosts(posts));
  }
};

export const fetchCurrentPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/current");
  if (response.ok) {
    const { posts } = await response.json();
    dispatch(setPosts(posts));
  }
};

export const fetchPostById = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const { post } = await response.json();
    dispatch(setPost(post));
  }
};

export const thunkCreatePost = (content) => async (dispatch) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to create the post.');
    }

    const { post } = await response.json();
    dispatch(addPost(post));
  };

  export const thunkEditPost = (postId, content) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to update the post.');
    }

    const { updatedPost } = await response.json();
    dispatch(updatePostAction(updatedPost));
  };

  export const thunkDeletePostById = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error('Failed to delete the post.');
    }

    dispatch(removePost(postId));
  };



const initialState = {
    allPosts:{},
    currentPosts:{},
    singlePost:{}
};

export default function postsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ALL_POSTS:
            // newState = { ...state };
            // action.posts.forEach(post => {
            //     newState[post.id] = post;
            // });
            // return newState;
            newState
    // {
    // postId1: { ...post1Details },
    // postId2: { ...post2Details },
    //}

    case SET_POST:
      return { ...state, [action.post.id]: action.post };
    case ADD_POST:
      return { ...state, [action.post.id]: action.post };
    case UPDATE_POST:
      return { ...state, [action.post.id]: action.post };
    case REMOVE_POST:
      newState = { ...state };
      delete newState[action.postId];
      return newState;
    default:
      return state;
  }
}
