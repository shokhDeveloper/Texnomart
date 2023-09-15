import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Action } from "../../Settings"

export const LoginError = ({reset}) => {
    const {loginErrorText, loginError} = useSelector((state) => state.Reducer)
    const loginErrorTitle = useRef()
    const dispatch = useDispatch()
    let idx = 0
    const handleTyping = () => {
        try{
            if(loginErrorText.length > idx && loginError ){  
                loginErrorTitle.current.innerHTML += loginErrorText?.charAt(idx)
                idx++
                setTimeout(handleTyping, 100)
            }else{
                dispatch(Action.setUserLoginError(false))
                idx = 0
                reset({
                    email: "",
                    password: ""
                })
            }   
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        if(loginError){
            console.log(idx)
            handleTyping()    
            console.log(loginError)
        }
    },[loginError])
    return(
        <output>
            <h4 style={{color: "crimson"}} ref={loginErrorTitle}></h4>
        </output>
    )
}