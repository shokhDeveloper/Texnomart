import { useEffect } from "react"
import { useNavigate } from "react-router"

export const useBack = (type) => {
    const navigate = useNavigate()
    const handleKey = (event) => {
        if(event.keyCode === 27){
            navigate(-1)
        }
     }
    useEffect(() => {
        window.addEventListener("keyup", handleKey)
        return () => window.removeEventListener("keyup", handleKey)
    },[])
    return "Good Back"
}