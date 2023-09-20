import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../Utils";

const initialState = {
    token: getItem("token") ? getItem("token") : null,
    user: getItem("user") ? JSON.parse(getItem("user")) : null,
    loader: getItem("loader") ? false : true,
    tovarLocals: getItem("tovarLocals") ? JSON.parse(getItem("tovarLocals")): [],
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
    shoppingModal: false,
    userFirebase: {
      name: null,
      lastname: null,
      email: null,
      password: null
    },
    signModalFirebase: false,
    fireBaseForm: {
      password: false
    },
    firebaseLogin: {
      email: false,
      password: false
    },
    loginError: false,
    loginErrorText: "Bunday user server da mavjud emas !",
    loginUser:{
      email: null,
      password: null 
    },
    signModalForFirebaseLogin: false,
    price_All: 0,
    countTovar: 0,
    userProfile: [],
    updateProfile: false,
    userProfileData:{
      name: false,
      lastname: false,
      email: false,
      password: false
    },
    successUpdate: false,
    successText: "Profile ma'lumotlari muvaffaqiyatli yangilandi hurmatli "
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
    },
    setLike(state, action){
      if(state.tovarLocals.length){
        if(!state.tovarLocals?.some(item => item.id === action.payload.id)){
          state.tovarLocals.push(action.payload)
          setItem("tovarLocals", state.tovarLocals)
        }
      }else{
        state.tovarLocals.push(action.payload)
        setItem("tovarLocals", state.tovarLocals)
      }
    },
    setNotLike(state, action){
      state.tovarLocals = action.payload
      setItem("tovarLocals", state.tovarLocals)
    },
    setUserFirebase(state, action){
      state.userFirebase = action.payload
    },
    setModalSignFirebase(state, action){
     state.signModalFirebase = action.payload  
    },
    setFormFirebasePasswordChange(state, action){
      state.fireBaseForm = {...action.payload}
    },
    setUserFirebasePassword(state, action){
      state.userFirebase = action.payload
    },
    setFireBaseLogin(state, action){
      state.firebaseLogin = action.payload
    },
    setUserLoginError(state, action){
      state.loginError = action.payload
    },
    setLoginUser(state, action){
      state.loginUser = action.payload
    },
    signModalForFirebaseLogin(state, action){
      state.signModalForFirebaseLogin = action.payload
    },
    setUserFirebaseLogin(state, action){
      state.loginUser = action.payload
    },
    setPriceAll(state, action ){
      state.price_All = action.payload
    },
    setTovarAdd(state, action){
      state.price_All += action.payload
    },
    setTovarTake(state, action){
      state.price_All -= action.payload
    },
    setCountTovar(state, action){
      state.countTovar = action.payload
    },
    setUserProfile(state, action){
      state.userProfile = action.payload
    },
    setUpdateProfile(state, action){
      state.updateProfile = action.payload
    },
    setUpdateProfileData(state, action){
      state.userProfileData = action.payload
    },
    setSuccessUpdateProfileData(state, action){
      state.successUpdate = action.payload
    }
    }
})
export const Action = slice.actions
export const Reducer = slice.reducer