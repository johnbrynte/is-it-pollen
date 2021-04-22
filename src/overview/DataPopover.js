import React from "react";
import { objectToList } from "../helpers";
import { icons } from "../images/icons";

require("./DataPopover.css");

const DataPopover = ({ pos, data }) => {
    const health = objectToList(data.health).filter((h) => h.value);

    return (
        <>
            {pos && (<div className="DataPopover" style={{ left: pos.x + "px", top: (pos.y + 4) + "px" }}>
                {!!health.length && health.map((h) => (
                    <div className="DataPopover__row" key={h.key}>
                        <img className="DataPopover__icon" src={icons[h.key].src} alt={icons[h.key].alt} />
                        <b>{icons[h.key].name}</b>
                    </div>
                ))}
                {!health.length && <p>Inga besvär</p>}
                <p>{data.stats.date}</p>
            </div>)}
        </>
    );
}

export default DataPopover;