import React, { useContext, useRef, useState } from "react";
import { className, objectToList } from "../helpers";
import ModalContext from "../UI/Modal/ModalContext";
import DataPopover from "./DataPopover";
import DataModal from "./DataModal";

require("./DataPoint.css");

const DataPoint = ({ data, update }) => {
    const date = data.stats.date.split(/[-T\s]/g)[2];
    const dDate = new Date(Date.parse(data.stats.date));
    const dToday = new Date();
    const isToday = dDate.getFullYear() === dToday.getFullYear() && dDate.getMonth() === dToday.getMonth() && dDate.getDate() === dToday.getDate();

    const level = Math.floor(objectToList(data.health).reduce((prev, cur) => {
        return (typeof prev === "number" ? prev : prev.value) + (cur.value);
    }) / 2);

    const buttonClass = className([
        "DataPoint",
        "DataPoint_level" + level,
        {
            "DataPoint_today": isToday
        }
    ]);

    const click = () => {
        modalContext.show(<DataModal data={data} save={update} />);
    }

    const modalContext = useContext(ModalContext);

    const [popover, setPopover] = useState({
        visible: false,
        pos: null,
    });

    const buttonRef = useRef();

    const mouseEventToPos = (e) => {
        return {
            x: e.clientX,
            y: e.clientY,
        };
    }

    const mouseEnter = (e) => {
        const pos = mouseEventToPos(e);

        const { offsetTop, offsetLeft } = buttonRef.current;

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
            visible: false
        });
    }

    const mouseMove = (e) => {
        const pos = mouseEventToPos(e);

        const { offsetTop, offsetLeft } = buttonRef.current;

        setPopover({
            ...popover,
            pos: {
                x: pos.x - offsetLeft,
                y: pos.y - offsetTop
            }
        });
    }

    return (
        <button className={buttonClass}
            onClick={click}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onMouseMove={mouseMove}
            ref={buttonRef}
        >
            {date}
            {popover.visible && <DataPopover pos={popover.pos} data={data} />}
        </button>
    )
};

export default DataPoint;