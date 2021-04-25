import React from "react";
import { objectToList } from "../helpers";
import { createPopover } from "../UI/Popover/Popover";
import DataPoint from "./DataPoint";

import styles from "./Overview.module.css";
import { getStats, getSensitiveStats, dataNames } from "./statistics";
import StatsGraph from "./StatsGraph";

const Overview = ({ datapoints, updateDatapoint }) => {
    const stats = getStats(datapoints);

    const sensitive = getSensitiveStats(stats);

    const Popover = createPopover();

    return (
        <div className={styles.container}>
            <h2>Dina tidigare datapunkter</h2>
            {!datapoints || !datapoints.length ?
                (
                    <p>Du har inte loggat något än.</p>
                ) :
                (
                    <>
                        {stats && (
                            <Popover.Container custom={<div className={styles.info} />}>
                                {!sensitive && (<span>Du verkar inte vara känslig mot något speciellt.</span>)}
                                {sensitive && (<span>Du verkar vara känslig mot&nbsp;
                                    {
                                        sensitive.length == 1 ?
                                            <b>{dataNames[sensitive[0]]}</b> :
                                            sensitive.reduce((prev, cur) => [prev, " och ", cur]).map((e, i) => (
                                                <b key={i}>{dataNames[e]}</b>
                                            ))
                                    }
                                .</span>)}
                                <Popover.Window>
                                    <StatsGraph stats={stats}></StatsGraph>
                                </Popover.Window>
                            </Popover.Container>
                        )}
                        <div className={styles.datapoints}>
                            {datapoints.map((data, i) => (
                                <DataPoint data={data} key={i} update={(newData) => updateDatapoint(i, newData)} />
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
};

export default Overview;