// Initial State
const initialState = { userID: 0, postID: 0 };

// Actions
const UPDATE_USER_ID = 'UPDATE_USER_ID';
const UPDATE_POST_ID = 'UPDATE_POST_ID';

// Action Creators
export function updateUserId(userID) {
  return {
    type: UPDATE_USER_ID,
    payload: userID
  };
}

export function updatePostId(postID) {
  return {
    type: UPDATE_POST_ID,
    payload: postID
  };
}

// Reducer
export default function reducer(state=initialState, action) {
  switch (action.type) {
    case UPDATE_USER_ID:
      return {
        userID: action.payload
      };
    case UPDATE_POST_ID:
      return {
        postID: action.payload
      };
    default:
      return state;
  }
}