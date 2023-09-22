import "../Carousel/Carousel.scss";
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useBack } from "../CustomHooks"
import {Api} from "../../Settings/Api"
import { Action } from "../../Settings";
import Iphone from "../../Settings/assets/images/Iphone.png";
import Samsung from "../../Settings/assets/images/ZFOLD.png"
export const Continuation = () => {
    const {continuation , token, continuationData} = useSelector((state) => state.Reducer)
    const dispatch = useDispatch()
    const {getContinuation} = Api
    const handleGetBlog = useCallback( async () => {
        if(continuation || token){
            const request = await getContinuation().catch(error => console.log(error))
            if(request?.status === 200 || request?.status === 304){
                const response = await request.data
                dispatch(Action.setContinuationData(response))
            }
        }
    },[continuation, token])   
    useEffect(() => {
        handleGetBlog()
    },[handleGetBlog])
    useBack()
    return(
        <section className="continuation">
            <div className="container">
                {continuationData?.length && (
                    <div className="continuation-blog continuation-page">
                        {continuationData?.map((item, index) => {
                            return(
                                <div style={{background: `rgba(59,130,246,.3)` }} className="continuation-item">
                                    <div className="continuation-item-header">
                                        <a href={item.url} target="blank">
                                            <img src={item.orginalName === "IPHONE" ? Iphone : Samsung } alt="Phone" height={200}  />
                                        </a>
                                    </div>
                                    <div className="continuation-item-body">
                                        <p> 24 августа 2023</p>
                                        <h5>{item.name}</h5>
                                    </div>
                                
                                </div>
                            )
                        })}                        
                    </div>    
                )}
            </div>
        </section>
    )
}