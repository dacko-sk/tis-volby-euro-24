import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import PartiesGallery from '../components/parties/PartiesGallery';
import Title from '../components/structure/Title';

function Parties() {
    setTitle(t(labels.parties.navTitle));

    return (
        <section>
            <Title>{t(labels.parties.navTitle)}</Title>

            <PartiesGallery />
        </section>
    );
}

export default Parties;
