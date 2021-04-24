import React, { useState } from "react";

const ModalContext = React.createContext({
    modal: null,
    show: () => { },
});

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState(null);
    const modalValue = {
        modal,
        show: setModal,
        hide: () => setModal(null),
    };

    return (
        <ModalContext.Provider value={modalValue}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext;