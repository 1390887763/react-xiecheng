// configureStore:配置store，combineReducers：捆绑reducer，applyMiddleware：应用中间件
import { createStore } from "redux"
import { configureStore, applyMiddleware, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import languageReducer from "./language/languageReducer"
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';
import { actionLog } from "./middlewares/actionLog"
import { productDetailState } from "../redux/productDetail/slice"
import { searchSlice } from "../redux/search/slice"


// 捆绑全部的reducer
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailState.reducer,
    productSearch: searchSlice.reducer,
})

// ** 普通 store
// applyMiddlewares的作用：它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

// ** RTK store
// configureStore默认开启 thunk 中间件
const store = configureStore({
    reducer: rootReducer,
    middleware: ((getDefaultMiddleware) => 
        getDefaultMiddleware().concat(actionLog)),
    devTools: true,
})


// ReturnType 内置高级类型，获取函数返回值类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store