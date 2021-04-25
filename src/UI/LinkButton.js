import styles from "./LinkButton.module.css";

const LinkButton = ({ children, click }) => {
    return (
        <button className={styles.link} onClick={click}>{children}</button>
    );
};

export default LinkButton;