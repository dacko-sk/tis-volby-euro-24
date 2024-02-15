import { Link } from 'react-router-dom';

import { partyData } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';

import useAccountsData from '../../hooks/AccountsData';
import useAdsData from '../../hooks/AdsData';

import Loading from '../general/Loading';

import './Parties.scss';

function PartiesGallery() {
    const { allAccountsNames, getPartyAccountData } = useAccountsData();
    const { getAllPartiesNames, getPartyAdsData } = useAdsData();

    const allParties = getAllPartiesNames(allAccountsNames);

    return (
        <div className="my-4">
            <h2 className="mb-4">{t(labels.parties.monitoring)}</h2>
            {allParties === null ? (
                <Loading />
            ) : (
                allParties.map((name) => {
                    const accountData = getPartyAccountData(name);
                    const adsData = getPartyAdsData(name);
                    const party = partyData(name, accountData, adsData);
                    return (
                        <div key={party.name}>
                            <Link
                                className="party-logo-link hover-bg d-flex align-items-center"
                                to={routes.party(party.name)}
                            >
                                <figure className="flex-shrink-0 me-3">
                                    <img src={party.image} />
                                </figure>

                                <h3 className="my-2">{party.name}</h3>
                            </Link>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default PartiesGallery;
