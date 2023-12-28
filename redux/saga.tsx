import {all, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_CATEGORY_DETAIL,
  GET_LEVEL_DATA,
  SET_CATEGORY_NAME,
  SET_LEVEL_DATA,
  SET_SELECTED_CATEGORY,
  SET_YOGALIST,
  YOGA_LIST,
} from './constants';
import {api_url} from '../Components/ApiConstant';

function* yogaList(): any {
  const url = api_url;
  let data = yield fetch(`${api_url}/categories`);
  data = yield data.json();

  yield put({type: SET_YOGALIST, data});
}

function* getSelectedCategory(action: any): any {
  const selectedCategory = action.data;
  console.log('selectedCategory', selectedCategory);

  let details = yield fetch(`${api_url}/categories?name=${selectedCategory}`);
  let data = yield details.json();

  yield put({type: SET_SELECTED_CATEGORY, data});
  console.log('data got ', data);
}

function* getSelectedLevelPoses(action: any): any {
  const selectedLevel = action.data;
  console.log('selectedLevel', selectedLevel);

  let details = yield fetch(`${api_url}/poses?level=${selectedLevel}`);
  let data = yield details.json();

  yield put({type: SET_LEVEL_DATA, data});
  console.log('data got of poses ', data);
}
function* SagaData() {
  yield all([
    takeLatest(YOGA_LIST, yogaList),
    takeLatest(GET_CATEGORY_DETAIL, getSelectedCategory),
    takeLatest(GET_LEVEL_DATA, getSelectedLevelPoses),
  ]);
}
export default SagaData;
