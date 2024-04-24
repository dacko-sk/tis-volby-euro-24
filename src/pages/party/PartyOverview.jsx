import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { routes, segments } from '../../helpers/routes';
import { wpCat } from '../../helpers/wp';

import { aggregatedKeys as agk } from '../../hooks/AccountsData';
import { csvConfig } from '../../hooks/AdsData';

import AlertWithIcon from '../../components/general/AlertWithIcon';
import HeroNumber from '../../components/general/HeroNumber';
import Posts, { templates } from '../../components/wp/Posts';

import pdfIcon from '../../../public/img/PDF_icon.svg?url';

function PartyOverview() {
    const party = useOutletContext();

    setTitle(party.name);

    return (
        <div className="subpage">
            {party.account === false ? (
                <AlertWithIcon className="my-4" variant="danger">
                    {t(labels.account.noData)}
                </AlertWithIcon>
            ) : (
                <Row className="my-4">
                    <Col lg={6}>
                        <h2 className="text-center mb-4">
                            {t(labels.parties.info)}
                        </h2>
                        <div className="mb-4">
                            <Link
                                to={routes.party(
                                    party.name,
                                    segments.TRANSACTIONS
                                )}
                                className="icon-link"
                            >
                                <span>{t(labels.elections.account)}</span>
                            </Link>

                            {party.hasCL && (
                                <a
                                    className="icon-link"
                                    href={party[csvConfig.ACCOUNTS.columns.CL]}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="download"
                                >
                                    <span>
                                        {t(labels.parties.candidatesList)}
                                    </span>
                                    <img src={pdfIcon} />
                                </a>
                            )}
                        </div>
                    </Col>
                    <Col lg={6}>
                        <HeroNumber
                            button={t(labels.account.allTransactions)}
                            lastUpdate={party.account?.[agk.timestamp] ?? null}
                            link={routes.party(
                                party.name,
                                segments.TRANSACTIONS
                            )}
                            loading={!(party.account ?? false)}
                            number={party.account?.[agk.outgoing]}
                            title={t(labels.account.partySpending)}
                        />
                    </Col>
                </Row>
            )}

            {party.hasWp && (
                <>
                    <h2 className="mt-4">{t(labels.news.latest)}</h2>
                    <Posts
                        categories={[wpCat.news]}
                        limit={2}
                        showMoreLink={routes.party(party.name, segments.NEWS)}
                        tags={[party[csvConfig.ACCOUNTS.columns.WP]]}
                        template={templates.condensed}
                    />
                </>
            )}
        </div>
    );
}

export default PartyOverview;
