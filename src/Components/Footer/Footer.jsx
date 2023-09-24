import "./footer.scss"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Action } from "../../Settings"
import { useEffect } from "react"

export const Footer = () => {
    const date = new Date()
    const {position} = useSelector(({Reducer}) => Reducer)
    const dispatch = useDispatch()
    const handleNavigator = () => {
        navigator.geolocation.getCurrentPosition((item) => {
            const {coords:{latitude, longitude}} = item
            if(latitude && longitude){
                dispatch(Action.setPosition({
                    latitude,
                    longitude
                }))
            }  
        })
    }
    useEffect(() => {
        if(position?.latitude && position?.longitude){
            window.open(`https://www.google.com/maps/place/${position?.latitude?.toString()?.substring(0,2)}%C2%B040'33.0%22N+66%C2%B057'20.7%22E/@${position?.latitude?.toString()?.substring(0,5)}8291,${position?.longitude?.toString().substring(0,4)}53167,17z/data=!3m1!4b1!4m4!3m3!8m2!3d${position?.latitude}!4d${position.longitude}?entry=ttu`, "blank")
        }
    }, [position])
    return(
        <footer>
            <div className="container">
                <div className="footer-inner">

                <div className="footer-inner-box">
                    <div className="footer-item">
                       <p><small>Возник вопрос? Звоните</small></p> 
                        <a className="footer-item-number" href="tel:+998991457766">+998 71 209 99 44</a>
                        <div className="footer-item-links">
                            <a href="https://telegram.com" className="footer-link-facebook"/>
                            <a href="https://instagram.com" className="footer-link-facebook"/>
                            <a href="https://medium.com/@shohijahonmusinkulov" className="footer-link-facebook"/>
                            <a href="https://medium.com/@shohijahonmusinkulov" className="footer-link-facebook"/>
                        </div>                       
                        <div className="footer-item-apps">
                            <a href="https://play-market.com">
                                <img src="https://texnomart.uz/_nuxt/img/playmarket-logo-ru.8f7eb5c.svg" alt="Play-market" />
                            </a>
                            <a href="https://app-store.com">
                                <img src="https://texnomart.uz/_nuxt/img/appstore-logo-ru.34b758d.svg" alt="App-store" />
                            </a>
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="footer-item-title-box">
                            <h4>Компания</h4>
                            <ul className="footer-item-list">
                                <li>
                                    <NavLink>Юридическим лицам</NavLink>
                                </li>
                                <li>
                                    <NavLink>О Техномарт</NavLink>
                                </li>
                                <li>
                                    <NavLink>Новости и блоги</NavLink>
                                </li>
                                <li>
                                    <NavLink>Проверка IMEI</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="footer-item-title-box">
                            <h4>Информация</h4>
                            <ul className="footer-item-list">
                                <li>
                                    <NavLink>Бесплатная доставка</NavLink>
                                </li>
                                <li>
                                    <NavLink>Бонусная система</NavLink>
                                </li>
                                <li>
                                    <NavLink>Работа в Техномарт</NavLink>
                                </li>
                                <li>
                                    <NavLink>Личный кабинет</NavLink>
                                </li>
                                <li>
                                    <NavLink>Контактные номера</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="footer-item-title-box">
                            <h4>Помощь покупателю</h4>
                            <ul className="footer-item-list">
                                <li>
                                    <NavLink>Покупка в рассрочку</NavLink>
                                </li>
                                <li>
                                    <NavLink>Возврат товара</NavLink>
                                </li>
                                <li>
                                    <NavLink>Гарантия на товары</NavLink>
                                </li>
                                <li>
                                    <NavLink>Часто задаваемые вопросы</NavLink>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>  
                <address className="footer-adress">
                    <a onClick={handleNavigator} >
                    Адреса магазинов Тошкент
                    </a>
                </address>
                </div>
                <div className="footer-bottom-inner">
                    <div className="footer-bottom-discription">
                        <p>2016-{date.getFullYear()} ©texnomart.uz. Все права защищены. Указанная стоимость товаров и условия их приобретения действительны по состоянию на текущую дату</p>
                    </div>
                    <div className="footer-bottom-idCards">
                        <a href="https://uzcard.com"/>
                        <a href="https://payme.com"/>
                        <a href="https://inTend.com"/>
                    </div>
                </div>
            </div>
        </footer>   
    )
}