import React, { useContext } from "react";
import Button from "../UI/Button";
import ModalContext from "../UI/Modal/ModalContext";
import ModalFooter from "../UI/Modal/ModalFooter";
import { createPopover } from "../UI/Popover/Popover";
import WindowContext from "../UI/Window/WindowContext";
import DataPoint, { CALLBACK_ENUMS } from "./DataPoint";

import styles from "./Overview.module.css";
import OverviewVerdict from "./OverviewVerdict";
import { getStats } from "./statistics";
import StatsGraph from "./StatsGraph";

const VIEW_CALLBACKS_ENUMS = {
    ...CALLBACK_ENUMS
};

const Overview = ({ datapoints, callbackHandler }) => {
    const stats = getStats(datapoints);

    const Popover = createPopover();

    const modalContext = useContext(ModalContext);

    const showVerdictModal = () => {
        modalContext.show((
            <>
                <StatsGraph stats={stats} fillWidth></StatsGraph>
                <ModalFooter>
                    <Button compact click={modalContext.hide}>Stäng</Button>
                </ModalFooter>
            </>
        ));
    };

    return (
        <>
            <h2>Dina tidigare datapunkter</h2>
            {!datapoints || !datapoints.length ?
                (
                    <p>Du har inte loggat något än.</p>
                ) :
                (
                    <>
                        {stats && (
                            <WindowContext.Consumer>
                                { value => {
                                    if (value.desktop) {
                                        return (
                                            <Popover.Container custom={<div className={styles.info} />}>
                                                <OverviewVerdict stats={stats}></OverviewVerdict>
                                                <Popover.Window>
                                                    <StatsGraph stats={stats}></StatsGraph>
                                                </Popover.Window>
                                            </Popover.Container>
                                        );
                                    } else {
                                        return (
                                            <Button compact click={showVerdictModal}>
                                                <OverviewVerdict stats={stats}></OverviewVerdict>
                                            </Button>
                                        );
                                    }
                                }}
                            </WindowContext.Consumer>
                        )}
                        <div className={styles.datapoints}>
                            {datapoints.map((data) => (
                                <DataPoint data={data} key={data.id}
                                    callbackHandler={callbackHandler} />
                            ))}
                        </div>
                    </>
                )
            }
        </>
    )
};

export default Overview;
export {
    VIEW_CALLBACKS_ENUMS as CALLBACK_ENUMS
};