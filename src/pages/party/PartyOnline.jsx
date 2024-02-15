import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';

// import PartyGoogle from './PartyGoogle';
import PartyMeta from './PartyMeta';

function PartyOnline() {
    const candidate = useOutletContext();

    setTitle(`${candidate.name} : ${t(labels.ads.pageTitle)}`);

    return (
        <div className="subpage">
            <h2 className="mt-4 mb-3">{t(labels.ads.meta.title)}</h2>
            <PartyMeta />
            {/* <h2 className="mt-4 mb-3">{t(labels.ads.google.title)}</h2>
            <PartyGoogle /> */}
        </div>
    );
}

export default PartyOnline;
