import React from "react";
import { className } from "../helpers";

import { icons } from "../images/icons";
// import styles from "./IconButton.module.css";
require("./IconButton.css");

const IconButton = ({ icon, state, click }) => {
    const image = icons[icon];

    const buttonClass = className([
        "IconButton",
        {
            "IconButton_checked": state
        }
    ]);

    return (
        <button className={buttonClass} onClick={click}>
            <img src={image.src} alt={image.alt} />
        </button>
    );
};

export default IconButton;