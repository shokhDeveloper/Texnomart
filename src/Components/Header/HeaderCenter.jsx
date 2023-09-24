import { NavLink, useNavigate } from "react-router-dom";
import { Action, Button } from "../../Settings";
import Logo from "../../Settings/assets/images/texnomart-logo.svg";
import Mikrofon from "../../Settings/assets/images/voice.svg";
import Search from "../../Settings/assets/images/search.svg";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "react-use-cart";
export const HeaderCenter = () => {
  const searchRef = useRef();
  const {items} = useCart()
  const {headerActive, token, user, tovarLocals} = useSelector((state) => state.Reducer)  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = (event) => {
    switch (event.target.id) {
      case "voice":
        {
          navigator.mediaDevices.getUserMedia({ audio: true });
        }
        break;
      case "search": {
        searchRef.current.focus();
      }
    }
  };
  const handleRouteClick = (event) => {
    if(event.target.matches(".sevimlilar")){
      navigate("/sevimlilar")
    }
  }
  return (
    <div className={`header-center ${headerActive ? "header-center-active" : ""}`} style={{paddingBottom: headerActive ? "1rem": "0rem"}}>
      <div className="container">
        <div className="headerCenter-items">
          <div className="headerCenter-logo">
          </div>
          <div className="header-search">
            <input
              ref={searchRef}
              className="border-transparent"
              type="text"
              placeholder="Qidirish"
              id="header-search"
              name="header-search"
            />
            <div className="headerSearch-btns">
              <button
                onClick={handleClick}
                className="headerVoice-btn border-transparent"
                id="voice"
              >
                <img
                  className="headerVoice"
                  onClick={handleClick}
                  id="voice"
                  src={Mikrofon}
                  alt="Voice"
                />
              </button>
              <button
                id="search"
                onClick={handleClick}
                className="search-btn border-transparent"
              >
                <img
                  src={Search}
                  id="search"
                  onClick={handleClick}
                  alt="Search product"
                ></img>
              </button>
            </div>
          </div>
          <nav className="headerCenter-nav">
            <ul className="headerCenter-list">
              <li className="headerCenter-item">
                <NavLink className={"headerCenter-link"}>Buyurtma holati</NavLink>
              </li>
              <li onClick={() => {
                if(token){
                  navigate("profile-settings")
                }else{
                  dispatch(Action.setModalSign(true))
                  navigate("/home")
                }
              } } className="headerCenter-item">
                <NavLink  className={"headerCenter-link"}>{token ? `${user?.name?.substring(0,1).concat( "." + user?.lastname)}`: "Kirish"}</NavLink>
              </li>
              <li className="headerCenter-item">
                <NavLink className={"headerCenter-link"}>Taqqoslash</NavLink>
              </li>
              <li onClick={handleRouteClick} className="headerCenter-item sevimlilar">
                <p className="sevimlilar-count">{tovarLocals.length ? tovarLocals.length : null}</p>
                <NavLink className={"headerCenter-link"} to={"sevimlilar"}>Sevimlilar</NavLink>
              </li>
              <li onClick={() => {
                dispatch(Action.setShoppingModal(true))
              }} className="headerCenter-item">
                {items?.length ? (
                  <span className="shopping-items-count">{items?.length}</span>
                ): null}
                <NavLink className={"headerCenter-link"}>Savatcha</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
