import { getCurrentLocale } from './routes';

export const isNumeric = (value) => !Number.isNaN(Number(value));

export const fixNumber = (value) =>
    Number(value.replace(',', '.').replace(' ', ''));

export const slovakFormat = (value, options) =>
    new Intl.NumberFormat(getCurrentLocale(), options).format(value);

export const numFormat = (value) => slovakFormat(value, {});

export const pctFormat = (value) => {
    const num = Number(value);
    if (!Number.isNaN(num)) {
        return `${numFormat(num)} %`;
    }
    return '';
};

export const badgePctFormat = (value) =>
    Number(value) > -1 ? pctFormat(value) : 'N/A';

export const humanPctFormat = (value) =>
    pctFormat(100 * value, { maximumFractionDigits: 2 });

export const humanPctSignFormat = (value) =>
    pctFormat(100 * value, {
        maximumFractionDigits: 2,
        signDisplay: 'exceptZero',
    });

export const wholeNumFormat = (value) =>
    slovakFormat(value, {
        maximumFractionDigits: 0,
    });

export const currencyFormat = (value) =>
    slovakFormat(value, {
        style: 'currency',
        currency: 'EUR',
    });

export const wholeCurrencyFormat = (value) =>
    slovakFormat(value, {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
        // unit: 'million',
        notation: 'compact',
    });

export const slovakDateFormat = (timestamp, options) =>
    new Intl.DateTimeFormat(getCurrentLocale(), options).format(
        new Date(typeof timestamp === 'number' ? 1000 * timestamp : timestamp)
    );

export const dateTimeFormat = (timestamp) =>
    slovakDateFormat(timestamp, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

export const dateFormat = (timestamp) =>
    slovakDateFormat(timestamp, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

export const dateNumericFormat = (timestamp) =>
    slovakDateFormat(timestamp, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

export const datePickerFormat = (timestamp) =>
    timestamp
        ? new Date(
              timestamp.toString().length >= 10 ? timestamp * 1000 : timestamp
          )
              .toISOString()
              .split('T')[0]
        : '';

export const getTimeFromDate = (string) => {
    const t = new Date(string).getTime();
    return Number.isNaN(t) ? 0 : t / 1000;
};

export const getTimestampFromDate = (date) => {
    const dateParts = date.replaceAll('/', '.').replaceAll(' ', '').split('.');
    return dateParts.length === 3
        ? new Date(
              `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} 23:59:59`
          ).getTime() / 1000
        : 0;
};

export const shortenValue = (value, length, removals) => {
    if (value) {
        let shorten = value;
        if (Array.isArray(removals)) {
            removals.forEach((removal) => {
                shorten = shorten.replace(removal, '');
            });
        }
        if (typeof shorten === 'string' && shorten.length > length) {
            return `${shorten.substring(0, length)}…`;
        }
        return shorten;
    }
    return '';
};

export const shortenUrl = (value) =>
    shortenValue(value, 32, ['https://', 'www.']);

export const fixUrl = (url) =>
    url.startsWith('http') ? url : `https://${url}`;

export const decodeHTMLEntities = (rawStr) =>
    rawStr
        ? rawStr.replace(
              /&#(\d+);/g,
              (match, dec) => `${String.fromCharCode(dec)}`
          )
        : '';

/**
 * Break text separated by newline character to react fragments separated with <br/> tag
 */
export const nl2r = (text) =>
    typeof text === 'string' && text.includes('\n')
        ? text.split('\n').map((fragment, index) => {
              const k = index + fragment;
              return (
                  <span key={k}>
                      {index > 0 && <br />}
                      {fragment}
                  </span>
              );
          })
        : text;

/**
 * Highlight last n words of the sentence in text-secondary (orange) style
 */
export const secondarySentenceEnding = (textOrReact, wordsAmount, isLast) => {
    if (isLast ?? true) {
        const wa = wordsAmount || 1;
        if (typeof textOrReact === 'string') {
            const words = textOrReact.split(' ');
            return (
                <span key={textOrReact}>
                    {`${words.slice(0, words.length - wa).join(' ')} `}
                    <span className="text-secondary">
                        {words.slice(-wa).join(' ')}
                    </span>
                </span>
            );
        }
        if (Array.isArray(textOrReact)) {
            return textOrReact.map((item, index) =>
                secondarySentenceEnding(
                    item,
                    wa,
                    index === textOrReact.length - 1
                )
            );
        }
        if (
            typeof textOrReact === 'object' &&
            (textOrReact.props.children ?? false)
        ) {
            const children = Object.values(textOrReact.props.children);
            return children.map((child, index) =>
                secondarySentenceEnding(
                    child,
                    wa,
                    index === children.length - 1
                )
            );
        }
    }
    return textOrReact;
};

export const sortNumbers = (asc) => (a, b) => (asc ?? true ? a - b : b - a);

export const sortByNumericProp = (prop, asc) => (a, b) =>
    asc ? a[prop] - b[prop] : b[prop] - a[prop];

export const sortByTextProp = (prop) => (a, b) =>
    a[prop].localeCompare(b[prop]);

export const sortByName = sortByTextProp('name');

export const sortAlphabetically = (asc) => (a, b) =>
    asc ?? true ? a.localeCompare(b) : b.localeCompare(a);

export const getLastWord = (inputString) => {
    if (!inputString.trim()) {
        return '';
    }

    const words = inputString.split(' ');
    return words[words.length - 1];
};

export const sortBySurname = (a, b) =>
    getLastWord(a).localeCompare(getLastWord(b));

export const sumOfValues = (obj) =>
    Object.values(obj).reduce((sum, val) => sum + val, 0);

export const removeAccentsFromString = (str) =>
    str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

export const compareStr = (a, b) =>
    a &&
    b &&
    removeAccentsFromString(a.toLowerCase().trim()) ===
        removeAccentsFromString(b.toLowerCase().trim());

export const contains = (haystack, needle) =>
    haystack &&
    needle &&
    removeAccentsFromString(haystack.toLowerCase()).includes(
        removeAccentsFromString(needle.toLowerCase().trim())
    );

export const swapName = (name) => {
    const [first, second] = name.split(' ');
    return first && second ? `${second} ${first}` : name;
};

export const generateRandomString = (length) =>
    [...Array(length ?? 6)].map(() => Math.random().toString(36)[2]).join('');
