import { useCallback, useEffect, useRef, useState } from "react";
import { objectToList } from "../helpers";
import { dataNames, getAverage, getSensitiveStats } from "./statistics";

const StatsGraph = ({ stats }) => {

    const canvasRef = useRef();

    const [canvas, setCanvas] = useState(null);

    const render = useCallback(() => {
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext("2d");

        if (!stats) {
            return;
        }

        const points = objectToList(stats);

        const namesList = objectToList(dataNames);

        const ratio = 3 / 2;
        const width = 440;
        const height = width / ratio;

        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);

        const average = getAverage(stats);

        const sensitive = getSensitiveStats(stats);

        const maxValue = points.reduce((prev, next) => Math.max(isNaN(prev) ? prev.value : prev, next.value));

        const xPadding = 20;
        const xOffset = 0;
        const barWidth = 8;
        const textSize = 14;
        const yBottom = height * 0.55;
        const graphHeight = height * 0.55;

        namesList.forEach((n, i) => {
            const x = xOffset + xPadding + (width - xPadding * 2 - xOffset) * i / (namesList.length - 1);

            ctx.save();
            ctx.translate(x + barWidth / 2, yBottom + 10);
            ctx.rotate(-Math.PI * 3 / 8);

            ctx.font = textSize + "px Poppins, Arial, Helvetica, sans-serif";
            ctx.textAlign = "end";
            ctx.fillStyle = "black";
            ctx.fillText(dataNames[n.key], 0, 0);

            ctx.restore();

            if (!stats[n.key]) {
                return;
            }

            const value = stats[n.key];
            const y = graphHeight * value / maxValue;

            if (sensitive && sensitive.indexOf(n.key) !== -1) {
                ctx.fillStyle = "#f55";
            } else {
                ctx.fillStyle = "gray";
            }
            ctx.fillRect(x - barWidth / 2, yBottom - y, barWidth, y);
        });

        ctx.beginPath();
        ctx.strokeStyle = "aquamarine";
        ctx.lineWidth = 2;
        const yAverage = yBottom - graphHeight * average / maxValue;
        ctx.moveTo(0, yAverage);
        ctx.lineTo(width, yAverage);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.moveTo(0, yBottom);
        ctx.lineTo(width, yBottom);
        ctx.stroke();
    }, [canvas, stats]);

    useEffect(() => {
        setCanvas(canvasRef.current);
    }, []);

    render();

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default StatsGraph;