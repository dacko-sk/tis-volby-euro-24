import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { setTitle } from '../helpers/browser';
import { processArticles } from '../helpers/wp';

import Loading from '../components/general/Loading';
import Title from '../components/structure/Title';
import NewsDetail from '../components/wp/templates/NewsDetail';

function Article() {
    const params = useParams();
    const slug = params.slug ?? null;
    const navigate = useNavigate();

    // try to set article data object from location.state
    const location = useLocation();
    let article =
        location.state && (location.state.article ?? false)
            ? location.state.article
            : {};

    // load article data from API (if needed)
    const { isLoading, error, data } = useQuery(
        [`article_${slug}`],
        () =>
            fetch(
                `https://cms.transparency.sk/wp-json/wp/v2/posts?slug=${slug}`
            ).then((response) => response.json()),
        {
            // run only if article data were not delivered via location.state
            enabled: !(article.title ?? false),
        }
    );

    if (!isLoading && !error && data && data.length) {
        // article successfully loaded from API - show it!
        article = {
            ...article,
            ...processArticles(data)[0],
        };
    }

    // this has to be wrapped in useEffect, otherwise react is bitching about rendering router before unfinished rendering of article :-D
    useEffect(() => {
        if (!isLoading && !error && data && !data.length) {
            // redirect to parent page (all articles) in case article does not exist in API
            navigate(location.pathname.replace(`/${slug}`, ''));
        }
    }, [isLoading, error, data, navigate, location.pathname, slug]);

    if (!(article.title ?? false) || error) {
        // waiting for data or error in loding
        return <Loading error={error} />;
    }

    const template = <NewsDetail article={article} />;

    setTitle(article.title.rendered);

    return (
        <section className="article-detail">
            <Title multiline secondary={null}>
                {article.title.rendered}
            </Title>
            {template}
        </section>
    );
}

export default Article;
