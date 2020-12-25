import { takeLatest, call, put ,all } from 'redux-saga/effects';
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from '../../firebase/firebase.utils';
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from './shop.action';
import ShopActionTypes from './shop.type';

export function* fetchCollectionsAsync() {
  yield console.log('i am a saga function');

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap =yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.messages));
  }
}

// return dispatch=>{
//     const collectionRef = firestore.collection('collections');
//     dispatch(fetchCollectionsStart());

//     collectionRef.get().then(snapShot=>{
//       const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
//       dispatch(fetchCollectionsSuccess(collectionsMap))
// })
// .catch(error=> dispatch(fetchCollectionsFailure(error.message)))

// }

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}


export function* shopSaga(){
  yield all([call(fetchCollectionStart)])
}