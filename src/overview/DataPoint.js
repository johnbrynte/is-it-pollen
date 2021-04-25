import React, { useContext } from "react";
import { className, objectToList } from "../helpers";
import ModalContext from "../UI/Modal/ModalContext";
import DataPopover from "./DataPopover";
import DataModal from "./DataModal";
import { createPopover } from "../UI/Popover/Popover";

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

    const Popover = createPopover();

    return (
        <Popover.Container custom={(
            <button className={buttonClass} onClick={click} />
        )}>
            {date}
            <Popover.Window>
                <DataPopover data={data} />
            </Popover.Window>
        </Popover.Container>
    )
};

export default DataPoint;