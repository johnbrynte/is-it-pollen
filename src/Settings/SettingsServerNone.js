import { useState } from "react";
import { className } from "../helpers";
import { createServerData, getServerData, setServerToken } from "../server";
import Button from "../UI/Button";
import styles from "./SettingsServer.module.css";

const VIEW_CALLBACKS_ENUMS = {
    SETTINGS_SERVER_NONE_SET_DATAPOINTS: "SettingsServerNone/setDatapoints"
}

const SettingsServerNone = ({ currentData, setExistingToken, callbackHandler }) => {
    const [consent, setConsent] = useState(false);

    const [token, setToken] = useState("");

    const consentStyle = className([
        styles.consent,
        {
            [styles.consent_active]: consent
        }
    ]);

    const setDatapoints = (data) => {
        callbackHandler(
            VIEW_CALLBACKS_ENUMS.SETTINGS_SERVER_NONE_SET_DATAPOINTS,
            data
        );
    }

    const createToken = () => {
        createServerData(currentData).then((createdToken) => {
            setExistingToken(createdToken);
        }).catch((r) => {
            console.log(r);
        });
    }

    const saveToken = () => {
        setServerToken(token);
        setExistingToken(token);

        getServerData().then((data) => {
            try {
                const parsedData = JSON.parse(data.data);
                setDatapoints(parsedData);
            } catch (e) { }
        });
    }

    return (<>
        <p>Genom att skapa en kod kommer datan du matar in på den här enheten att sparas automatiskt på vår server. Du kan när som helst ta bort datan så länge du har koden.</p>
        <label className={consentStyle}>
            <input type="checkbox" onClick={(e) => setConsent(e.target.checked)} />
            <span className={styles.consenttext}>Jag accepterar att min data sparas på johnbrynte.se tills jag väljer att ta bort den.</span>
        </label>
        <Button compact click={createToken} disabled={!consent}>Skapa en serverkod</Button>

        <p>Klistra in en existerande kod här:</p>

        <div className={styles.inputrow}>
            <input type="text" onChange={(e) => setToken(e.target.value)} value={token} placeholder="Skriv in serverkoden här" className={styles.input} />
            <Button compact click={saveToken}>Spara</Button>
        </div>
    </>);
};

export default SettingsServerNone;
export {
    VIEW_CALLBACKS_ENUMS as CALLBACK_ENUMS
}