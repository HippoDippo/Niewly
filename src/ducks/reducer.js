// Initial State
const initialState = { postID: 0 };

// Actions
const UPDATE_POST_ID = 'UPDATE_POST_ID';

// Action Creators
export function updatePostId(postID) {
  return {
    type: UPDATE_POST_ID,
    payload: postID
  };
}

// Reducer
export default function reducer(state=initialState, action) {
  switch (action.type) {
    case UPDATE_POST_ID:
      return {
        postID: action.payload
      };
    default:
      return state;
  }
}