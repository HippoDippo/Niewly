// Initial State
const initialState = { userID: 0, postID: 0, backBtnRoute: '' };

// Actions
const UPDATE_USER_ID = 'UPDATE_USER_ID';
const UPDATE_POST_ID = 'UPDATE_POST_ID';
const UPDATE_BACK_BUTTON_ROUTE = 'UPDATE_BACK_BUTTON_ROUTE';

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

export function updateBackBtnRoute(backBtnRoute) {
  return {
    type: UPDATE_BACK_BUTTON_ROUTE,
    payload: backBtnRoute
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
    case UPDATE_BACK_BUTTON_ROUTE:
      return {
        backBtnRoute: action.payload
      };
    default:
      return state;
  }
}