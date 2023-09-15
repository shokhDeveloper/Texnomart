import "./modal.scss"
import {useForm} from "react-hook-form"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import {yupResolver} from "@hookform/resolvers/yup"
import { Action, Button, removeItem } from "../../Settings"
import { useEffect } from "react"
import axios from "axios"
import { useMutation } from "react-query"
export const FirebaseForm = ({type}) => {
    const {firebaseForm, userFirebase, loginUser, token}  = useSelector((state) => state.Reducer)
    const dispatch = useDispatch()
    const date = new Date()
    const {mutate} = useMutation( async (data) => {
        const request = await axios.post(process.env.REACT_APP_SERVER + `/${type}`, data).catch(error => console.log(error))
        if(request?.status === 201 || request?.status === 200){
            const response = await request.data
            if(response){
                const {accessToken, user} = response
                dispatch(Action.setToken(accessToken))
                dispatch(Action.setUser(user))
                if(type === "login"){
                    dispatch(Action.signModalForFirebaseLogin(false))
                }else{
                    dispatch(Action.setModalSignFirebase(false))
                }
                removeItem("loader")
                dispatch(Action.setLoader(true))
            }
        }

    })
    const handleRegisterUser = async (userData) => {
        mutate({...userData, date: date.toLocaleString()})
    }
    const validationSchema = Yup.object({
        password: Yup.string().min(3, "Min 3").max(15, "Max 15").required("Password its required !")
    })
    const {register, watch, formState:{isValid, errors}, handleSubmit} = useForm({
        defaultValues: {
            "password": ""
        },
        mode: "all",
        resolver: yupResolver(validationSchema)
    })
    function onSubmit(event){
        if(type === "login"){
            dispatch(Action.setUserFirebaseLogin({...loginUser, password: event.password}))
        }else{
            dispatch(Action.setUserFirebasePassword({...userFirebase, password: event.password}))
        }
    }
    useEffect(() => {
        if(userFirebase?.password || loginUser?.password){
            handleRegisterUser(type === "login" ? loginUser: userFirebase)
        }
    },[userFirebase, loginUser])
    watch()
    return(
        <div style={{margin: 0}} className="modal-form-box">
            <form  onSubmit={handleSubmit(onSubmit)} className="modal-firebase-form">
                <div className="modal-input-box" >
                <input   {...register("password")} onFocus={() => dispatch(Action.setFormFirebasePasswordChange({password: true})) } onBlur={() => dispatch(Action.setFormFirebasePasswordChange({password: false}))} type="password" className={errors?.password ? "error-input": "default-input"} id="password" name="password"/>
                <label htmlFor="password" className={firebaseForm?.password || watch().password?.length ? "active-input": ""}>{errors?.password ? errors?.password?.message : "Password"}</label>
                </div>
                <Button disabled={!isValid} type="light">Yuborish</Button>
            </form>
        </div>
    )
}