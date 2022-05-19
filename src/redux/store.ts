import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from "./language/languageReducer"
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';

// 捆绑全部的reducer
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer
})

const store = configureStore({
    reducer: rootReducer,
});

// ReturnType 内置高级类型，获取函数返回值类型
export type RootState = ReturnType<typeof store.getState>

export default store