import { useContext } from "react";
import ModalContext from "./ModalContext";

import styles from "./Modal.module.css";

const Modal = () => {
    const { modal, hide } = useContext(ModalContext);

    return (modal && (
        <div className={styles.container}
            onClick={hide}>
            <div className={styles.modalWrapper}>
                <div className={styles.modal}
                    onClick={(e) => e.stopPropagation()}>
                    {modal}
                </div>
            </div>
        </div>
    ));
}

export default Modal;