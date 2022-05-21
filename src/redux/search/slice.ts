import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"


interface searchState {
    loading: boolean,
    data: any,
    error: string | null,
    pagination: any
}

const initialState: searchState = {
    loading: true,
    data: null,
    error: null,
    pagination: null
}

export const searchProduct = createAsyncThunk(
    "productDetail/getProductDetail",
    async (
        paramaters: {
            keywords: string,
            nextPage: number | string,
            pageSize: number | string,
        }, 
        thunkAPI) => {
            let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
            if (paramaters.keywords) {
               url += `&keyword=${paramaters.keywords}`;
            }
            // 因为需要header中的数据，注意这里的返回形式
            const response = await axios.get(url)
            return {
                data: response.data,
                pagination: JSON.parse(response.headers["x-pagination"])
            }
        }
)

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: (state) => {
            state.loading = true
        },
        [searchProduct.fulfilled.type]: (state,action) => {
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [searchProduct.rejected.type]: (
            state,
            action: PayloadAction<string | null>
          ) => {
            //   const ddd = action.payload;
            state.loading = false;
            state.error = action.payload;
          },
    }
})