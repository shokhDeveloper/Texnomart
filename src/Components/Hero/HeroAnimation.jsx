import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../../Settings";

export const HeaderAnimation = () => {
    const { topDisplay } = useSelector((state) => state.Reducer);
    
  return (
    <div className="hero-animation">
      <a href="#header" className="hero-top" style={{opacity: topDisplay ? 1: 0}}/>
      <a  className="hero-telegram" target="blank" href="https://t.me/shokhijakhon_dev" />
      <div className="message">
        <svg
          className="message-photo b24-crm-button-icon b24-crm-button-icon-active"
          width={28}
          height={29}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="b24-crm-button-chat-icon"
            d="M25.99 7.744a2 2 0 012 2v11.49a2 2 0 01-2 2h-1.044v5.162l-4.752-5.163h-7.503a2 2 0 01-2-2v-1.872h10.073a3 3 0 003-3V7.744zM19.381 0a2 2 0 012 2v12.78a2 2 0 01-2 2h-8.69l-5.94 6.453V16.78H2a2 2 0 01-2-2V2a2 2 0 012-2h17.382z"
            fill=" #FFFFFF"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
