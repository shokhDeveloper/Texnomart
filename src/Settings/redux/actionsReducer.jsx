import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../Utils";

const initialState = {
    token: getItem("token") ? getItem("token") : null,
    user: getItem("user") ? JSON.parse(getItem("user")) : null,
    loader: getItem("loader") ? false : true,
    position: {
      latitude: null,
      longitude: null
    }
}
export const slice = createSlice({
  name: "texnomart",
  initialState,
  reducers: {
    setLoader(state, action){
        state.loader = action.payload
    },
    setPosition(state, action){
      state.position = {...action.payload}
    }
  }
})
export const Action = slice.actions
export const Reducer = slice.reducer