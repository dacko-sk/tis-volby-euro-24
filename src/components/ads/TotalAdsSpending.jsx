import { Col, Row } from 'react-bootstrap';

import { labels, t } from '../../helpers/dictionary';
import { currencyFormat /* , fixNumber */ } from '../../helpers/helpers';

import useAdsData /* , { csvConfig } */ from '../../hooks/AdsData';

import LastUpdateTag from '../general/LastUpdateTag';
import Loading from '../general/Loading';

function TotalAdsSpending(/* {
    googleColumns = csvConfig.GOOGLE.columns,
} */) {
    const { sheetsData, mergedWeeksData } = useAdsData();

    // parse data
    let totalMeta = 0;
    // let totalGoogle = 0;
    if (sheetsData.lastUpdateFb) {
        Object.values(mergedWeeksData).forEach((pageProps) => {
            totalMeta += pageProps.outgoing;
        });
    }
    // if (sheetsData.lastUpdateGgl) {
    //     sheetsData.googleAds.forEach((pageProps) => {
    //         totalGoogle += fixNumber(pageProps[googleColumns.SPENDING]);
    //     });
    // }

    return (
        <div className="mt-4">
            <Row className="gy-3 gy-lg-0 text-center mb-4">
                <Col lg={6}>
                    <h2>{t(labels.ads.meta.totalSpendingTitle)}</h2>
                    <div className="hero-number">
                        {sheetsData.lastUpdateFb ? (
                            currencyFormat(totalMeta)
                        ) : (
                            <Loading small />
                        )}
                        <LastUpdateTag
                            timestamp={sheetsData.lastUpdateFb || null}
                        >
                            {t(labels.ads.meta.totalDisclaimer)}
                        </LastUpdateTag>
                    </div>
                </Col>
                {/* <Col lg={6}>
                    <h2>{t(labels.ads.google.totalSpendingTitle)}</h2>
                    <div className="hero-number">
                        {sheetsData.lastUpdateGgl ? (
                            currencyFormat(totalGoogle)
                        ) : (
                            <Loading small />
                        )}
                        <LastUpdateTag
                            timestamp={sheetsData.lastUpdateGgl || null}
                        >
                            {t(labels.ads.google.totalDisclaimer)}
                        </LastUpdateTag>
                    </div>
                </Col> */}
            </Row>
        </div>
    );
}

export default TotalAdsSpending;
