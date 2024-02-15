import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { colorGrey, icons } from '../../helpers/constants';

function IconTooltip({
    color = colorGrey,
    icon = icons.info,
    id,
    placement = 'right',
    tooltip,
}) {
    return (
        <OverlayTrigger
            overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
            placement={placement}
            delayShow={300}
            delayHide={150}
        >
            <svg
                className="flex-shrink-0 ms-2"
                width="16"
                height="16"
                fill={color}
                role="img"
                viewBox="0 0 16 16"
                aria-label={icon.alt}
            >
                {icon.path}
            </svg>
        </OverlayTrigger>
    );
}

export default IconTooltip;
