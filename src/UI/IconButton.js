import React from "react";
import { className } from "../helpers";

import { icons } from "../images/icons";

import styles from "./IconButton.module.scss";

const IconButton = ({ icon, state, click }) => {
    const image = icons[icon];

    const buttonClass = className([
        styles.IconButton,
        {
            1: styles.IconButton_checked_1,
            2: styles.IconButton_checked_2
        }[state]
    ]);

    return (
        <button className={buttonClass} onClick={click}>
            <img src={image.src} alt={image.alt} />
        </button>
    );
};

export default IconButton;