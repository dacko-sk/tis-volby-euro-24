import { createContext, useContext, useMemo, useState } from 'react';

import {
    fixNumber,
    getTimestampFromDate,
    isNumeric,
    sortAlphabetically,
} from '../helpers/helpers';

export const sheetsId = '1HH5RdyPynYm3vNolZaTmBmh7GzDAGeDNdL7AXmemYX4';

export const csvConfig = {
    ACCOUNTS: {
        columns: {
            SHORT_NAME: 'Skratka',
            FULL_NAME: 'Plný názov strany',
            FB: 'FB Účty',
            GOOGLE: 'Google účty',
            TA_NAME: 'Transparentný účet',
            WP: 'WP tag',
            CANDIDATES_LIST: 'Kandidátne listiny',
        },
        name: 'účty',
    },
    GOOGLE: {
        columns: {
            ID: 'ID',
            PAGE_NAME: 'Inzerent',
            SPENDING: 'Výdavky na reklamu',
            AMOUNT: 'Počet reklám',
            VIDEO: 'Video',
            IMAGE: 'Obrázková',
            TEXT: 'Textová',
            UPDATED: 'Aktualizácia',
        },
        name: 'Google reklama',
    },
    META: {
        columns: {
            PAGE_ID: 'Page ID',
            PAGE_NAME: 'Page name',
            SPENDING: 'Amount spent (EUR)',
        },
        endDate: '21.1.2024',
    },
};

export const metaApiUrl =
    'https://volby.transparency.sk/api/meta/euro24/ads_json.php';

export const VAT = 1.2;

const initialState = {
    sheetsData: {
        error: null,
        googleAds: [],
        metaAds: {},
        lastUpdateFb: 0,
        lastUpdateGgl: 0,
        loaded: false,
        parties: {},
    },
    metaApiData: {
        error: null,
        pages: {},
        lastUpdate: 0,
        loaded: false,
    },
};

const filterPoliticAccounts = (parties) => (account) => {
    if (account[csvConfig.META.columns.PAGE_ID] ?? false) {
        return !!Object.values(parties).find((party) =>
            party[csvConfig.ACCOUNTS.columns.FB].includes(
                account[csvConfig.META.columns.PAGE_ID]
            )
        );
    }
    return false;
};

export const loadingErrorSheets = (error) => {
    return { ...initialState.sheetsData, error, loaded: true };
};

export const processDataSheets = (data) => {
    const pd = { ...initialState.sheetsData, loaded: true };
    if (Array.isArray(data)) {
        data.forEach((sheet) => {
            switch (sheet.id ?? '') {
                case csvConfig.ACCOUNTS.name: {
                    sheet.data.forEach((row) => {
                        pd.parties[row[csvConfig.ACCOUNTS.columns.SHORT_NAME]] =
                            {
                                [csvConfig.ACCOUNTS.columns.FULL_NAME]:
                                    row[csvConfig.ACCOUNTS.columns.FULL_NAME] ??
                                    null,
                                [csvConfig.ACCOUNTS.columns.FB]:
                                    row[csvConfig.ACCOUNTS.columns.FB] ?? false
                                        ? row[csvConfig.ACCOUNTS.columns.FB]
                                              .replaceAll(' ', '')
                                              .split(',')
                                        : [],
                                [csvConfig.ACCOUNTS.columns.GOOGLE]:
                                    row[csvConfig.ACCOUNTS.columns.GOOGLE] ??
                                    false
                                        ? row[csvConfig.ACCOUNTS.columns.GOOGLE]
                                              .replaceAll(' ', '')
                                              .split(',')
                                        : [],
                                [csvConfig.ACCOUNTS.columns.TA_NAME]:
                                    row[csvConfig.ACCOUNTS.columns.TA_NAME] ??
                                    null,
                                [csvConfig.ACCOUNTS.columns.WP]:
                                    row[csvConfig.ACCOUNTS.columns.WP] ?? false
                                        ? fixNumber(
                                              row[csvConfig.ACCOUNTS.columns.WP]
                                          )
                                        : null,
                                [csvConfig.ACCOUNTS.columns.CANDIDATES_LIST]:
                                    row[
                                        csvConfig.ACCOUNTS.columns
                                            .CANDIDATES_LIST
                                    ] ?? null,
                            };
                    });
                    break;
                }
                case csvConfig.GOOGLE.name: {
                    pd.googleAds = sheet.data;
                    sheet.data.forEach((pageData) => {
                        const time = getTimestampFromDate(
                            pageData[csvConfig.GOOGLE.columns.UPDATED]
                        );
                        if (time > pd.lastUpdateGgl) {
                            pd.lastUpdateGgl = time;
                        }
                    });
                    break;
                }
                default: {
                    const words = sheet.id.split(' ');
                    const date = words.length
                        ? words[words.length - 1]
                        : csvConfig.META.endDate;
                    pd.metaAds[date] = sheet.data.filter(
                        filterPoliticAccounts(pd.parties)
                    );
                    pd.lastUpdateFb = getTimestampFromDate(date);
                }
            }
        });
    }
    return pd;
};

