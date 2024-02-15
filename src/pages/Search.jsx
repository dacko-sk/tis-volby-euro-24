import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { contains } from '../helpers/helpers';
import { routes } from '../helpers/routes';
import { wpCat } from '../helpers/wp';

import useAccountsData, { aggregatedKeys as agk } from '../hooks/AccountsData';

import AlertWithIcon from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';
import Posts from '../components/wp/Posts';

function Search() {
    const params = useParams();
    const query = params.query ?? null;
    const navigate = useNavigate();

    const { accountsData } = useAccountsData();

    const parties = (accountsData.data ?? [])
        .filter(
            (row) =>
                contains(row[agk.name], query) ||
                contains(row.fbName, query) ||
                contains(row.fullName, query) ||
                contains(row.slug, query)
        )
        .map((row) => {
            const link = routes.party(row[agk.name]);
            return (
                <Col key={row[agk.name]} className="d-flex" sm>
                    <Link
                        to={link}
                        className="d-flex flex-column justify-content-between w-100 cat-local"
                    >
                        <h3>{row[agk.name]}</h3>
                    </Link>
                </Col>
            );
        });

    useEffect(() => {
        if (!query) {
            // redirect to root page if no query string is provided
            navigate(routes.home());
        }
    }, [query]);

    setTitle(`${t(labels.search.results)} „${query}“`);

    return (
        <section className="search-results">
            <Title secondary={`„${query}“`}>
                {t(labels.search.results)}
                <br />
            </Title>

            <h2 className="my-4">{t(labels.parties.navTitle)}</h2>
            {parties.length ? (
                <Row className="tiles gx-4 gy-4">{parties}</Row>
            ) : (
                <AlertWithIcon className="my-4" variant="danger">
                    {t(labels.parties.noResults)}
                </AlertWithIcon>
            )}

            <h2 className="my-4">{t(labels.news.pageTitle)}</h2>
            <Posts
                categories={[wpCat.news]}
                noResults={t(labels.news.noData)}
                search={query}
            />
        </section>
    );
}

export default Search;
