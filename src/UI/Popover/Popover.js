import React from "react";
import PopoverContainer from "./PopoverContainer";
import PopoverWindow from "./PopoverWindow";

export const createPopover = () => {
    const Context = React.createContext({
        component: null,
        pos: null,
        visible: false,
    });

    const Popover = {
        Container: ({ custom, children }) => (
            <PopoverContainer Context={Context} custom={custom}>
                {children}
            </PopoverContainer>
        ),
        Window: ({ children }) => (
            <PopoverWindow Context={Context}>
                {children}
            </PopoverWindow>
        )
    };

    return Popover;
}