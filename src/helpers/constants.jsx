import { csvConfig } from '../hooks/AdsData';

// import all csv files from the accounts folder via webpack
const partiesImages = require.context('../../public/img/parties');

export const partyImage = (name) => {
    const file = partiesImages
        .keys()
        .find(
            (key) =>
                !!['jpg', 'png', 'svg'].find((ext) =>
                    key.endsWith(`${name}.${ext}`)
                )
        );
    return file ? partiesImages(file) : null;
};

export const partyData = (name, accountData, adsData) => {
    const data = {
        name,
        image: partyImage(name),
        account: accountData,
        ...(adsData ?? {}),
    };
    data.hasAccount = accountData !== false;
    data.hasMeta = adsData && !!data[csvConfig.ACCOUNTS.columns.FB].length;
    data.hasGoogle =
        adsData && !!data[csvConfig.ACCOUNTS.columns.GOOGLE].length;
    data.hasWp = adsData && !!data[csvConfig.ACCOUNTS.columns.WP];
    data.isValid = data.hasAccount || adsData !== false;

    return data;
};

export const colorLightBlue = '#2bace2';
export const colorLightBlueDs = '#b9c6cc';
export const colorDarkBlue = '#1b335f';
export const colorDarkBlueDs = '#79869d';
export const colorOrange = '#f06c50';
export const colorOrangeDs = '#a9a4a4';
export const colorGrey = '#e9f2f9';

export const colors = {
    colorLightBlue,
    colorDarkBlue,
    colorOrange,
    colorLightBlueDs,
    colorDarkBlueDs,
    colorOrangeDs,
    colorGrey,
};

export const elections = {
    p24: 'p24',
    n23: 'n23',
    s22: 's22',
    n20: 'n20',
    p19: 'p19',
};

export const icons = {
    info: {
        alt: 'Info:',
        path: (
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        ),
    },
    warning: {
        alt: 'Upozornenie:',
        path: (
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        ),
    },
};

export const links = {
    [elections.p19]: 'https://volby.transparency.sk/prezident2019/',
    [elections.n20]: 'https://volby.transparency.sk/parlament2020/',
    [elections.s22]: 'https://volby.transparency.sk/samosprava2022/',
    [elections.n23]: 'https://volby.transparency.sk/parlament2023/',
    [elections.p24]: 'https://volby.transparency.sk/prezident2024/',
    donateUrl: 'https://transparency.sk/volby',
};
