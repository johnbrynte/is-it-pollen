import React from "react";
import { className, objectToList } from "../helpers";
import { icons } from "../images/icons";

import styles from "./DataPopover.module.css";

const DataPopover = ({ data }) => {
    const health = objectToList(data.health).filter((h) => h.value);

    return (
        <>
            {!!health.length && health.map((h) => {
                const iconStyle = className([
                    styles.icon,
                    {
                        [styles.icon_severe]: h.value > 1
                    }
                ]);
                return (
                    <div className={styles.row} key={h.key}>
                        <span className={iconStyle}>
                            <img src={icons[h.key].src} alt={icons[h.key].alt} />
                        </span>
                        <b>{icons[h.key].name}</b>
                    </div>
                );
            })}
            {!health.length && <p>Inga besvär</p>}
            <p>{data.stats.date}</p>
        </>
    );
}

export default DataPopover;