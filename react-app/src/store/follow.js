// Constants
const SET_LOGGED_IN_USER_FOLLOWING = "follows/SET_LOGGED_IN_USER_FOLLOWING";
const SET_USER_FOLLOWING = "follows/SET_USER_FOLLOWING";
// const ADD_FOLLOW = "follows/ADD_FOLLOW";
// const REMOVE_FOLLOW = "follows/REMOVE_FOLLOW";

// Action Creators
const setLoggedInUserFollowing = (users) => ({
  type: SET_LOGGED_IN_USER_FOLLOWING,
  users,
});

const setUserFollowing = (users) => ({
  type: SET_USER_FOLLOWING,
  users,
});

// const addFollow = (user) => ({
//   type: ADD_FOLLOW,
//   user,
// });

// const removeFollow = (userId) => ({
//   type: REMOVE_FOLLOW,
//   userId,
// });

export const fetchLoggedInUserFollowing = () => async (dispatch) => {
  const response = await fetch(`/api/follows/following`);
  if (response.ok) {
    const users = await response.json();
    dispatch(setLoggedInUserFollowing(users));
  } else {
    throw new Error(
      "Failed to fetch the users the logged-in user is following."
    );
  }
};

export const fetchUserFollowing = (userId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${userId}/following`);
  if (response.ok) {
    const users = await response.json();
    dispatch(setUserFollowing(users));
  } else {
    throw new Error("Failed to fetch the users a specific user is following.");
  }
};

export const thunkAddFollow = (userId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${userId}`, { method: "POST" });
  const data = await response.json();

  if (response.ok) {
    // dispatch(addFollow(data));
    dispatch(fetchLoggedInUserFollowing());
  } else {
    throw new Error(data.error || "Failed to follow the user.");
  }
};

export const thunkRemoveFollow = (userId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${userId}`, { method: "DELETE" });
  const data = await response.json();

  if (response.ok) {
    // dispatch(removeFollow(userId));
    dispatch(fetchLoggedInUserFollowing());
  } else {
    throw new Error(data.error || "Failed to unfollow the user.");
  }
};

const initialState = {
  loggedInUserFollowing: [],
  userFollowing: [],
};

export default function followsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED_IN_USER_FOLLOWING:
      return {
        ...state,
        loggedInUserFollowing: action.users,
      };
    case SET_USER_FOLLOWING:
      return {
        ...state,
        userFollowing: action.users,
      };
    //   case ADD_FOLLOW:
    //     return {
    //       ...state,
    //       loggedInUserFollowing: [...state.loggedInUserFollowing, action.user],
    //       userFollowing: [...state.userFollowing, action.user],
    //     };
    //   case REMOVE_FOLLOW:
    //     return {
    //       ...state,
    //       loggedInUserFollowing: state.loggedInUserFollowing.filter(user => user.id !== action.userId),
    //       userFollowing: state.userFollowing.filter(user => user.id !== action.userId),
    //     };
    default:
      return state;
  }
}
