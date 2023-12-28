import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import SagaData from './saga';
import rootReducer from './rootReducer';

const sagaMiddleWare = createSagaMiddleWare();
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(SagaData);
export default store;
