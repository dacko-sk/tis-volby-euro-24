import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import DownloadLink from '../../components/general/DownloadLink';
import Loading from '../../components/general/Loading';

import { partyData } from '../../helpers/constants';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

function PartiesReports() {
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
                party.hasReport
                    ? party[csvConfig.ACCOUNTS.columns.REPORTS].map(
                          (reportUrl) => (
                              <Col key={party.name} md={6} lg={4}>
                                  <DownloadLink key={reportUrl} to={reportUrl}>
                                      {(party.image ?? false) && (
                                          <figure className="party-logo-inline">
                                              {party.image}
                                          </figure>
                                      )}

                                      <h3 className="text-secondary my-0">
                                          {party.name}
                                          {party[
                                              csvConfig.ACCOUNTS.columns.REPORTS
                                          ].length > 1 && (
                                              <div className="fs-6">
                                                  ({reportUrl.split('/').pop()})
                                              </div>
                                          )}
                                      </h3>
                                  </DownloadLink>
                              </Col>
                          )
                      )
                    : []
            )}
        </Row>
    );
}

export default PartiesReports;
