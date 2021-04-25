import { cloneElement, useRef, useState } from "react";
import { className } from "../../helpers";
import styles from "./Popover.module.css";

const PopoverContainer = ({ Context, custom, children }) => {
    const [popover, setPopover] = useState({
        pos: null,
        visible: false,
    });

    const popoverRef = useRef();

    const mouseEventToPos = (e) => {
        return {
            x: e.clientX,
            y: e.clientY,
        };
    }

    const mouseEnter = (e) => {
        const pos = mouseEventToPos(e);

        const { offsetTop, offsetLeft } = popoverRef.current;

        setPopover({
            ...popover,
            pos: {
                x: pos.x - offsetLeft,
                y: pos.y - offsetTop
            },
            visible: true
        });
    }

    const mouseLeave = (e) => {
        setPopover({
            ...popover,
            pos: null,
            visible: false
        });
    }

    const mouseMove = (e) => {
        const pos = mouseEventToPos(e);

        const { offsetTop, offsetLeft } = popoverRef.current;

        setPopover({
            ...popover,
            pos: {
                x: pos.x - offsetLeft,
                y: pos.y - offsetTop
            }
        });
    }

    const element = custom || <div />;

    return (
        <Context.Provider value={popover}>
            {
                cloneElement(element, {
                    ...element.props,
                    className: className([styles.container, element.props.className]),
                    onMouseEnter: mouseEnter,
                    onMouseLeave: mouseLeave,
                    onMouseMove: mouseMove,
                    ref: popoverRef,
                    children: children,
                })
            }
        </Context.Provider>
    )
}

export default PopoverContainer;