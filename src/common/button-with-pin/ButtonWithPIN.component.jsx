import { useState } from "react";
import PIN from '../pin/PIN.component'
import Modal from "../modal/Modal.component";

const ButtonWithPIN = ({ onClick, className, children }) => {
    const [showPIN, setShowPIN] = useState(false);

    const openPIN = () => setShowPIN(true);
    const closePIN = () => setShowPIN(false);
    const handleClick = () => {
        closePIN();
        onClick();
    }

    return <>
        <button type="button" onClick={openPIN} className={className}>
            {children}
        </button>
        <Modal show={showPIN} title={"Potvrdite akciju unošenjem PIN koda"} handleClose={closePIN}>
            {showPIN && <PIN length={4} submitAction={handleClick}></PIN>}
        </Modal>
    </>
}

export default ButtonWithPIN;