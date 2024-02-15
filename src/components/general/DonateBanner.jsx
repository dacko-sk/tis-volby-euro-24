import { links } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';

import banner from '../../../public/img/banner.png';

function DonateBanner() {
    return (
        <div className="bg-banner">
            <div className="container">
                <div className="text-center py-4">
                    <a href={links.donateUrl} target="_blank" rel="noreferrer">
                        <img
                            alt={t(labels.donate.modalTitle)}
                            className="mw-100"
                            src={banner}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default DonateBanner;
