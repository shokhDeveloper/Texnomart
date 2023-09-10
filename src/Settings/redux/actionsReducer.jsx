import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../Utils";

const initialState = {
    token: getItem("token") ? getItem("token") : null,
    user: getItem("user") ? JSON.parse(getItem("user")) : null,
    loader: getItem("loader") ? false : true,
    swiperHeroArray: [],
    position: {
      latitude: null,
      longitude: null
    },
    catalog: false,
    catalogTime: false,
    catalogsArrayNumber: [],
    catalogNumber: 0,
    topDisplay: false,
    headerActive: false,
    carouselButton: null,
    sign_modal: false,
    focus_input: {
      name: false,
      lastname: false,
      email: false,
      password: false
    },
    shoppingModal: false
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
    },
    setCatalog(state, action){
      state.catalog = action.payload
    },
    setCatalogTime(state, action){
      state.catalogTime = action.payload
    },
    setCatalogsNumber(state, action){
      try{
        const titlesObject = action.payload.map(item => {
          return{
            title: item?.title
          }
        })
        state.catalogsArrayNumber = titlesObject 
      }catch(error){
        state.catalogsArrayNumber = error
      }
    },
    setCatalogNumber(state, action){
      state.catalogNumber = action.payload
    },
    setTopDisplay(state, action){
      state.topDisplay = action.payload
    },
    setHeaderActive(state, action){
      state.headerActive = action.payload
    },
    setCarouselButton(state, action){
      state.carouselButton = action.payload
    },
    setModalSign(state, action){
      state.sign_modal = action.payload
    },
    setFocus(state, action){
      state.focus_input = action.payload
    },
    setToken(state, action){
      try{
        if(action.payload){
          state.token = action.payload
          setItem("token", state.token)
        }
      }catch(error){
        state.token = error
      }
    },
    setUser(state, action){
      try{
        if(typeof action.payload === "object"){
          state.user = action.payload
          setItem("user", state.user)
        }
      }catch(error){
        state.user = error
      }
    },
    setShoppingModal(state, action){
      state.shoppingModal = action.payload
    }
    }
})
export const Action = slice.actions
export const Reducer = slice.reducer