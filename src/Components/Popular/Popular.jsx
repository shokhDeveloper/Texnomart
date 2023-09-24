import "./popular.scss";
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Action, Api, Button } from "../../Settings"
import Shop from "../../Settings/assets/images/shop.svg"
import { Like } from "../Like"
import { useCart } from "react-use-cart"
export const Popular = () => {
    const {token, popularData, popularType} = useSelector(({Reducer}) => Reducer)
    const {addItem} = useCart()
    const dispatch = useDispatch()
    const {getPopular} = Api
    const handleGetTovar = useCallback(async () => {
        if(!popularType){
            const request = await getPopular().catch(error => console.log(error))
            if(request?.status === 200 || request?.status === 304){
                const response = await request.data
                dispatch(Action.setPopularType(true))
                dispatch(Action.setPopularData(response))
            }
        }       
    },[token])
    const handleShop = (tovar) => {
        addItem(tovar)
    }
    useEffect(() => {
        handleGetTovar()
    },[handleGetTovar])
    return(
        <section className="popular">
            <div className="popular-title-box">
                <h2>Недавно просмотренные товары</h2>
            </div>
            {popularData?.length && (
                <ul className="popular-cards">
                    {popularData?.map(item => {
                        return(
                            <li className="tovar-card">
                                <div className="swiper-tovar-header tovar-header">
                                    <Like indexId={item.parentId} id={item.id}/>
                                </div>   
                                <div className="tovar-body">
                                    <img src={item.img} width={200} height={200} alt="" />
                                    <h4>{item?.name?.split(" ").slice(0,1).join("")}</h4>
                                    <div>
                                        {item?.notprice && (
                                            <p> Eski narx <del>{item.notprice} so'm</del></p>
                                        ) }
                                    </div>
                                    <div className="tovar-shopping-box">
                                        <p>{item.price} so'm</p>
                                        <Button style={{borderRadius: "10px"}} onClick={() => handleShop(item)}>
                                            <img src={Shop} alt="shop" />
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>       
            )}
        </section>   
    )
}