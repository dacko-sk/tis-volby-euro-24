import { Link } from 'react-router-dom';

import linkIcon from '../../../public/img/external_link_icon.svg?url';
import pdfIcon from '../../../public/img/PDF_icon.svg?url';

function DownloadLink({ children, to }) {
    let icon = null;
    if ((to ?? '').toLowerCase().endsWith('.pdf')) {
        icon = pdfIcon;
    } else if ((to ?? '').toLowerCase().startsWith('http')) {
        icon = linkIcon;
    }
    return (
        <Link to={to} className="icon-link" target={icon ? '_blank' : null}>
            <span className="h-100 d-flex align-items-center">{children}</span>
            {icon && <img src={icon} className="download-icon" />}
        </Link>
    );
}

export default DownloadLink;
