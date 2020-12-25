import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionTypes.USER_SIGNOUT_SUCCESS:
      return{
        ...state,
        currentUser:null,
        error:null
      }  
    case UserActionTypes.USER_SIGNOUT_FAILURE:  
    case UserActionTypes.SIGNIN_FAILURE:  
    case UserActionTypes.USER_SIGNUP_FAILURE: 
      return{
        ...state,
        error :action.payload
      }
 
    default:
      return state;
  }
};

export default userReducer;
