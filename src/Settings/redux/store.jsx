import { configureStore } from "@reduxjs/toolkit";
import { Combine } from "./combine";
export const store = configureStore({
    reducer: Combine
})