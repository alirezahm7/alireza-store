import UserActionTypes from './user.types';


export const googleSigninStart =()=>({
  type :UserActionTypes.GOOGLE_SIGNIN_START
})

export const SigninSuccess =user=>({
  type :UserActionTypes.SIGNIN_SUCCESS,
  payload: user
})

export const SigninFailure =error=>({
  type :UserActionTypes.SIGNIN_FAILURE,
  payload: error
})

export const emailSigninStart =emailAndPassword=>({
  type :UserActionTypes.EMAIL_SIGNIN_START,
  payload: emailAndPassword
})

export const checkUserSession=()=>({
  type: UserActionTypes.CHECK_USER_SESSION,

})

export const userSignoutStart=()=>({
  type: UserActionTypes.USER_SIGNOUT_START
})

export const userSignoutSuccess=()=>({
  type: UserActionTypes.USER_SIGNOUT_SUCCESS
})

export const userSignoutFailure=()=>({
  type: UserActionTypes.USER_SIGNOUT_FAILURE
})

export const userSignupStart=(userCredintoal)=>({

  type :UserActionTypes.USER_SIGNUP_START,
  payload :userCredintoal 
})

export const userSignupSuccess=(user ,additionalData)=>({

  type :UserActionTypes.USER_SIGNUP_SUCCESS,
  payload :{user ,additionalData}
})

export const userSignupFailue =(error)=>({
  type :UserActionTypes.USER_SIGNUP_FAILURE,
  pauload :error
})


