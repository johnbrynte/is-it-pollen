import React from "react";
import { className } from "../helpers";

import { icons } from "../images/icons";

import styles from "./IconButton.module.css";

const IconButton = ({ icon, state, click, compact }) => {
    const image = icons[icon];

    const buttonClass = className([
        styles.IconButton,
        {
            [styles.IconButton_compact]: compact
        },
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