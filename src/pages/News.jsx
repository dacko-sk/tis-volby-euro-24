import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { wpCat } from '../helpers/wp';

import Title from '../components/structure/Title';
import Posts from '../components/wp/Posts';

function News() {
    setTitle(t(labels.news.navTitle));

    return (
        <section>
            <Title>{t(labels.news.pageTitle)}</Title>
            <Posts categories={[wpCat.news]} />
        </section>
    );
}

export default News;
