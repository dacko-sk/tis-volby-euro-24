import { colors } from './constants';
import { csvConfig } from '../hooks/AdsData';

export const regionKeys = {
    BA: 'BA',
    BB: 'BB',
    KE: 'KE',
    NR: 'NR',
    PO: 'PO',
    TN: 'TN',
    TT: 'TT',
    ZA: 'ZA',
};
export const regionOptions = {
    [regionKeys.BA]: {
        size: 677024,
        color: colors.colorLightBlue,
    },
    [regionKeys.BB]: {
        size: 643102,
        color: colors.colorOrange,
    },
    [regionKeys.KE]: { size: 802092, color: '#c19c00' },
    [regionKeys.NR]: { size: 671508, color: '#75066e' },
    [regionKeys.PO]: { size: 827028, color: '#cd2b26' },
    [regionKeys.TN]: { size: 582567, color: colors.colorDarkBlue },
    [regionKeys.TT]: { size: 565324, color: '#1f1a17' },
    [regionKeys.ZA]: { size: 691136, color: '#18943c' },
};

export const genderKeys = {
    female: 'female',
    male: 'male',
    unknown: 'unknown',
};
export const genderColors = {
    [genderKeys.female]: colors.colorOrange,
    [genderKeys.male]: colors.colorDarkBlue,
    [genderKeys.unknown]: colors.colorGrey,
};

export const attributionKeys = {
    YES: 'YES',
    NO: 'NO',
    'N/A': 'N/A',
};
export const attributionColors = {
    [attributionKeys.YES]: colors.colorDarkBlue,
    [attributionKeys.NO]: colors.colorOrange,
    [attributionKeys['N/A']]: colors.colorGrey,
};

export const ageColors = {
    '13-17': '#1f1a17',
    '18-24': '#c19c00',
    '25-34': '#18943c',
    '35-44': colors.colorLightBlue,
    '45-54': colors.colorDarkBlue,
    '55-64': '#75066e',
    '65+': colors.colorOrange,
};

const googleColumns = csvConfig.GOOGLE.columns;
export const formatDefs = {
    [googleColumns.VIDEO]: colors.colorOrange,
    [googleColumns.IMAGE]: colors.colorDarkBlue,
    [googleColumns.TEXT]: colors.colorLightBlue,
};
