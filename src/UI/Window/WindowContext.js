import React, { createContext, useEffect, useState } from "react";

const WindowContext = createContext({
    portrait: false,
    desktop: false,
});

export const WindowProvider = ({ children }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        }
    }, []);

    const updateSize = () => {
        setWidth(window.innerWidth);
    };

    const windowValue = {
        portrait: width <= 640,
        desktop: width > 640,
    };

    return (
        <WindowContext.Provider value={windowValue}>
            {children}
        </WindowContext.Provider>
    );
};

export default WindowContext;