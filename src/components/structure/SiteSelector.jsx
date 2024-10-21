import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { elections as el, links } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { languageRoot, routes } from '../../helpers/routes';

function SiteSelector({ site }) {
    return (
        <NavDropdown
            title={t(labels.home.navTitle)}
            id="elections-menu"
            className={
                languageRoot() === document.location.pathname ? 'show' : ''
            }
        >
            {site ? (
                <NavDropdown.Item href="/">{t(labels.root)}</NavDropdown.Item>
            ) : (
                <NavDropdown.Item as={NavLink} to={routes.home()}>
                    {t(labels.root)}
                </NavDropdown.Item>
            )}
            {Object.keys(el).map((e) =>
                site === e ? (
                    <NavDropdown.Item key={e} as={NavLink} to={routes.home()}>
                        {t(labels.elections[e])}
                    </NavDropdown.Item>
                ) : (
                    <NavDropdown.Item key={e} href={links[e]}>
                        {t(labels.elections[e])}
                    </NavDropdown.Item>
                )
            )}
        </NavDropdown>
    );
}

export default SiteSelector;
