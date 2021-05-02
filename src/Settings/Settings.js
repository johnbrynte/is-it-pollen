import { useContext } from "react";
import SettingsServer, { CALLBACK_ENUMS } from "./SettingsServer";
import Button from "../UI/Button";
import LinkButton from "../UI/LinkButton";
import ModalContext from "../UI/Modal/ModalContext";
import ModalFooter from "../UI/Modal/ModalFooter";

const VIEW_CALLBACKS_ENUMS = {
    ...CALLBACK_ENUMS
};

const Settings = ({ currentData, callbackHandler }) => {

    const modalContext = useContext(ModalContext);

    const manageServerData = () => {
        modalContext.show((
            <>
                <SettingsServer currentData={currentData} callbackHandler={callbackHandler}></SettingsServer>
                <ModalFooter>
                    <Button compact click={modalContext.hide}>Stäng</Button>
                </ModalFooter>
            </>
        ))
    }

    return (<div>
        <div><LinkButton click={manageServerData}>Hantera data</LinkButton>.</div>
    </div>);
}

export default Settings;
export {
    VIEW_CALLBACKS_ENUMS as CALLBACK_ENUMS
}