import styles from "./ModalFooter.module.css";

const ModalFooter = ({ children }) => {
    return (
        <div className={styles.row}>
            {children}
        </div>
    )
};

export default ModalFooter;