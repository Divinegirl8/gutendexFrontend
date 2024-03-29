import style from "./index.module.css"

const Modal = ({message,onClose}) =>{
    return(
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h1>{message}</h1>
                <button className={style.butn} onClick={onClose}>Login</button>
            </div>
        </div>
    )
}
export default Modal;