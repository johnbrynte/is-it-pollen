import React from "react";
import { className } from "../helpers";

import styles from "./Button.module.css";

const Button = ({ children, click, compact }) => {
    const buttonClass = className([
        styles.button,
        {
            [styles.button_compact]: compact
        }
    ]);

    return (
        <button className={buttonClass} onClick={click}>{children}</button>
    );
};

export default Button;