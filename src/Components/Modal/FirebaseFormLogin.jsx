import "./modal.scss"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import {yupResolver} from "@hookform/resolvers/yup"
import axios from "axios"
import { Action, Button, removeItem } from "../../Settings"
import { useEffect } from "react"
export const FirebaseFormLogin = () => {
    const {loginUser, firebaseForm} = useSelector((state) => state.Reducer)
    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        password: Yup.string().min(3, "Min 3").max(15, "Max 15").required("Password its required !")
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit, reset} = useForm({
        defaultValues: {
            "password": ""
        },
        mode: "all",
        resolver: yupResolver(validationSchema)
    })
    const onSubmit = async (event) => {
        dispatch(Action.setLoginUser({...loginUser, password: event.password}))
    }
    useEffect(() => {
        if(loginUser?.password){
            ;(async function(){
                const request = await axios.post(process.env.REACT_APP_SERVER + "/login", loginUser).catch(error => console.log(error))
                if(request?.status === 200){
                    const {accessToken, user} = await request.data
                    if(accessToken){
                        dispatch(Action.setToken(accessToken))
                        dispatch(Action.setUser(user))
                        dispatch(Action.signModalForFirebaseLogin(false))
                        removeItem("loader")
                        window.location.reload()
                    }    
                }
            }())
        }
    },[loginUser])
    return(
        <div style={{margin: 0}} className="modal-form-box">
        <form  onSubmit={handleSubmit(onSubmit)} className="modal-firebase-form">
            <div className="modal-input-box" >
            <input  {...register("password")} onFocus={() => dispatch(Action.setFormFirebasePasswordChange({password: true})) } onBlur={() => dispatch(Action.setFormFirebasePasswordChange({password: false}))} type="password" className={errors?.password ? "error-input": "default-input"} id="password" name="password"/>
            <label htmlFor="password" className={firebaseForm?.password || watch().password?.length ? "active-input": ""}>{errors?.password ? errors?.password?.message : "Password"}</label>
            </div>
            <Button disabled={!isValid} type="light">Yuborish</Button>
        </form>
    </div>
    )
}