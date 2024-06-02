import Nav from 'react-bootstrap/Nav';
import { NavLink, Outlet } from 'react-router-dom';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { routes, segments } from '../helpers/routes';

import Title from '../components/structure/Title';

function Parties() {
    setTitle(t(labels.parties.navTitle));

    return (
        <section>
            <Title>{t(labels.parties.navTitle)}</Title>

            <div className="tabs-scrollable mb-4">
                <Nav variant="tabs">
                    <Nav.Link as={NavLink} to={routes.parties()} end>
                        {t(labels.account.title)}
                    </Nav.Link>
                    <Nav.Link
                        as={NavLink}
                        to={routes.parties(segments.CANDIDATES)}
                    >
                        {t(labels.parties.candidatesLists)}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={routes.parties(segments.ASSETS)}>
                        {t(labels.parties.assets)}
                    </Nav.Link>
                </Nav>
            </div>

            <Outlet />
        </section>
    );
}

export default Parties;
