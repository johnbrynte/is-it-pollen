import { dataNames, getSensitiveStats } from "./statistics";

const OverviewVerdict = ({ stats }) => {
    const sensitive = getSensitiveStats(stats);

    if (!sensitive) {
        return (<span>Du verkar inte vara känslig mot något speciellt.</span>);
    }

    return (<span>Du verkar vara känslig mot&nbsp;
        {
            sensitive.length === 1 ?
                <b>{dataNames[sensitive[0]]}</b> :
                sensitive.map((e, i) => (
                    <b key={i}>{dataNames[e]}</b>
                )).reduce((prev, cur, i, arr) => arr.length > 2 && i < arr.length - 1 ? [prev, ", ", cur] : [prev, " och ", cur])
        }
    .</span>);
};

export default OverviewVerdict;