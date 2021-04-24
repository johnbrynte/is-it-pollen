import React, { useState } from 'react';

import { objectToList } from "../helpers";
import { icons } from '../images/icons';
import Button from '../UI/Button';

import IconButton from '../UI/IconButton';

require("./Selector.css");

const Selector = ({ select }) => {
    const [hasSelected, setHasSelected] = useState(false);

    const [health, setHealth] = useState({
        eye: false,
        nose: false,
        throat: false,
        headache: false,
        sleepy: false,
    });

    const toggleHealthType = (id) => {
        setHealth({
            ...health,
            [id]: !health[id]
        });
    };

    const addDatapoint = () => {
        setHasSelected(true);

        select(health);
    };

    const healthList = objectToList(health);

    return (
        <div className="Selector">
            <h2 className="Selector__h2">Vilka besvär har du idag?</h2>
            {hasSelected ? <p>Toppen! Glöm inte att fylla i imorgon.</p> :
                (
                    <>
                        <div className="Selector__row">
                            {healthList.map(type => (
                                <div className="Selector__item" key={type.key}>
                                    <IconButton
                                        state={type.value}
                                        click={() => toggleHealthType(type.key)}
                                        icon={type.key}>
                                    </IconButton>
                                    <span className="Selector__item-text">{icons[type.key].name}</span>
                                </div>
                            ))}
                        </div>
                        <Button click={addDatapoint}>Lägg till datapunkt</Button>
                    </>
                )
            }
        </div>
    )
}

export default Selector;