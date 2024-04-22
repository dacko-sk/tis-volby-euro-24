import { Link, useParams } from 'react-router-dom';

import { decodeSlug, routes, segments } from '../../helpers/routes';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

function PartyTags({ tags, className, link }) {
    const { slug } = useParams();
    const { getAllPartiesNames, getPartyAdsData } = useAdsData();

    const currentParty = slug ? decodeSlug(slug) : null;
    const allParties = getAllPartiesNames();

    const matchedTags = [];

    (allParties ?? []).forEach((name) => {
        const adsData = getPartyAdsData(name);
        const partyTag = adsData[csvConfig.ACCOUNTS.columns.WP] ?? false;
        if (partyTag && tags.includes(partyTag)) {
            const tag = currentParty === name ? <strong>{name}</strong> : name;
            matchedTags.push(
                link ? (
                    <Link
                        className="tag"
                        key={name}
                        to={routes.party(name, segments.NEWS)}
                    >
                        {tag}
                    </Link>
                ) : (
                    <span className="tag" key={name}>
                        {tag}
                    </span>
                )
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
