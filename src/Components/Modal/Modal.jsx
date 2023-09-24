import "./modal.scss";
export const Modal = ({children, type, modal}) => {
    return(
        <div className="modal-overlay" style={{display: modal ? "flex": "none" }}>
            <div className={`modal ${"modal-".concat(type)}`} style={{overflow: type === "shoppingCart" ?"scroll": "none", height: type === "shoppingCart" ? "500px": "auto"}} >
                {children}
            </div>
        </div>
    )
}