export const loadingErrorMetaApi = (error, originalData) => {
    return { ...originalData, error, loaded: true };
};

export const processDataMetaApi = (data) => {
    if (data.pages ?? false) {
        const pd = { ...initialState.metaApiData, ...data, loaded: true };
        Object.entries(data.pages).forEach(([pageId, pageProps]) => {
            // find highest date
            pd.lastUpdate = Math.max(pd.lastUpdate, pageProps.updated ?? 0);
            // calculate amounts with VAT
            pd.pages[pageId].spend.min = pageProps.spend.min * VAT;
            pd.pages[pageId].spend.max = pageProps.spend.max * VAT;
            pd.pages[pageId].spend.est = pageProps.spend.est * VAT;
        });
        return pd;
    }
    return data;
};

const AdsDataContext = createContext(initialState);

export const AdsDataProvider = function ({ children }) {
    const [sheetsData, setSheetsData] = useState(initialState.sheetsData);
    const [metaApiData, setMetaApiData] = useState(initialState.metaApiData);

    // selectors

    const getAllFbAccounts = () => {
        const all = [];
        Object.values(sheetsData.parties).forEach((party) => {
            all.push(...party[csvConfig.ACCOUNTS.columns.FB]);
        });
        return all;
    };

    const mergedWeeksData = () => {
        const accounts = {};
        // add weekly spending from all weeks
        Object.values(sheetsData.metaAds).forEach((week) => {
            week.forEach((account) => {
                if (isNumeric(account[csvConfig.META.columns.SPENDING])) {
                    if (
                        !(
                            accounts[account[csvConfig.META.columns.PAGE_ID]] ??
                            false
                        )
                    ) {
                        accounts[account[csvConfig.META.columns.PAGE_ID]] = {
                            name: account[csvConfig.META.columns.PAGE_NAME],
                            outgoing: 0,
                        };
                    }
                    accounts[
                        account[csvConfig.META.columns.PAGE_ID]
                    ].outgoing +=
                        Number(account[csvConfig.META.columns.SPENDING]) * VAT;
                }
            });
        });

        return accounts;
    };

    const getPartyAdsData = (name) =>
        sheetsData.loaded ? sheetsData.parties[name] ?? false : null;

    const findPartyForMetaAccount = (accountId) => {
        const found = Object.entries(sheetsData.parties).find(([, party]) =>
            party[csvConfig.ACCOUNTS.columns.FB].includes(accountId)
        );
        return found ? found[0] : null;
    };

    const findPartyByName = (name) =>
        Object.entries(sheetsData.parties).find(([shortName, party]) =>
            [
                shortName,
                party[csvConfig.ACCOUNTS.columns.FULL_NAME],
                party[csvConfig.ACCOUNTS.columns.TA_NAME],
            ].includes(name)
        );

    const getPartyShortName = (name) => {
        const found = findPartyByName(name);
        return found ? found[0] : name;
    };

    const getPartyFullName = (name) => {
        const found = findPartyByName(name);
        if (found) {
            return (
                // return full name if not empty, otherwise short name
                found[1][csvConfig.ACCOUNTS.columns.FULL_NAME] || found[0]
            );
        }
        return '';
    };

    const getPartyAccountName = (name) => {
        const found = findPartyByName(name);
        if (found) {
            // return transparent account name if not empty, otherwise short name
            return found[1][csvConfig.ACCOUNTS.columns.TA_NAME] || found[0];
        }
        return name;
    };

    const getAllPartiesNames = (transparentAccountNames = []) => {
        if (!sheetsData.loaded) {
            return null;
        }
        return Array.from(
            new Set([
                ...(transparentAccountNames ?? []).map((name) =>
                    getPartyShortName(name)
                ),
                ...Object.keys(sheetsData.parties),
            ])
        ).sort(sortAlphabetically(true));
    };

    const value = useMemo(
        () => ({
            sheetsData,
            setSheetsData,
            metaApiData,
            setMetaApiData,
            allFbAccounts: getAllFbAccounts(),
            mergedWeeksData: mergedWeeksData(),
            getPartyAdsData,
            findPartyForMetaAccount,
            getPartyAccountName,
            getPartyShortName,
            getPartyFullName,
            getAllPartiesNames,
        }),
        [sheetsData, metaApiData]
    );

    return (
        <AdsDataContext.Provider value={value}>
            {children}
        </AdsDataContext.Provider>
    );
};

const useAdsData = () => {
    const context = useContext(AdsDataContext);

    if (context === undefined) {
        throw new Error('useAdsData must be used within an AdsDataContext');
    }

    return context;
};

export default useAdsData;
