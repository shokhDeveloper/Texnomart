import Google from "../../Settings/assets/images/Google.png"
import "./modal.scss";
import { Button, GoogleBtn } from "../../Settings";

export const ModalLogin = () => {
  return (
    <div className="modal-form-box">
    <form className="modal-login-form">
        <div className="modal-input-box">
            <input className="modal-input" type="email" name="username-email" id="username-email" />
            <label htmlFor="username-email">Email</label>
        </div>    
        <div className="modal-input-box">
            <input className="modal-input" type="password" name="username-password" id="username-password" />
            <label htmlFor="username-password">Password</label>
        </div>
            <Button className="modal-button" type="yellow">
                Submit
            </Button>
            <GoogleBtn className="border-transparent" style={{backgroundImage: `url(${Google})`}} type="button">Google orqali login qiling</GoogleBtn>
    </form>
    </div>
  );
};
