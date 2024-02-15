import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import { labels, t } from '../helpers/dictionary';

// import Google from '../components/ads/Google';
import Meta from '../components/ads/Meta';
import Title from '../components/structure/Title';

function Online() {
    return (
        <section className="charts-page">
            <Title>{t(labels.ads.pageTitle)}</Title>
            <Tab.Container id="providers" defaultActiveKey="facebook">
                <div className="tabs-scrollable">
                    <Nav variant="tabs">
                        <Nav.Link eventKey="facebook">
                            {t(labels.ads.meta.title)}
                        </Nav.Link>
                        {/* <Nav.Link eventKey="google">
                            {t(labels.ads.google.title)}
                        </Nav.Link> */}
                    </Nav>
                </div>

                <Tab.Content className="mt-4">
                    <Tab.Pane eventKey="facebook">
                        <Meta />
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey="google"><Google /></Tab.Pane> */}
                </Tab.Content>
            </Tab.Container>
        </section>
    );
}

export default Online;
