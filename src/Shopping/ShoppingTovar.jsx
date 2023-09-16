import "./shopping.scss";
import tovars from "../Settings/tovars.json"
import DeleteImg from "../Settings/assets/images/delete.png";
import { Like } from "../Components/Like";
import { Action, Button } from "../Settings";
import { useCart } from "react-use-cart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ShoppingTovar = () => {
  const {items, removeItem, updateItemQuantity, emptyCart} = useCart()
  const {price_All} = useSelector((state) => state.Reducer)
  const dispatch = useDispatch()
  const handleClick = (id) => {
    removeItem(id)
  }
  useEffect(() => {
    let price = 0
    if(items?.length){
        items?.map(item => {
            let number = item.price.split(" ").join("")-0
            price+= number
        })
        dispatch(Action.setPriceAll(price))
    }
  },[items])
  return (
    <div className="shoppingTovar-items">
      <div className="shoppingTovar-item">
        <div className="shoppingTovar-item-header">
          <div className="shoppingTovar-item-alls">
            <input type="checkbox" className="shoppingTovar-check" />
            <span>Выбрать все</span>
          </div>
          <button onClick={() => emptyCart()} className="delete-tovars border-transparent">
            Удалить выбранные
          </button>
        </div>
        <ul className="shoppingTovar-item-list">
          {items?.map((item) => {
            return (
              <li className="shoppingTovar-item-li">
                <div>
                  <input
                    type="checkbox"
                    className="shoppingTovar-check-tovar"
                  />

                  <img src={item.img} alt="" />
                  <p>{item.name.split(" ")[0]} </p>
                </div>
                <div>
                  <div className="shoppingTovar-counts-elements">
                    <button onClick={() => updateItemQuantity(item.id , item.quantity-1)}  className="border-transparent">-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => updateItemQuantity(item.id , item.quantity+1)} className="border-transparent">+</button>
                  </div>
                  <p>{item.price}</p>
                  <div className="shoppingTovar-settings-elements">
                    <Like indexId={item.parentId} id={item.id} />
                    <button
                    onClick={ () => handleClick(item.id)}
                      className="border-transparent"
                      style={{ backgroundImage: `url(${DeleteImg})` }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="shoppingTovar-item">
        <div className="shoppingTovar-box">
          <div className="shoppingTovar-title-box">
            <h4>Итого</h4>
          </div>
          <div className="shoppingTovar-price">
            <p>{items.length} товара на сумму </p>
            <h4>{price_All} so'm</h4>
          </div>
            <Button type="yellow">Оформить покупку</Button>
        </div>
        <div className="shoppingTovar-box">
            <div className="shoppingTovar-kredit">
                <p>Рассрочка от 42 238 cўм / 24 мес.</p>
            </div>
          <Button type="black">Оформить в рассрочку</Button>
        </div>
      </div>
    </div>
  );
};
