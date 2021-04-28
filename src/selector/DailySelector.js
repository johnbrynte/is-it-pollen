import React, { useState } from 'react';

import Button from '../UI/Button';
import Selector from './Selector';

import styles from "./DailySelector.module.css";
import LinkButton from '../UI/LinkButton';
import WindowContext from '../UI/Window/WindowContext';

const DailySelector = ({ select }) => {
    const [hasSelected, setHasSelected] = useState(false);

    const [health, setHealth] = useState({
        eye: 0,
        nose: 0,
        throat: 0,
        headache: 0,
        sleepy: 0,
    });

    const addDatapoint = () => {
        setHasSelected(true);

        select(health);
    };

    const reset = () => {
        setHealth({
            eye: 0,
            nose: 0,
            throat: 0,
            headache: 0,
            sleepy: 0,
        });
        setHasSelected(false);
    }

    return (
        <div className={styles.wrapper}>
            <h2>Vilka besvär har du idag?</h2>
            {hasSelected && (
                <>
                    <p>Toppen! Glöm inte att fylla i imorgon.</p>
                    <LinkButton click={reset}>Fyll i igen</LinkButton>.
                </>
            )}
            {!hasSelected && (
                <>
                    <WindowContext.Consumer>
                        {value => {
                            if (value.desktop) {
                                return (<>
                                    <Selector health={health} setHealth={setHealth}></Selector>
                                    <Button click={addDatapoint}>Lägg till datapunkt</Button>
                                </>);
                            } else {
                                return (<>
                                    <Selector health={health} setHealth={setHealth} compact></Selector>
                                    <Button click={addDatapoint} compact>Lägg till datapunkt</Button>
                                </>);
                            }
                        }}
                    </WindowContext.Consumer>
                </>
            )
            }
        </div>
    )
}

export default DailySelector;