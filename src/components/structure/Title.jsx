import { nl2r, secondarySentenceEnding as se } from '../../helpers/helpers';

function Title({
    children,
    secondary = '',
    secondaryWords = 0,
    uppercase = false,
}) {
    let primaryLength = 0;
    let content = children;
    if (typeof children === 'string') {
        primaryLength += children.length;
        content = nl2r(children);
    } else if (typeof children === 'object') {
        Object.keys(children).forEach((key) => {
            if (typeof children[key] === 'string') {
                primaryLength += children[key].length;
            }
        });
    }
    return (
        <header
            className={`${
                primaryLength + (secondary || '').length < 65 ? 'hero ' : ''
            }mb-4`}
        >
            <h1 className={uppercase ? 'text-uppercase' : ''}>
                {secondaryWords ? se(content, secondaryWords) : content}
                {!!secondary && (
                    <span className="text-secondary"> {secondary}</span>
                )}
            </h1>
        </header>
    );
}

export default Title;
