import React, { useRef, useState } from "react";
import { className, objectToList } from "../helpers";
import DataPopover from "./DataPopover";

require("./DataPoint.css");

const DataPoint = ({ data }) => {
    const date = data.stats.date.split(/[-T\s]/g)[2];
    const dDate = new Date(Date.parse(data.stats.date));
    const dToday = new Date();
    const isToday = dDate.getFullYear() === dToday.getFullYear() && dDate.getMonth() === dToday.getMonth() && dDate.getDate() === dToday.getDate();

    const level = objectToList(data.health).reduce((prev, cur) => {
        return (typeof prev === "number" ? prev : prev.value) + (cur.value ? 1 : 0);
    });

    const buttonClass = className([
        "DataPoint",
        "DataPoint_level" + level,
        {
            "DataPoint_today": isToday
        }
    ]);

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