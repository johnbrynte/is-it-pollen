import React from 'react';

import { className, objectToList } from "../helpers";
import { icons } from '../images/icons';

import IconButton from '../UI/IconButton';

import styles from "./Selector.module.css";

const Selector = ({ health, setHealth, compact }) => {
    const rowStyle = className([
        styles.row,
        {
            [styles.row_compact]: compact
        }
    ])
    const toggleHealthType = (id) => {
        setHealth({
            ...health,
            [id]: (health[id] + 1) % 3
        });
    };

    const healthList = objectToList(health);

    return (
        <div className={rowStyle}>
            {healthList.map(type => (
                <div className={styles.item} key={type.key}>
                    <IconButton
                        state={type.value}
                        click={() => toggleHealthType(type.key)}
                        icon={type.key}
                        compact={compact}>
                    </IconButton>
                    <span className={styles.item__text}>{icons[type.key].name}</span>
                </div>
            ))}
        </div>
    )
}

export default Selector;