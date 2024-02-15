import { tickLabel } from '../../helpers/charts';

import { tickFontSize } from './VerticalTick';

function HorizontalTick({ x, y, payload }) {
    return (
        <text
            x={x}
            y={y}
            fill="#333"
            orientation="bottom"
            textAnchor="middle"
            type="category"
            fontSize={tickFontSize}
        >
            <tspan x={x} dy="0.71em" className="name">
                {tickLabel(payload.value)}
            </tspan>
        </text>
    );
}

export default HorizontalTick;
