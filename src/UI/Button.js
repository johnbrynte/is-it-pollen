import React from "react";
import { className } from "../helpers";

require("./Button.css");

const Button = ({ children, click }) => {
    const buttonClass = className(["Button"]);

    return (
        <button className={buttonClass} onClick={click}>{children}</button>
    );
};

export default Button;