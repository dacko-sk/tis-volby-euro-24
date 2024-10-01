import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import DownloadLink from '../../components/general/DownloadLink';
import Loading from '../../components/general/Loading';

import { labels, t } from '../../helpers/dictionary';
import { partyData } from '../../helpers/parties';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

function PartiesAssets() {
    const { getAllPartiesNames, getPartyAdsData } = useAdsData();

    const allParties = (getAllPartiesNames() ?? []).map((name) => {
        const adsData = getPartyAdsData(name);
        return partyData(name, false, adsData);
    });

    if (!allParties.length) {
        return <Loading />;
    }

    return (
        <>
            <h2 className="mb-4">{t(labels.parties.extendedAssets)}</h2>
            <Row>
                {allParties.flatMap((party) =>
                    party.hasAssets
                        ? [
                              <Col key={party.name} md={6} lg={4}>
                                  <DownloadLink
                                      to={
                                          party[
                                              csvConfig.ACCOUNTS.columns.ASSETS
                                          ]
                                      }
                                  >
                                      {(party.image ?? false) && (
                                          <figure className="party-logo-inline">
                                              {party.image}
                                          </figure>
                                      )}

                                      <h3 className="text-secondary my-0">
                                          {party.name}
                                      </h3>
                                  </DownloadLink>
                              </Col>,
                          ]
                        : []
                )}
            </Row>
        </>
    );
}

export default PartiesAssets;
