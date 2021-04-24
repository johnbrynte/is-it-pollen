import React from "react";
import DataPoint from "./DataPoint";

import styles from "./Overview.module.css";

const Overview = ({ datapoints, updateDatapoint }) => {
    const sensitive = [(<b>Björk</b>), (<b>Vide</b>)];

    return (
        <div className={styles.container}>
            <h2>Dina tidigare datapunkter</h2>
            {!datapoints || !datapoints.length ?
                (
                    <p>Du har inte loggat något än.</p>
                ) :
                (
                    <>
                        <p>Du verkar vara känslig mot {
                            sensitive.reduce((prev, cur) => [prev, " och ", cur]).map((e, i) => (
                                <span key={i}>{e}</span>
                            ))
                        }.</p>
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