import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';

import { scrollToTop } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';
import { getAnalysedData, processArticles, wpCat } from '../../helpers/wp';

import AnalysisFeatured from './templates/AnalysisFeatured';
import AnalysisList from './templates/AnalysisList';
import NewsCondensed from './templates/NewsCondensed';
import NewsList from './templates/NewsList';
import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';

import './News.scss';

export const templates = {
    condensed: 'condensed',
    featured: 'featured',
    list: 'list',
};

function Posts({
    categories = [],
    categoriesExclude = [],
    limit = false,
    noResults,
    search = '',
    showMore = null,
    showMoreLink = null,
    tags = [],
    template = templates.list,
}) {
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const isAnalysis =
        categories.includes(wpCat.analyses) ||
        categories.includes(wpCat.featured);

    const blocksize = limit || (isAnalysis ? 40 : 10);
    const catParam = categories.length
        ? `&categories=${categories.join()}`
        : '';
    const catExParam = categoriesExclude.length
        ? `&categories_exclude=${categoriesExclude.join()}`
        : '';
    const tagParam = tags.length ? `&tags=${tags.join()}&tax_relation=AND` : '';
    const searchParam = search ? `&search=${search}` : '';
    const { isLoading, error, data } = useQuery(
        [
            `all_posts_${catParam}_${tagParam}_${search}_${blocksize}_${activePage}`,
        ],
        () =>
            fetch(
                `https://cms.transparency.sk/wp-json/wp/v2/posts?per_page=${blocksize}&page=${activePage}${catParam}${catExParam}${tagParam}${searchParam}`
            ).then((response) => {
                if (response.headers) {
                    const wptp = Number(
                        response.headers.get('X-WP-TotalPages')
                    );
                    setTotalPages(wptp);
                }
                // must return promise
                return response.json();
            })
    );

    const loadPage = (page) => () => {
        setActivePage(page);
        scrollToTop();
    };

    const articles = [];
    let content = null;

    if (isLoading || error) {
        content = <Loading error={error} />;
    } else {
        if (isAnalysis) {
            getAnalysedData(data).forEach((article) => {
                articles.push(
                    template === templates.featured ? (
                        <AnalysisFeatured
                            key={article.slug}
                            article={article}
                        />
                    ) : (
                        <AnalysisList key={article.slug} article={article} />
                    )
                );
            });
        } else {
            processArticles(data).forEach((article) => {
                articles.push(
                    template === templates.condensed ? (
                        <NewsCondensed key={article.slug} article={article} />
                    ) : (
                        <NewsList key={article.slug} article={article} />
                    )
                );
            });
        }

        content = articles.length ? (
            <Row
                className={`articles ${template}${
                    template === templates.featured ? ' gy-4' : ''
                }`}
            >
                {articles}
            </Row>
        ) : (
            <AlertWithIcon className="my-4" variant="danger">
                {noResults ?? t(labels.news.noData)}
            </AlertWithIcon>
        );
    }

    const title =
        template === templates.featured && articles.length ? (
            <h2 className="my-4">
                {t(labels.analyses.top, [articles.length])}
            </h2>
        ) : null;

    let nav = null;
    if (articles.length) {
        if (showMore || limit) {
            nav = (
                <div className="buttons mt-3 text-center">
                    <Button
                        as={Link}
                        to={showMoreLink || routes.news()}
                        variant="secondary"
                    >
                        {showMore || t(labels.showMore)}
                    </Button>
                </div>
            );
        } else if (template !== templates.featured) {
            const items = [];
            for (let i = 1; i <= totalPages; i += 1) {
                items.push(
                    <Pagination.Item
                        key={i}
                        active={i === activePage}
                        onClick={loadPage(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
            if (items.length > 1) {
                nav = (
                    <Pagination className="justify-content-center mt-4">
                        {items}
                    </Pagination>
                );
            }
        }
    }

    // reset active page to 1 if search query changes
    useEffect(() => {
        setActivePage(1);
    }, [search]);

    return (
        <div>
            {title}
            {content}
            {nav}
        </div>
    );
}

export default Posts;
