import {
  GET_CATEGORY_DETAIL,
  GET_LEVEL_DATA,
  SET_CATEGORY_NAME,
  SET_LEVEL_DATA,
  SET_LEVEL_NAME,
  SET_SELECTED_CATEGORY,
  YOGA_LIST,
} from './constants';
export function getYogaList() {
  return {
    type: YOGA_LIST,
  };
}

export function setCategoryName(item: any) {
  return {
    type: SET_CATEGORY_NAME,
    data: item,
  };
}

export function getCategortDetail(item: any) {
  return {
    type: GET_CATEGORY_DETAIL,
    data: item,
  };
}

export function setLevelName(item: any) {
  return {
    type: SET_LEVEL_NAME,
    data: item,
  };
}

export function getlevelData(item: any) {
  return {
    type: GET_LEVEL_DATA,
    data: item,
  };
}
