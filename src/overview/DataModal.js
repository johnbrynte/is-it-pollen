import { forwardRef, useContext, useState } from "react";
import Selector from "../selector/Selector";
import ModalContext from "../UI/Modal/ModalContext";
import DatePicker from "react-datepicker";
import ModalFooter from "../UI/Modal/ModalFooter";
import Button from "../UI/Button";

const DataModal = ({ data, save, remove }) => {
    const { hide } = useContext(ModalContext);

    const [date, setDate] = useState(new Date(Date.parse(data.stats.date)));
    const [dateError, setDateError] = useState(null);

    const [pollen, setPollen] = useState(data.stats.pollen);

    const [health, setHealth] = useState(data.health);

    const toDateFormat = (date) => date.toISOString().replace("T", " ").split(":").slice(0, 2).join(":");

    const onSave = () => {
        const formattedDate = toDateFormat(date);

        save({
            health,
            date: formattedDate.split(" ")[0],
            stats: {
                ...data.stats,
                date: formattedDate,
                pollen: [...pollen]
            }
        });
        hide();
    }

    const dateChanged = async (date) => {
        setDateError(null);

        const formattedDate = toDateFormat(date).split(" ")[0];
        const response = await fetch("https://www.johnbrynte.se/api/pollen/stockholm/?date=" + formattedDate);

        if (!response.ok) {
            setDateError(response);
            return;
        }

        const data = await response.json();

        if (!data.success) {
            setDateError(data.error);
            return;
        }

        if (!data.data) {
            setDateError("No data available for " + formattedDate);
            return;
        }

        // date ok
        setDate(date);
        setPollen(data.data.pollen);
    };

    const modalContext = useContext(ModalContext);

    const confirmRemove = () => {
        const removeData = () => {
            hide();
            remove();
        }

        modalContext.show((
            <>
                <p>Ta bort datapunkten?</p>
                <ModalFooter>
                    <Button compact click={modalContext.hide}>Nej</Button>
                    <Button compact click={removeData}>Ja</Button>
                </ModalFooter>
            </>
        ))
    }

    const DataDatePicker = forwardRef(
        ({ value, onClick }, ref) => (
            <Button compact click={onClick} forwardRef={ref}>
                {value}
            </Button>
        ),
    );

    return (<>
        <Selector health={health} setHealth={setHealth} compact></Selector>
        <div>Datum: <DatePicker
            selected={date}
            onChange={newDate => dateChanged(newDate)}
            maxDate={new Date()}
            customInput={<DataDatePicker />} />
        </div>
        {dateError && <p style={{ color: "red" }}>{dateError}</p>}
        <ModalFooter>
            <Button compact click={confirmRemove}>Ta bort</Button>
            <Button compact click={hide}>Avbryt</Button>
            <Button compact click={onSave}>Spara</Button>
        </ModalFooter>
    </>);
};

export default DataModal;