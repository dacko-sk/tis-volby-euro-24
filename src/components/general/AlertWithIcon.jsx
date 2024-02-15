import Alert from 'react-bootstrap/Alert';

import { icons } from '../../helpers/constants';

function AlertWithIcon({ className, children, variant }) {
    let icon = null;
    switch (variant) {
        case 'danger':
        case 'warning':
            icon = icons.warning;
            break;
        default:
            icon = icons.info;
    }
    return (
        <Alert variant={variant} className={`d-flex ${className}`}>
            {icon && (
                <svg
                    className="flex-shrink-0 me-2"
                    width="24"
                    height="24"
                    fill="currentColor"
                    role="img"
                    viewBox="0 0 16 16"
                    aria-label={icon.alt}
                >
                    {icon.path}
                </svg>
            )}
            <div>{children}</div>
        </Alert>
    );
}

export default AlertWithIcon;
