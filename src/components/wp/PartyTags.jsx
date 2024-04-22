import { Link, useParams } from 'react-router-dom';

import { decodeSlug, routes, segments } from '../../helpers/routes';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

function PartyTags({ tags, className }) {
    const { slug } = useParams();
    const { getAllPartiesNames, getPartyAdsData } = useAdsData();

    const currentParty = slug ? decodeSlug(slug) : null;
    const allParties = getAllPartiesNames();

    const matchedTags = [];

    (allParties ?? []).forEach((name) => {
        const adsData = getPartyAdsData(name);
        const partyTag = adsData[csvConfig.ACCOUNTS.columns.WP] ?? false;
        if (partyTag && tags.includes(partyTag)) {
            matchedTags.push(
                <Link key={name} to={routes.party(name, segments.NEWS)}>
                    {currentParty === name ? <strong>{name}</strong> : name}
                </Link>
            );
        }
    });

    return matchedTags.length ? (
        <div className={className}>{matchedTags}</div>
    ) : (
        <></>
    );
}

export default PartyTags;
