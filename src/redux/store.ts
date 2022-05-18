import { createStore } from 'redux'
import languageReducer from "./language/languageReducer"

const store = createStore(languageReducer);

// ReturnType 内置高级类型，获取函数返回值类型
export type RootState = ReturnType<typeof store.getState>

export default store