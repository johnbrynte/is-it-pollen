import React from "react";
import DataPoint from "./DataPoint";

require("./Overview.css");

const Overview = ({ datapoints }) => {
    const sensitive = [(<b>Björk</b>), (<b>Vide</b>)];

    return (
        <>
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
                        <div className="Overview_datapoints">
                            {datapoints.map((data, i) => (
                                <DataPoint data={data} key={i} />
                            ))}
                        </div>
                    </>
                )
            }
        </>
    )
};

export default Overview;