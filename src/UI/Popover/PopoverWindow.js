import styles from "./Popover.module.css";

const PopoverWindow = ({ Context, children }) => {
    return (
        <Context.Consumer>
            {value => {
                const popoverStyle = value && value.pos && {
                    left: value.pos.x + "px",
                    top: (value.pos.y + 4) + "px"
                };
                return (<>
                    {value && value.visible &&
                        <div className={styles.popover}
                            style={popoverStyle}>
                            {children}
                        </div>
                    }
                </>);
            }}
        </Context.Consumer>
    );
};

export default PopoverWindow;