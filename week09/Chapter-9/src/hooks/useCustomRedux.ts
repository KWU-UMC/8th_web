import { useSelector as useDefaultSelector } from "react-redux";
import {
  TypedUseSelectorHook,
  useDispatch as useDefaultDispatch,
} from "react-redux";
import { AppDispatch } from "../store/store.ts";
import { RootState } from "../store/store.ts";
export const useDispatch: () => AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
