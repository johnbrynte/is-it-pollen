import React, { useContext } from "react";
import { className, objectToList } from "../helpers";
import ModalContext from "../UI/Modal/ModalContext";
import DataPopover from "./DataPopover";
import DataModal from "./DataModal";
import { createPopover } from "../UI/Popover/Popover";
import WindowContext from "../UI/Window/WindowContext";
import ModalFooter from "../UI/Modal/ModalFooter";
import Button from "../UI/Button";

const VIEW_CALLBACKS_ENUMS = {
    DATAPOINT_UPDATE_DATAPOINT: "DataPoint/updateDatapoint",
    DATAPOINT_REMOVE_DATAPOINT: "DataPoint/removeDatapoint"
};

require("./DataPoint.css");

const DataPoint = ({ data, callbackHandler }) => {
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

    const showDataEditModal = () => {
        modalContext.show((
            <DataModal data={data} save={updateDatapoint} remove={removeDatapoint} />
        ));
    }

    const showDataModal = () => {
        modalContext.show((
            <>
                <DataPopover data={data} />
                <ModalFooter>
                    <Button compact click={showDataEditModal}>Redigera</Button>
                    <Button compact click={modalContext.hide}>Stäng</Button>
                </ModalFooter>
            </>
        ));
    }

    const updateDatapoint = (newData) => {
        callbackHandler(
            VIEW_CALLBACKS_ENUMS.DATAPOINT_UPDATE_DATAPOINT,
            {
                id: data.id,
                data: newData
            }
        );
    }

    const removeDatapoint = () => {
        callbackHandler(
            VIEW_CALLBACKS_ENUMS.DATAPOINT_REMOVE_DATAPOINT,
            {
                id: data.id
            }
        );
    }

    const modalContext = useContext(ModalContext);

    const Popover = createPopover();

    return (
        <WindowContext.Consumer>
            {value => {
                if (value.desktop) {
                    return (
                        <Popover.Container custom={(
                            <button className={buttonClass} onClick={showDataEditModal} />
                        )}>
                            {date}
                            <Popover.Window>
                                <DataPopover data={data} />
                            </Popover.Window>
                        </Popover.Container>
                    );
                } else {
                    return (
                        <button className={buttonClass} onClick={showDataModal}>{date}</button>
                    );
                }
            }}
        </WindowContext.Consumer>
    )
};

export default DataPoint;
export {
    VIEW_CALLBACKS_ENUMS as CALLBACK_ENUMS
};