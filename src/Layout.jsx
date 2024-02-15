import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useGoogleSheets from 'use-google-sheets';
import { useQuery } from '@tanstack/react-query';

import { scrollToTop } from './helpers/browser';

import Header from './components/structure/Header';
import Footer from './components/structure/Footer';
import DonateBanner from './components/general/DonateBanner';
// import DonateModal from './components/general/DonateModal';

import useAccountsData from './hooks/AccountsData';
import useAdsData, {
    loadingErrorMetaApi,
    loadingErrorSheets,
    metaApiUrl,
    processDataMetaApi,
    processDataSheets,
    sheetsId,
} from './hooks/AdsData';

function Layout() {
    const { pathname } = useLocation();
    const { loadAccountsData } = useAccountsData();
    const { metaApiData, setMetaApiData, setSheetsData } = useAdsData();

    // load transparent accounts data on first apge load
    useEffect(() => {
        loadAccountsData();
    }, []);

    // load ads data from google sheet
    const {
        data: gsData,
        loading: gsLoading,
        error: gsError,
    } = useGoogleSheets({
        apiKey: process.env.REACT_APP_SHEETS_API_KEY,
        sheetId: sheetsId,
    });
    // store ads data in context provider once loaded
    useEffect(() => {
        if (gsError) {
            const parsed = loadingErrorSheets(gsError);
            setSheetsData(parsed);
        } else if (!gsLoading && gsData) {
            const parsed = processDataSheets(gsData);
            setSheetsData(parsed);
        }
    }, [gsData, gsLoading, gsError]);

    // load ads data from meta API & reload every 12 hours
    const d = new Date();
    const reloadKey = `${d.getMonth() + 1}${d.getDate()}${Math.floor(
        d.getHours() / 12
    )}`;
    const {
        isLoading: maLoading,
        error: maError,
        data: maData,
    } = useQuery([`meta_api_all_${reloadKey}`], () =>
        fetch(`${metaApiUrl}?${reloadKey}`).then((response) => response.json())
    );
    // store meta API data in context provider once loaded
    useEffect(() => {
        if (maError) {
            const parsed = loadingErrorMetaApi(maError, metaApiData);
            setMetaApiData(parsed);
        } else if (!maLoading && maData) {
            const parsed = processDataMetaApi(maData);
            if (parsed.lastUpdate > metaApiData.lastUpdate) {
                setMetaApiData(parsed);
            }
        }
    }, [maData, maLoading, maError]);

    // send pageview to analytics on route change
    useEffect(() => {
        if (!window.location.href.includes('localhost')) {
            window.dataLayer.push({
                event: 'pageview',
                page: {
                    path: pathname,
                    title: document.title,
                },
            });
        }
    }, [pathname]);

    // scroll to top when route changes
    useEffect(() => {
        scrollToTop();
    }, [pathname]);

    return (
        <div className="layout-default">
            <Header />

            <main className="container mb-4">
                <Outlet />
            </main>

            <DonateBanner />

            <Footer />
            {/* <DonateModal /> */}
        </div>
    );
}

export default Layout;
