import tovars from "../../Settings/tovars.json";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Action } from "../../Settings"
import {Like as LikeTovar} from "../../Settings"
import Likeimg from "../../Settings/assets/images/Like.png";
import NotLike from "../../Settings/assets/images/Not_Like.png";
export const Like = ({indexId,id}) => {
    const [like, setLike]  = useState(false)
    const {tovarLocals} = useSelector((state) => state.Reducer )
    const dispatch = useDispatch()
    const likeRef = useRef()
    const handleIncludeTovar = () => {
        const params = tovarLocals?.some(item => item.id === id)
        setLike(params)
    }
    const handleChange = (event) => {
        if(event.target.checked){
            setLike(true)
            if(tovarLocals?.length){
                const tovar = tovars[indexId]?.cards?.find(item => item.id === id)   
                likeRef.current.defaultChecked = true
                setLike(true)
                dispatch(Action.setLike(tovar))
            }else{
                const tovar = tovars[indexId]?.cards?.find(item => item.id === id)
                dispatch(Action.setLike(tovar))
            }
        }else{
            const tovar = tovars[indexId]?.cards.find(item => item.id === id)
            const filter = tovarLocals?.filter(item => item.id !== tovar.id)
            setLike(false)
            dispatch(Action.setNotLike(filter))
        }
    }
    useEffect(() => {
        handleIncludeTovar()
    },[id])
    useEffect(() => {
        console.log(tovarLocals)
    },[tovarLocals])
    return(
        <LikeTovar ref={likeRef} defaultChecked={like} checked={like} onChange={handleChange} style={{backgroundImage: like ? `url(${Likeimg})` : `url(${NotLike})`}}/>
    )
}