import Google from "../../Settings/assets/images/Google.png"
import { Action, Button, GoogleBtn, removeItem, setItem } from "../../Settings";
import {useForm} from "react-hook-form"
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {signInWithPopup} from "firebase/auth"
import {GoogleProvider, auth} from "../../Settings/firebase/firebase.config"
import { Modal } from "./Modal";
import { FirebaseForm } from "./FirebaseForm";
export const ModalRegister = () => {
  const date = new Date()  
  const {focus_input, token, userFirebase, signModalFirebase} = useSelector(state => state.Reducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {mutate} = useMutation((data) => {
    axios.post(process.env.REACT_APP_SERVER + "/register", data).then(response => {
        if(response?.data){
            const {accessToken, user} = response.data
            if(accessToken){
                dispatch(Action.setToken(accessToken))
                dispatch(Action.setUser(user))
            }
        }
    })
  })
  const validationSchema = Yup.object({
    name: Yup.string().required("Name its required !"),
    lastname: Yup.string().required("Lastname its required !"),
    email: Yup.string().email("Email its invalid !").required("Email its required !"),
    password: Yup.string().min(3, "Min 3").max(15, "Min 15").required("Password its required !")
  })
  const {register, watch, formState:{errors, isValid}, handleSubmit } = useForm({
    defaultValues:{
        name: "",
        lastname: "",
        email: "",
        password: ""
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  })
  const onSubmit = (event) => {
    mutate({...event, date: date.toLocaleString().toString().concat(" Register at its user ")})
  }
  useEffect(() => {
    if(token){
        dispatch(Action.setModalSign(false))
        removeItem("loader")
        dispatch(Action.setLoader(true))
        setTimeout(() => {
            setItem("loader", "loader-end")
            dispatch(Action.setLoader(false))
            navigate("/")
        }, 1500)
    }
  },[token])  
  const handleGoogle = () => {
    signInWithPopup(auth, GoogleProvider).then(response => {
      dispatch(Action.setUserFirebase({
        name: response?.user?.displayName?.split(" ")[0],
        lastname: response?.user?.displayName?.split(" ")[1],
        email: response?.user?.email,
        password: null
      }))   
    }).catch(error => console.log(error)) 
  }
  useEffect(() => {
    if(userFirebase?.name){ 
        dispatch(Action.setModalSign(false))
        dispatch(Action.setModalSignFirebase(true))
      }
  },[userFirebase])
  watch()
  return (
    <div className="modal-form-box">
      <form onSubmit={handleSubmit(onSubmit)} className="modal-register-form">
        <div className="modal-input-box">
          <input
            {...register("name")}
            onFocus={() =>  dispatch(Action.setFocus({...focus_input, name: true})) }
            onBlur={() => dispatch(Action.setFocus({...focus_input, name: false}))}
            className={errors?.name ? "error-input": "default-input" }
            type="text"
            name="name"
            id="name"

          />
          <label htmlFor={`username`} className={`${watch()?.name?.length || focus_input?.name  ? `active-input`:  "" }`} style={{color: errors?.name ? "crimson": "#e2ad00"}}>{errors?.name ?  errors?.name?.message: "Name"}</label>
        </div>
        <div className="modal-input-box">
          <input
            {...register("lastname")}
            onFocus={() => dispatch(Action.setFocus({...focus_input, lastname: true}))}
            onBlur={() => dispatch(Action.setFocus({...focus_input, lastname: false}))}
            className={errors?.lastname ? "error-input": "default-input"}
            type="text"
            name="lastname"
            id="lastname"
          />
          <label style={{color: errors?.lastname? "crimson": "#e2ad00"}} htmlFor="userlastname" className={`${watch()?.lastname?.length || focus_input?.lastname ? "active-input": "" }`}>{errors?.lastname? errors.lastname.message : "Lastname"}</label>
        </div>
        <div className="modal-input-box">
          <input
            {...register("email")}
            onFocus={() => dispatch(Action.setFocus({...focus_input, email: true}))}
            onBlur={() => dispatch(Action.setFocus({...focus_input, email: false}))}
            className={errors?.email ? "error-input": "default-input"}
            type="email"
            name="email"
            id="email"
          />
          <label style={{color: errors?.email? "crimson": "#e2ad00"}} htmlFor="username-email" className={`${watch().email?.length || focus_input?.email ? "active-input": ""}`}>{errors?.email? errors?.email?.message: "Email"}</label>
        </div>
        <div className="modal-input-box">
          <input
            {...register("password")}
            onFocus={() => dispatch(Action.setFocus({...focus_input, password: true}))}
            onBlur={() => dispatch(Action.setFocus({...focus_input, password: false}))}
            className={errors?.password ? "error-input": "default-input" }
            type="password"
            name="password"
            id="password"
          />
          <label style={{color: errors?.password ? "crimson": "#e2ad00"}} htmlFor="username-password" className={`${watch()?.password?.length || focus_input?.password ? "active-input": ""}`}>{errors?.password?  errors?.password?.message: "Password"}</label>
        </div>
        <Button disabled={!isValid} className="modal-button"  type="yellow">Submit</Button>
        <GoogleBtn onClick={handleGoogle} type="button" style={{backgroundImage: `url(${Google})`}}>Goolge orqali kirish</GoogleBtn>
      </form>
    </div>
  );
};
