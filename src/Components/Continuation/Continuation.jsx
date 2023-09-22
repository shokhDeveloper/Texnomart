import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Api} from "../../Settings/Api"
export const Continuation = () => {
    const {continuation , token} = useSelector((state) => state.Reducer)
    const dispatch = useDispatch()
    const {getContinuation} = Api
    const handleGetBlog = useCallback( async () => {
        if(continuation || token){
            const request = await getContinuation().catch(error => console.log(error))
            console.log(request)
            if(request?.status === 200 || request?.status === 304){
                const response = await request.data
                console.log(response)
            }
        }
    },[continuation, token])   
    useEffect(() => {
        handleGetBlog()
    },[handleGetBlog])
    return(
        <section className="continuation">
            <div className="container">
                
            </div>
        </section>
    )
}