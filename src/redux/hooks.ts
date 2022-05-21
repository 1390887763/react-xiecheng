import { useDispatch } from "react-redux"
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux"
import { RootState, AppDispatch } from "./store"

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()