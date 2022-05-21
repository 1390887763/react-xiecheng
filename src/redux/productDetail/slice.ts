import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface ProductDetailState {
    loading: boolean,
    error: string | null,
    data: any
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
}

export const getProductDetail = createAsyncThunk(
    // 命名空间 / action
    "productDetail/getProductDetail",
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        // 返回promise 为了满足 createAsyncThunk
        return data;
    }
)

/*
1. 这里的reducer = reducer + action，不需要定义action
2. 这里的reducer是对象，不是过程；每个对象对应一个 action，也对应这个action的处理函数
3. 不需要写 switch 语句
*/

export const productDetailState = createSlice({
    name: "productDatail",
    initialState,
    // 同步 reducer
    reducers: {

    },
    // 异步 reducer
    // 现在的映射是通过 RTK 自动完成的
    extraReducers: {

        [getProductDetail.pending.type]: (state) => {
            // return {...state, loading: true} 正常写法
            state.loading = true
        },

        [getProductDetail.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null
        },
        [getProductDetail.rejected.type]: (state, action:PayloadAction<string | null> ) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})
