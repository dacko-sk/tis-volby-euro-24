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
import useAdsData, { csvConfig } from '../hooks/AdsData';

import AlertWithIcon from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';
import Posts from '../components/wp/Posts';

import linkIcon from '../../public/img/external_link_icon.svg?url';
import pdfIcon from '../../public/img/PDF_icon.svg?url';

function Search() {
    const params = useParams();
    const query = params.query ?? null;
    const navigate = useNavigate();

    const { allAccountsNames, getPartyAccountData } = useAccountsData();
    const {
        getAllPartiesNames,
        getPartyAccountName,
        getPartyAdsData,
        getPartyFullName,
        getPartyShortName,
    } = useAdsData();

    const allParties = getAllPartiesNames(allAccountsNames) ?? [];

    const foundPartyNames = allParties.filter(
        (name) =>
            contains(getPartyShortName(name), query) ||
            contains(getPartyFullName(name), query) ||
            contains(getPartyAccountName(name), query)
    );

    const parties = foundPartyNames.map((name) => {
        const link = routes.party(getPartyShortName(name));
        return (
            <Col key={link} className="d-flex" sm>
                <Link
                    to={link}
                    className="d-flex flex-column justify-content-between w-100 cat-local"
                >
                    <h3>{getPartyFullName(name)}</h3>
                </Link>
            </Col>
        );
    });
    const cls = foundPartyNames.map((name) => {
        const adsData = getPartyAdsData(name);
        return adsData &&
            adsData[csvConfig.ACCOUNTS.columns.CANDIDATES_LIST] ? (
            <Col key={name} className="d-flex" sm>
                <a
                    className="d-flex flex-column justify-content-between w-100 cat-local"
                    href={adsData[csvConfig.ACCOUNTS.columns.CANDIDATES_LIST]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="download"
                >
                    <h3>
                        <span className="me-2">{getPartyFullName(name)}</span>
                        <img className="inline-icon" src={pdfIcon} />
                    </h3>
                </a>
            </Col>
        ) : null;
    });
    const accounts = foundPartyNames.flatMap((name) => {
        const accountData = getPartyAccountData(getPartyAccountName(name));
        return accountData
            ? [
                  <Col key={name} className="d-flex" sm>
                      <a
                          className="d-flex flex-column justify-content-between w-100 cat-local"
                          href={accountData[agk.account]}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="download"
                      >
                          <h3>
                              <span className="me-2">
                                  {getPartyFullName(name)}
                              </span>
                              <img className="inline-icon" src={linkIcon} />
                          </h3>
                      </a>
                  </Col>,
              ]
            : [];
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

            <h2 className="my-4">{t(labels.parties.candidatesLists)}</h2>
            {cls.length ? (
                <Row className="tiles gx-4 gy-4">{cls}</Row>
            ) : (
                <AlertWithIcon className="my-4" variant="danger">
                    {t(labels.parties.noResults)}
                </AlertWithIcon>
            )}

            <h2 className="my-4">{t(labels.account.title)}</h2>
            {accounts.length ? (
                <Row className="tiles gx-4 gy-4">{accounts}</Row>
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
