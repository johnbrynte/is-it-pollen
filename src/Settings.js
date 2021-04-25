import { useContext } from "react";
import Button from "./UI/Button";
import LinkButton from "./UI/LinkButton";
import ModalContext from "./UI/Modal/ModalContext";
import ModalFooter from "./UI/Modal/ModalFooter";

const Settings = ({ setDatapoints }) => {
    const modalContext = useContext(ModalContext);

    const removeData = () => {
        setDatapoints([]);
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

    return (<div>
        <LinkButton click={confirmRemoveData}>Rensa data</LinkButton>.
    </div>);
}

export default Settings;