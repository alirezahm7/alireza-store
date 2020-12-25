import { all, call, takeLatest,put } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearCartSignout(){
    yield put(clearCart());
}


export function* onSignoutSuccess(){
    yield takeLatest(UserActionTypes.USER_SIGNOUT_SUCCESS ,clearCartSignout)
}

export function* cartSaga(){
    yield all([call(onSignoutSuccess)])
}