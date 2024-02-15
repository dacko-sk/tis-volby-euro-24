import { tickLabel } from '../../helpers/charts';

export const tickFontSize = 13;

function VerticalTick({ x, y, payload }) {
    return (
        <text
            x={x}
            y={y}
            fill="#333"
            orientation="left"
            textAnchor="end"
            type="category"
            width="160"
            fontSize={tickFontSize}
        >
            <tspan x={x} dy="0.355em" className="name">
                {tickLabel(payload.value)}
            </tspan>
        </text>
    );
}

export default VerticalTick;
