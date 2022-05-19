import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import axios from "axios"

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START" // 正在调用推荐信息API
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS" // 推荐信息API调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL" // 推荐信息API调用失败

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL
    payload: any
}

// 混合以上action，方便在reducer中使用
export type RecommendProductAction =
    FetchRecommendProductsStartAction |
    FetchRecommendProductsSuccessAction |
    FetchRecommendProductsFailAction

export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}
// data 为 API 成功返回的数据
export const fetchRecommendProductsSuccessActionCreator = (data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}
export const fetchRecommendProductsFailActionCreator = (error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}

// -Axios-Action-给我数据
// ThunkAction<R,S,E,A> R:返回值，S:State，E:extra 定义action中额外的参数，A:Action类型
export const giveMeDataActionCreator = ():ThunkAction<
    void,
    RootState, 
    unknown,
    RecommendProductAction 
> => async (dispatch, getState) => {
    dispatch(fetchRecommendProductsStartActionCreator)
    try {
      const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections')
      dispatch(fetchRecommendProductsSuccessActionCreator(data))
    } catch (error:any) {
      dispatch(fetchRecommendProductsFailActionCreator(error.message))
    }
}