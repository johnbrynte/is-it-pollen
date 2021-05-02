import Overview, { CALLBACK_ENUMS as OVERVIEW_CALLBACK_ENUMS } from "./overview/Overview";
import DailySelector from "./selector/DailySelector";
import Settings, { CALLBACK_ENUMS as SETTINGS_CALLBACK_ENUMS } from "./Settings/Settings";
import CookieConsent from "./CookieConsent";

import styles from "./Home.module.css";

const VIEW_CALLBACKS_ENUMS = {
    ...OVERVIEW_CALLBACK_ENUMS,
    ...SETTINGS_CALLBACK_ENUMS,
    HOME_ADD_DATAPOINT: "Home/addDatapoint",
}

const Home = ({ datapoints, currentData, callbackHandler }) => {

    const addDatapoint = (health) => {
        callbackHandler(
            VIEW_CALLBACKS_ENUMS.HOME_ADD_DATAPOINT,
            { health }
        );
    }

    return (
        <>
            <h1>Är det pollen?</h1>
            <p className="paragraph">Genom att fylla i dina symptom varje dag kan vi med hjälp av data från <a href="https://pollenrapporten.se/prognoser/stockholm" rel="noreferrer" target="_blank">pollenrapporten.se</a> (Stockholm) röna ut vilken pollen du är känslig mot.</p>
            <p><strong>OBS.</strong> Inga garantier, det hela är väldigt hobbyvetenskapligt.</p>

            <CookieConsent></CookieConsent>

            <DailySelector select={addDatapoint} />

            {datapoints && !!datapoints.length && (
                <Overview datapoints={datapoints} callbackHandler={callbackHandler} />
            )}

            <div className={styles.footer}>
                <p>Alla ikoner kommer från <a href="https://streamlineicons.com/" rel="noreferrer" target="_blank">Streamline</a>.</p>
                <p>Se koden på <a href="https://github.com/johnbrynte/is-it-pollen" rel="noreferrer" target="_blank">GitHub</a>.</p>
                <Settings currentData={currentData} callbackHandler={callbackHandler} />
            </div>
        </>
    );
};

export default Home;
export {
    VIEW_CALLBACKS_ENUMS as CALLBACK_ENUMS
};