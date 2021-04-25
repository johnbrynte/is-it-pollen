import React, { useEffect, useState } from "react"
import Overview from "./overview/Overview";
import DailySelector from "./selector/DailySelector";
import Settings from "./Settings";
import Button from "./UI/Button";
import Modal from "./UI/Modal/Modal";
import { ModalProvider } from "./UI/Modal/ModalContext";

import styles from "./App.module.css";

const App = () => {
    const storageString = "indie.johnbrynte.harjagpollenallergi";
    const cookieString = "indie.johnbrynte.harjagpollenallergi.consent";

    const [datapoints, setDatapoints] = useState([]);
    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect(() => {
        try {
            const data = JSON.parse(window.localStorage.getItem(storageString));

            if (data) {
                setDatapoints(data);
            }

            const consent = window.localStorage.getItem(cookieString);
            if (consent) {
                setCookieConsent(consent === "true");
            }
        } catch (e) { }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(cookieString, cookieConsent);
    }, [cookieConsent]);

    useEffect(() => {
        window.localStorage.setItem(storageString, JSON.stringify(datapoints));
    }, [datapoints]);

    const select = async (health) => {
        const response = await fetch("https://www.johnbrynte.se/api/pollen/stockholm/");

        if (!response.ok) {
            console.error(response);
            return;
        }

        const data = await response.json();

        if (!data.success) {
            console.error(data.error);
            return;
        }

        const stats = data.data;

        setDatapoints([...datapoints, {
            health: { ...health },
            stats
        }]);
    };

    const updateDatapoint = (i, data) => {
        let newDatapoints = [...datapoints];

        newDatapoints[i] = {
            ...datapoints[i],
            health: {
                ...datapoints[i].health,
                ...data.health
            },
            stats: {
                ...datapoints[i].stats,
                ...data.stats
            }
        };

        newDatapoints.sort((a, b) => a.stats.date > b.stats.date ? 1 : -1);

        setDatapoints(newDatapoints);
    };

    const removeDatapoint = (i) => {
        let newDatapoints = [...datapoints];
        newDatapoints.splice(i, 1);
        setDatapoints(newDatapoints);
    };

    return (
        <>
            <ModalProvider>
                <h1>Är det pollen?</h1>
                <p className="paragraph">Genom att fylla i dina symptom varje dag kan vi med hjälp av data från <a href="https://pollenrapporten.se/prognoser/stockholm" rel="noreferrer" target="_blank">pollenrapporten.se</a> (Stockholm) röna ut vilken pollen du är känslig mot.</p>
                <p><strong>OBS.</strong> Inga garantier, det hela är väldigt hobbyvetenskapligt.</p>
                {!cookieConsent && (
                    <div>
                        <div className={styles.info}>Sidan använder "cookies" för att lagra den data du matar in. <Button compact click={() => setCookieConsent(true)}>OK</Button></div>
                    </div>
                )}

                <DailySelector select={select} />
                {datapoints && !!datapoints.length && (
                    <Overview datapoints={datapoints} updateDatapoint={updateDatapoint} removeDatapoint={removeDatapoint} />
                )}

                <div className={styles.footer}>
                    <p>Alla ikoner kommer från <a href="https://streamlineicons.com/" rel="noreferrer" target="_blank">Streamline</a>.</p>
                    <Settings setDatapoints={setDatapoints} />
                </div>

                <Modal />
            </ModalProvider>
        </>
    )
};

export default App;