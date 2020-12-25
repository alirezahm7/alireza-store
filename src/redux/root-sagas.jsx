import {all ,call} from 'redux-saga/effects';
import { cartSaga } from './cart/cart.saga';
import { fetchCollectionStart, shopSaga } from './shop/shop.saga';
import { userSaga } from './user/user.saga';


export default function* rootSagas(){
    yield all([
        call(fetchCollectionStart) ,call(userSaga) ,call(cartSaga) ,call(shopSaga)
    ])
}