import { put, takeLatest, all, call } from 'redux-saga/effects';
import {
  auth,
  createUserProfileDocument,
  getCurrentUser,
  googleProvider,
} from '../../firebase/firebase.utils';
import {
  SigninFailure,
  SigninSuccess,
  userSignoutFailure,
  userSignoutSuccess,
  userSignupFailue,
  userSignupSuccess,
} from './user.actions';
import UserActionTypes from './user.types';

export function* getSnapshotFormauth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(SigninSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(SigninFailure(error));
  }
}

export function* signinWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFormauth(user);
  } catch (error) {
    yield put(SigninFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFormauth(userAuth);
  } catch (error) {
    yield put(SigninFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(userSignoutSuccess());
  } catch (error) {
    put(userSignoutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    yield put(userSignupSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(userSignupFailue(error));
  }
}

export function* signinAfterSignup({ payload: { user, additionalData } }) {
  yield getSnapshotFormauth(user, additionalData);
}

export function* ongoogleSigninStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signinWithGoogle);
}

export function* signinWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFormauth(user);
  } catch (error) {
    yield put(SigninFailure(error));
  }
}

export function* emailSigninStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signinWithEmail);
}

export function* oncheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onsignoutStart() {
  yield takeLatest(UserActionTypes.USER_SIGNOUT_START, signOut);
}

export function* onsignupStart() {
  yield takeLatest(UserActionTypes.USER_SIGNUP_START, signUp);
}

export function* onsignupSuccess() {
  yield takeLatest(UserActionTypes.USER_SIGNUP_SUCCESS, signinAfterSignup);
}

export function* userSaga() {
  yield all([
    call(ongoogleSigninStart),
    call(emailSigninStart),
    call(isUserAuthenticated),
    call(onsignoutStart),
    call(onsignupStart),
    call(onsignupSuccess),
  ]);
}
