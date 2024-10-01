import { csvConfig } from '../hooks/AdsData';

// import all csv files from the accounts folder via webpack
const partiesImages = require.context(
    '../../public/img/parties',
    false,
    /\.(jpg|png)$/
);
const partiesSvgs = require.context(
    '!@svgr/webpack!../../public/img/parties',
    false,
    /\.(svg)$/
);

export const partyImage = (name) => {
    const file = partiesImages
        .keys()
        .find(
            (key) =>
                !!['jpg', 'png'].find((ext) => key.endsWith(`/${name}.${ext}`))
        );
    if (file) {
        return (
            <img src={partiesImages(file)} alt={name} className="party-logo" />
        );
    }
    return null;
};

export const partySvg = (name) => {
    const svg = partiesSvgs.keys().find((key) => key.endsWith(`/${name}.svg`));
    if (svg) {
        const PartySvg = partiesSvgs(svg).default;
        return <PartySvg className="party-logo" />;
    }
    return null;
};

export const partyData = (name, accountData, adsData) => {
    const data = {
        name,
        image: partySvg(name) ?? partyImage(name),
        account: accountData,
        ...(adsData ?? {}),
    };
    data.hasAccount = accountData !== false;
    data.hasMeta = adsData && !!data[csvConfig.ACCOUNTS.columns.FB].length;
    data.hasGoogle =
        adsData && !!data[csvConfig.ACCOUNTS.columns.GOOGLE].length;
    data.hasWp = adsData && !!data[csvConfig.ACCOUNTS.columns.WP];
    data.hasCL = adsData && !!data[csvConfig.ACCOUNTS.columns.CL];
    data.hasAssets = adsData && !!data[csvConfig.ACCOUNTS.columns.ASSETS];
    data.hasReport =
        adsData && !!data[csvConfig.ACCOUNTS.columns.REPORTS].length;
    data.isValid = data.hasAccount || adsData !== false;

    return data;
};
