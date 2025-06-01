import {
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux"; // ✅ type-only import

import type { AppDispatch, RootState } from "../store/store";

export const useAppDispatch = () => useDefaultDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useDefaultSelector;
