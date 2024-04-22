import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { partyData } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';

import useAccountsData from '../../hooks/AccountsData';
import useAdsData from '../../hooks/AdsData';

import Loading from '../general/Loading';

import './Parties.scss';

function PartiesGallery({ compact = false }) {
    const { allAccountsNames, getPartyAccountData } = useAccountsData();
    const { getAllPartiesNames, getPartyAdsData, getPartyFullName } =
        useAdsData();

    const allParties = getAllPartiesNames(allAccountsNames);

    return (
        <div className="my-4">
            <h2 className="mb-4">{t(labels.parties.monitoring)}</h2>
            {allParties === null ? (
                <Loading />
            ) : (
                <Row className={compact ? '' : 'gy-4'}>
                    {allParties.map((name) => {
                        const accountData = getPartyAccountData(name);
                        const adsData = getPartyAdsData(name);
                        const party = partyData(name, accountData, adsData);
                        const fullName = getPartyFullName(name);
                        return compact ? (
                            <Col key={party.name} xs={12}>
                                <Link
                                    className="party-logo-link hover-bg d-flex align-items-center"
                                    to={routes.party(party.name)}
                                >
                                    <figure className="flex-shrink-0 me-3">
                                        {party.image}
                                    </figure>
                                    <h3 className="my-2">{fullName}</h3>
                                </Link>
                            </Col>
                        ) : (
                            <Col key={party.name} xs={6} sm={4} md={3} xl={2}>
                                <Link
                                    id={party.name}
                                    className="article analysis-preview"
                                    to={routes.party(party.name)}
                                >
                                    <div className="thumb">
                                        <figure className="text-center">
                                            {party.image}
                                        </figure>

                                        {party.image === null && (
                                            <div className="name text-center">
                                                <span className="badge">
                                                    {fullName}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
}

export default PartiesGallery;
