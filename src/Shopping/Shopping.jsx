import { useDispatch, useSelector } from "react-redux"
import { useCart } from "react-use-cart"
import { Action, Button } from "../Settings"
import { useNavigate } from "react-router"
import { ShoppingTovar } from "./ShoppingTovar"

export const Shopping = () => {
    const {addItem, items} = useCart()
    const {shoppingModal} = useSelector((state) => state.Reducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return(
        <>
            <div className="modal-header">
                <h3>Корзина</h3>
                <button onClick={() => {
                    if(items?.length){
                        dispatch(Action.setShoppingModal(false))
                        window.location.reload()
                    }else{
                        dispatch(Action.setShoppingModal(false))
                    }
                }} className="border-transparent" >&times;</button>
             </div>              
             <div className="modal-body">
                <div className="modal-body-box">
                {!items?.length ? (
                <div className="modal-korzina-items">
                    <img width={100} height={100} src="https://texnomart.uz/_nuxt/img/shopping-card.24c7f25.svg" alt="" />
                    <h4>В корзине пока <br /> ничего нет</h4>
                    <Button onClick={() => dispatch(Action.setShoppingModal(false))} type="light" style={{textTransform: "inherit", borderRadius: "6px", "border": "2px solid #FBC100"}}>Перейти к покупкам</Button>
                </div>
                ): (
                    <ShoppingTovar/>
                )}
                </div>
             </div>
        </>
    )
}