import styles from "./LinkButton.module.scss";

const LinkButton = ({ children, click }) => {
    return (
        <button className={styles.link} onClick={click}>{children}</button>
    );
};

export default LinkButton;