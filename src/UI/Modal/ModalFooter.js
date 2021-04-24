import styles from "./ModalFooter.module.scss";

const ModalFooter = ({ children }) => {
    return (
        <div className={styles.row}>
            {children}
        </div>
    )
};

export default ModalFooter;