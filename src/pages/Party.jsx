import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';

import { partyData } from '../helpers/constants';
import { labels, t } from '../helpers/dictionary';
import { decodeSlug, routes, segments } from '../helpers/routes';

import useAccountsData from '../hooks/AccountsData';
import useAdsData from '../hooks/AdsData';

import Title from '../components/structure/Title';

function Party() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { getPartyAccountData } = useAccountsData();
    const { getPartyAccountName, getPartyAdsData, getPartyFulltName } =
        useAdsData();

    const name = decodeSlug(slug);
    const accountData = getPartyAccountData(getPartyAccountName(name));
    const adsData = getPartyAdsData(name);
    const party = partyData(name, accountData, adsData);

    useEffect(() => {
        if (!party.isValid) {
            // redirect to home page in case party is unknown
            navigate(routes.home());
        }
    }, [party, navigate]);

    if (!party.isValid) {
        // stop rendering & let useEffect hook to redirect
        return null;
    }

    return (
        <section className="party-page">
            <Title>
                {(party.image ?? false) && (
                    <div className="logo mb-2 mx-auto">
                        <div className="img-aspect">
                            <figure>
                                <img src={party.image} />
                            </figure>
                        </div>
                    </div>
                )}
                {getPartyFulltName(name)}
            </Title>
            <div className="tabs-scrollable">
                <Nav variant="tabs">
                    <Nav.Link as={NavLink} to={routes.party(name)} end>
                        {t(labels.parties.overview)}
                    </Nav.Link>
                    {party.hasAccount !== false && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.party(name, segments.TRANSACTIONS)}
                        >
                            {t(labels.parties.funding)}
                        </Nav.Link>
                    )}
                    {/* {(party.hasWp) && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.party(name, segments.ANALYSIS)}
                        >
                            {t(labels.analysis.navTitle)}
                        </Nav.Link>
                    )} */}
                    {/* <Nav.Link
                        as={NavLink}
                        to={routes.party(name, segments.ONLINE)}
                    >
                        {t(labels.online.navTitle)}
                    </Nav.Link> */}
                    {party.hasWp && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.party(name, segments.NEWS)}
                        >
                            {t(labels.news.navTitle)}
                        </Nav.Link>
                    )}
                    {/* {(party.hasWp) && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.party(name, segments.ASSETS)}
                        >
                            {t(labels.parties.assets)}
                        </Nav.Link>
                    )} */}
                </Nav>
            </div>

            <Outlet context={party} />
        </section>
    );
}

export default Party;
