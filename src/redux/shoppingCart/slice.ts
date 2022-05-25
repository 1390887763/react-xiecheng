import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface ShoppingCartState {
    loading: boolean,
    error: string | null,
    items: any[],
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
}

// 获取购物车 action
export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`
                }
            }
        );
        return data.shoppingCartItems;
    }
)

// 添加购物车
export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters:{ jwt: string, touristRouteId: string }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
        return data.shoppingCartItems;
    }
)

// 结算
export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/checkout`,
            null,
            {
                headers: {
                    Authorization: `bearer ${jwt}`
                }
            }
        );
        return data;
    }
)

// 清空购物车
export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters:{ jwt: string, itemIds: number[] }, thunkAPI) => {
        return await axios.delete(
            `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
    }
)

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: {
        // getShopping
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null
        },
        [getShoppingCart.rejected.type]: (state, action:PayloadAction<string | null> ) => {
            state.loading = false;
            state.error = action.payload
        },

        // addShoppingCartItem
        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null
        },
        [clearShoppingCartItem.rejected.type]: (state, action:PayloadAction<string | null> ) => {
            state.loading = false;
            state.error = action.payload
        },

        // clearShoppingCartItem
        [clearShoppingCartItem.pending.type]: (state) => {
            state.loading = true
        },
        [clearShoppingCartItem.fulfilled.type]: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null
        },
        [getShoppingCart.rejected.type]: (state, action:PayloadAction<string | null> ) => {
            state.loading = false;
            state.error = action.payload
        },

        // checkout
        [checkout.pending.type]: (state) => {
            state.loading = true
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.items = [];
            state.loading = false;
            state.error = null
        },
        [checkout.rejected.type]: (state, action:PayloadAction<string | null> ) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})
