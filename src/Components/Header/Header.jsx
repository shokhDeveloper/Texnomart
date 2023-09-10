import "./header.scss"
import { NavLink } from "react-router-dom";
import {changeLanguage} from "i18next"
import {useTranslation} from "react-i18next" 
import { Action, Button, setItem } from "../../Settings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { HeaderCenter } from "./HeaderCenter";
import { HeaderBottom } from "./HeaderBottom";

export const Header = () => {
  const {t, i18n} = useTranslation()
  const {position, user, token} = useSelector(state => state.Reducer)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    changeLanguage(event.target.value)
    setItem("language", event.target.value)
  }
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let {coords:{latitude, longitude}} = position
      if(latitude){
        dispatch(Action.setPosition({
          latitude,
          longitude
        }))   
      }
    })
  }
  useEffect(() => {
    if(position?.latitude){
      window.open(`https://www.google.com/maps/place/${position?.latitude?.toString()?.substring(0,2)}%C2%B040'33.0%22N+66%C2%B057'20.7%22E/@${position?.latitude?.toString()?.substring(0,5)}8291,${position?.longitude?.toString().substring(0,4)}53167,17z/data=!3m1!4b1!4m4!3m3!8m2!3d${position?.latitude}!4d${position.longitude}?entry=ttu`,
      "blank"
      )
    }
  },[position])
  return (
    <header className="site-header" id="header">
      <div className="header-top">
        <div className="container">
          <div className="headertop-inner">
            <nav className="headertop-nav">
              <ul className="headertop-list">
                <li className="headertop-item">
                  <NavLink className="headertop-link" onClick={handleClick}>Тошкент
                  
                   </NavLink>
                   <ul className="headertop-bar">
                    <li className="bar-item">Andijon</li>
                    <li className="bar-item">Qashqardaryo</li>
                    <li className="bar-item">Samarqand</li>
                    <li className="bar-item">Farg'ona</li>
                  </ul>
                </li>
                <li className="headertop-item">
                  <NavLink className="headertop-link">
                    {t("navigation_item")}
                  </NavLink>
                </li>
                <li className="headertop-item">
                  <NavLink className="headertop-link">
                    Юридик шахслар учун
                  </NavLink>
                </li>
                <li className="headertop-item">
                  <NavLink className="headertop-link">
                    Муддатли тўловга сотиб олиш
                  </NavLink>
                </li>
                <li className="headertop-item">
                  <NavLink className="headertop-link">Тўлов усуллари</NavLink>
                </li>
              </ul>
            </nav>
            <div className="headertop-elements">
                <div className="headertop-contact">
                    <p>Aлоқа маркази :</p>
                    <a href="tel:998712099944">+99871 209 99 44</a>
                </div>
                <select defaultValue={i18n.language} onChange={handleChange} className="headertop-select">
                    <option value="uz">ЎЗ</option>
                    <option value="ru">PU</option>
                </select>
            </div>
          </div>
        </div>
      </div>
    <HeaderCenter/>
    <HeaderBottom/>
    </header>
  );
};
