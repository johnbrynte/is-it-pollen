import { useContext, useRef, useState } from "react";
import { deleteServerData, getServerData, setServerToken } from "../server";
import Button from "../UI/Button";
import ModalContext from "../UI/Modal/ModalContext";
import ModalFooter from "../UI/Modal/ModalFooter";

import styles from "./SettingsServer.module.css";

const VIEW_CALLBACKS_ENUMS = {
    SETTINGS_SERVER_CREATED_SET_DATAPOINTS: "SettingsServerCreated/setDatapoints"
};

const SettingsServerCreated = ({ existingToken, setExistingToken, callbackHandler }) => {
    const [editToken, setEditToken] = useState(false);
    const [tokenCopied, setTokenCopied] = useState(false);

    const inputRef = useRef();

    const modalContext = useContext(ModalContext);

    const setDatapoints = (data) => {
        callbackHandler(
            VIEW_CALLBACKS_ENUMS.SETTINGS_SERVER_CREATED_SET_DATAPOINTS,
            data
        );
    }

    const confirmRemoveData = () => {
        modalContext.show((
            <>
                <p>Ta bort koden och all sparad data?</p>
                <ModalFooter>
                    <Button compact click={modalContext.hide}>Nej</Button>
                    <Button compact click={removeSavedData}>Ja</Button>
                </ModalFooter>
            </>
        ))
    }

    const removeSavedData = () => {
        deleteServerData(existingToken);
        setDatapoints(null);

        modalContext.hide();
    }

    const confirmStopSyncing = () => {
        modalContext.show((
            <>
                <p>Sluta synca den här enheten mot <b>{existingToken}</b>?</p>
                <p>(Kom ihåg att datan fortfarande sparas på servern.)</p>
                <ModalFooter>
                    <Button compact click={modalContext.hide}>Nej</Button>
                    <Button compact click={stopSyncing}>Ja</Button>
                </ModalFooter>
            </>
        ))
    }

    const stopSyncing = () => {
        setServerToken(null);

        modalContext.hide();
    }

    const copyToken = () => {
        if (editToken || !document.execCommand) {
            return;
        }

        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");

            setTokenCopied(true);
        }
    }

    const saveToken = () => {
        setServerToken(existingToken);
        setEditToken(false);
        setTokenCopied(false);

        getServerData().then((data) => {
            try {
                const parsedData = JSON.parse(data.data);

                setDatapoints(parsedData)
            } catch (e) { }
        });
    }

    const changeToken = () => {
        inputRef.current.focus();
        setEditToken(true);
        setTokenCopied(false);
    }

    return (<>
        {!editToken && <p>Klicka på texten för att kopiera koden.</p>}
        <div className={styles.inputrow}>
            <input type="text" onClick={copyToken} onChange={(e) => setExistingToken(e.target.value)} value={existingToken} placeholder="Skriv in serverkoden här" readOnly={!editToken} className={styles.input} ref={inputRef} />
            {editToken && <Button compact click={confirmRemoveData}>Ta bort</Button>}
            {editToken && <Button compact click={saveToken}>Spara</Button>}
            {!editToken && <Button compact click={changeToken}>Redigera</Button>}
        </div>
        {!editToken && <Button compact click={confirmStopSyncing}>Sluta synca</Button>}
        {tokenCopied && <p><b>Koden kopierad!</b></p>}
    </>);
};

export default SettingsServerCreated;
export {
    VIEW_CALLBACKS_ENUMS as CALLBACK_ENUMS
}