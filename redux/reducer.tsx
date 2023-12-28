import {
  GET_LEVEL_DATA,
  SET_CATEGORY_NAME,
  SET_LEVEL_DATA,
  SET_LEVEL_NAME,
  SET_SELECTED_CATEGORY,
  SET_YOGALIST,
} from './constants';

const initialState: any = {
  categoryList: [],
  currentCategory: '',
  selectedCategoryData: [],
  levelName: '',
  levelData: [],
};
export const reducer = (
  state = initialState,
  action: {
    data: any;
    type: any;
  },
) => {
  console.log('actions:', action.data);
  switch (action.type) {
    case SET_YOGALIST:
      return {...state, categoryList: action.data};
    case SET_CATEGORY_NAME:
      return {...state, currentCategory: action.data};
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategoryData: {
          ...action.data,
          poses: [
            {key: 'space_item'},
            ...action.data.poses,
            {key: 'space_item'},
          ],
        },
      };
    case SET_LEVEL_NAME:
      return {...state, levelName: action.data};
    case GET_LEVEL_DATA:
      return {...state, levelName: action.data};
    case SET_LEVEL_DATA:
      return {...state, levelData: action.data};
    default:
      return state;
  }
};
