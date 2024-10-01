import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import DownloadLink from '../../components/general/DownloadLink';
import Loading from '../../components/general/Loading';

import { partyData } from '../../helpers/parties';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

function PartiesCandidates() {
    const { getAllPartiesNames, getPartyAdsData } = useAdsData();

    const allParties = (getAllPartiesNames() ?? []).map((name) => {
        const adsData = getPartyAdsData(name);
        return partyData(name, false, adsData);
    });

    if (!allParties.length) {
        return <Loading />;
    }

    return (
        <Row>
            {allParties.flatMap((party) =>
                party.hasCL
                    ? [
                          <Col key={party.name} md={6} lg={4}>
                              <DownloadLink
                                  to={party[csvConfig.ACCOUNTS.columns.CL]}
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
    );
}

export default PartiesCandidates;
