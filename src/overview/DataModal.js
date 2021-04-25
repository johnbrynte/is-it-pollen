import { forwardRef, useContext, useState } from "react";
import Selector from "../selector/Selector";
import ModalContext from "../UI/Modal/ModalContext";
import DatePicker from "react-datepicker";
import ModalFooter from "../UI/Modal/ModalFooter";
import Button from "../UI/Button";

const DataModal = ({ data, save }) => {
    const { hide } = useContext(ModalContext);

    const [date, setDate] = useState(new Date(Date.parse(data.stats.date)));

    const [health, setHealth] = useState(data.health);

    const onSave = () => {
        save({
            health,
            stats: {
                ...data.stats,
                date: date.toISOString().replace("T", " ").split(":").slice(0, 2).join(":") // correct format
            }
        });
        hide();
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
            onChange={newDate => setDate(newDate)}
            maxDate={new Date()}
            customInput={<DataDatePicker />} />
        </div>
        <ModalFooter>
            <Button compact click={hide}>Cancel</Button>
            <Button compact click={onSave}>Save</Button>
        </ModalFooter>
    </>);
};

export default DataModal;