import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
// import { routes } from '../helpers/routes';
import { wpCat } from '../helpers/wp';

import Top10 from '../components/accounts/Top10';
import TotalSpending from '../components/accounts/TotalSpending';
// import Top10Ads from '../components/ads/Top10Ads';
// import CandidatesGallery from '../components/candidates/CandidatesGallery';
import DonateButton from '../components/general/DonateButton';
import ElectionsCountdown from '../components/general/ElectionsCountdown';
import Title from '../components/structure/Title';
import Posts, { templates } from '../components/wp/Posts';

function Home() {
    setTitle(t(labels.home.pageTitle));

    return (
        <section>
            <Title secondaryWords={1} uppercase>
                {t(labels.home.pageTitle)}
            </Title>

            <Row className="gy-3 gy-lg-0 text-center mb-4">
                <Col lg={6}>
                    <ElectionsCountdown
                        start="2024-06-08T07:00:00"
                        end="2024-06-08T22:00:00"
                    />
                </Col>
                <Col lg={6}>
                    <TotalSpending />
                </Col>
            </Row>

            <Top10 />

            <div className="text-center mb-4">
                <DonateButton long xl />
            </div>

            {/* <CandidatesGallery /> */}

            {/* <Posts
                categories={[wpCat.featured]}
                showMore={t(labels.analyses.showAll)}
                showMoreLink={routes.analyses()}
                template={templates.featured}
            /> */}

            {/* <Top10Ads /> */}

            <h2 className="mt-4 mb-3">{t(labels.news.latest)}</h2>
            <Posts
                categories={[wpCat.news]}
                limit={2}
                template={templates.condensed}
            />
        </section>
    );
}

export default Home;
