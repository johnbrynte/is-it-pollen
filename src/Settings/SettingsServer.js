import { useContext, useState } from "react";
import { getServerToken } from "../server";

import SettingsServerNone, { CALLBACK_ENUMS as NONE_CALLBACK_ENUMS } from "./SettingsServerNone";
import SettingsServerCreated, { CALLBACK_ENUMS as CREATED_CALLBACK_ENUMS } from "./SettingsServerCreated";
import ModalContext from "../UI/Modal/ModalContext";
import ModalFooter from "../UI/Modal/ModalFooter";
import Button from "../UI/Button";

const VIEW_CALLBACKS_ENUMS = {
    ...NONE_CALLBACK_ENUMS,
    ...CREATED_CALLBACK_ENUMS,
    SETTINGS_SERVER_REMOVE_ALL_DATAPOINTS: "SettingsServer/removeAllDatapoints"
};

const SettingsServer = ({ currentData, callbackHandler }) => {
    const [existingToken, setExistingToken] = useState(getServerToken());

    const modalContext = useContext(ModalContext);

    const removeAllDatapoints = () => {
        callbackHandler(
            VIEW_CALLBACKS_ENUMS.SETTINGS_SERVER_CREATED_SET_DATAPOINTS,
        );
    }

    const removeData = () => {
        removeAllDatapoints();
        modalContext.hide();
    };

    const confirmRemoveData = () => {
        modalContext.show((
            <>
                <p>Ta bort all sparad data?</p>
                <ModalFooter>
                    <Button compact click={modalContext.hide}>Nej</Button>
                    <Button compact click={removeData}>Ja</Button>
                </ModalFooter>
            </>
        ))
    }

    return (
        <>
            {!existingToken && (<>
                <h1>Lokal data</h1>
                <p>Datan sparas lokalt på den här enheten.</p>
                <Button compact click={confirmRemoveData}>Ta bort data</Button>
            </>)}

            <h1>Synca med andra enheter</h1>

            <p>Du kan synca dina data med andra enheter genom att skapa en anonym kod.</p>

            {!existingToken && <SettingsServerNone currentData={currentData} setExistingToken={setExistingToken} callbackHandler={callbackHandler}></SettingsServerNone>}

            {existingToken && <SettingsServerCreated existingToken={existingToken} setExistingToken={setExistingToken} callbackHandler={callbackHandler}></SettingsServerCreated>}
        </>
    );
}

export default SettingsServer;
export {
    VIEW_CALLBACKS_ENUMS as CALLBACK_ENUMS
};