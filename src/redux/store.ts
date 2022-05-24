// configureStore:配置store，combineReducers：捆绑reducer，applyMiddleware：应用中间件
import { createStore } from "redux"
import { configureStore, applyMiddleware, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import languageReducer from "./language/languageReducer"
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';
import { actionLog } from "./middlewares/actionLog"
import { productDetailState } from "../redux/productDetail/slice"
import { searchSlice } from "../redux/search/slice"
import { userSlice } from "../redux/user/slice"
import { shoppingCartSlice } from "../redux/shoppingCart/slice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"


const persistConfig = {
    key: "root", // 代表数据的根目录
    storage,  // 代表数据的保持方式，默认为 localStorage
    whitelist: ["user"] // 白名单列表：保存user reducer中的数据
}

// 捆绑全部的reducer
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailState.reducer,
    productSearch: searchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// ** 普通 store
// applyMiddlewares的作用：它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

// ** RTK store
// configureStore默认开启 thunk 中间件
const store = configureStore({
    reducer: persistedReducer,
    middleware: ((getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false}).concat(actionLog)),
    devTools: true,
})

const persistor = persistStore(store)

// ReturnType 内置高级类型，获取函数返回值类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default { store, persistor }