import Overview from "./overview/Overview";
import DailySelector from "./selector/DailySelector";
import Settings from "./Settings";
import CookieConsent from "./CookieConsent";

import styles from "./Home.module.css";

const Home = ({ datapoints, addDatapoint, updateDatapoint, removeDatapoint, removeAllDatapoints }) => {
    return (
        <>
            <h1>Är det pollen?</h1>
            <p className="paragraph">Genom att fylla i dina symptom varje dag kan vi med hjälp av data från <a href="https://pollenrapporten.se/prognoser/stockholm" rel="noreferrer" target="_blank">pollenrapporten.se</a> (Stockholm) röna ut vilken pollen du är känslig mot.</p>
            <p><strong>OBS.</strong> Inga garantier, det hela är väldigt hobbyvetenskapligt.</p>

            <CookieConsent></CookieConsent>

            <DailySelector select={addDatapoint} />

            {datapoints && !!datapoints.length && (
                <Overview datapoints={datapoints} updateDatapoint={updateDatapoint} removeDatapoint={removeDatapoint} />
            )}

            <div className={styles.footer}>
                <p>Alla ikoner kommer från <a href="https://streamlineicons.com/" rel="noreferrer" target="_blank">Streamline</a>.</p>
                <p>Se koden på <a href="https://github.com/johnbrynte/is-it-pollen" rel="noreferrer" target="_blank">GitHub</a>.</p>
                <Settings removeAllDatapoints={removeAllDatapoints} />
            </div>
        </>
    );
};

export default Home;