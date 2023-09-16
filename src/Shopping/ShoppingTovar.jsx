import "./shopping.scss";
import DeleteImg from "../Settings/assets/images/delete.png"
import { Like } from "../Components/Like"

export const ShoppingTovar = () => {
    const tovars = [
        {
            "name": "Кондиционер Haier AS12TB3HAA-W/1U12MR5EAA",
            "img": "https://imgpng.ru/d/air_conditioner_PNG30.png",
            "notprice": "5 213 333",
            "price": "4 692 000",
            "id": 1
        }
        // {
        //     "name": "Кондиционер Haier AS12TB3HAA-W/1U12MR5EAA",
        //     "img": "https://imgpng.ru/d/air_conditioner_PNG30.png",
        //     "notprice": "5 213 333",
        //     "price": "4 692 000",
        //     "id": 1
        // },
        // {
        //     "name": "Кондиционер Haier AS12TB3HAA-W/1U12MR5EAA",
        //     "img": "https://imgpng.ru/d/air_conditioner_PNG30.png",
        //     "notprice": "5 213 333",
        //     "price": "4 692 000",
        //     "id": 1
        // },
        // {
        //     "name": "Кондиционер Haier AS12TB3HAA-W/1U12MR5EAA",
        //     "img": "https://imgpng.ru/d/air_conditioner_PNG30.png",
        //     "notprice": "5 213 333",
        //     "price": "4 692 000",
        //     "id": 1
        // },
        // {
        //     "name": "Кондиционер Haier AS12TB3HAA-W/1U12MR5EAA",
        //     "img": "https://imgpng.ru/d/air_conditioner_PNG30.png",
        //     "notprice": "5 213 333",
        //     "price": "4 692 000",
        //     "id": 1
        // }
    ]
    return(
        <div className="shoppingTovar-items">
           <div className="shoppingTovar-item">
                <div className="shoppingTovar-item-header">
                    <div className="shoppingTovar-item-alls">
                    <input type="checkbox" className="shoppingTovar-check" />
                    <span>Выбрать все</span>
                    </div>
                    <button className="delete-tovars border-transparent">Удалить выбранные</button>
                </div>
                <ul className="shoppingTovar-item-list">
                        {tovars?.map(item => {
                            return(
                                <li className="shoppingTovar-item-li">
                                    <div>
                                    <input type="checkbox" className="shoppingTovar-check-tovar" />
                                    
                                    <img  src={item.img} alt="" />    
                                    <p>{item.name.split(" ")[0]}  </p>
                                    </div>
                                    <div>
                                    <div className="shoppingTovar-counts-elements">
                                        <button className="border-transparent">-</button>
                                        <p>0</p>
                                        <button className="border-transparent">+</button>
                                    </div>
                                    <p>{item.price}</p>
                                    <div className="shoppingTovar-settings-elements">
                                    <Like indexId={1} id={item.id}/>
                                    <button className="border-transparent" style={{backgroundImage: `url(${DeleteImg})`}}/>
                                    </div>   
                                    </div>
                                </li>
                            )
                        })}           
                </ul>
           </div>
           <div className="shoppingTovar-item">
               <div className="shoppingTovar-title-box">
                    <h4>Итого</h4>
               </div>   
           </div>
        </div>
    )
}