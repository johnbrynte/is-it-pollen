import React, { useState } from "react";

const ModalContext = React.createContext({
    modal: null,
    show: () => { },
    hide: () => { }
});

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null);

    const show = (m) => {
        document.body.className = "no-scroll";

        setModal(m);
    }

    const hide = () => {
        document.body.className = "";

        setModal(null);
    }

    const modalValue = {
        modal,
        show,
        hide,
    };

    return (
        <ModalContext.Provider value={modalValue}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext;