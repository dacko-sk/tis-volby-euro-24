import { useState } from 'react';

import { labels, t } from '../../helpers/dictionary';

import './ReadMore.scss';

function ReadMore({ children, id = 'readmore', lines = 2 }) {
    const [open, setOpen] = useState(false);

    const toggle = (e) => {
        e.preventDefault();
        setOpen(!open);
    };
    const keyUpHandler = (event) => {
        if (event.keyCode === 13) {
            setOpen(!open);
        }
    };

    return (
        <div className={`readmore${open ? '' : ' closed'}`}>
            <div
                id={id}
                style={open ? {} : { maxHeight: `${lines * 1.5}em` }}
                onClick={toggle}
                onKeyUp={keyUpHandler}
                role="button"
                tabIndex={0}
            >
                {children}
            </div>
            {!open && (
                <a
                    href={`#${id}`}
                    className="d-block text-center"
                    onClick={toggle}
                >
                    {t(labels.readMore)}
                </a>
            )}
        </div>
    );
}

export default ReadMore;
