import { ModalContainer } from "./Modal.style.js";

const Modal = ({ handleClose, show, children, title }) => {
    return (
        <ModalContainer>
            <div className={`overlay ${show ? "show" : ""}`}>
                <div className={`Modal ${show ? "show" : ""}`}>
                    <div className="modal-header">
                        <h4>{title}</h4>
                        <button className="close-dialog-btn" onClick={handleClose}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body-scroll">{show && children}</div>
                </div>
            </div>
        </ModalContainer>
    );
};

export default Modal;