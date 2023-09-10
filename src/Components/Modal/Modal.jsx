import "./modal.scss";
export const Modal = ({children, type, modal}) => {
    return(
        <div className="modal-overlay" style={{display: modal ? "flex": "none" }}>
            <div className={`modal ${type === "sign" ? "modal-".concat(type) : "modal-korzina"}`}  >
                {children}
            </div>
        </div>
    )
}