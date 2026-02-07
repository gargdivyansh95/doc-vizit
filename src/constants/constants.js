export const COUNTRY_CODE = '91';

const COMMON_DEFAULTS = {
    useFor: '',
    accessDuration: 12,
    documentScope: 'single',
};

// share report form contants
export const SHARE_FORM_DEFAULTS = {
    phone: {
        shareMethod: 'phone',
        recipentName: '',
        recipientMobile: '',
        ...COMMON_DEFAULTS,
    },
    link: {
        shareMethod: 'link',
        ...COMMON_DEFAULTS,
    },
    group: {
        shareMethod: 'group',
        familyAccess: '',
        accessLevel: '',
        ...COMMON_DEFAULTS,
    },
}

export const REPORT_SORTING_OPTIONS = [
    { id: 'newest', label: 'Newest first (Default)', value: 'newest' },
    { id: 'oldest', label: 'Oldest first', value: 'oldest' },
    { id: 'name-asc', label: 'Report name (A–Z)', value: 'name-asc' },
    { id: 'name-desc', label: 'Report name (Z–A)', value: 'name-desc' }
];

export const REPORT_FILTER_OPTIONS = {
    reportType: [
        { id: 'lab', label: 'Lab Reports' },
        { id: 'prescription', label: 'Prescriptions' }
    ],
    aiStatus: [
        { id: 'summary', label: 'AI summary generated' },
        { id: 'analysis', label: 'Analysis in progress' },
        { id: 'notAnalyzed', label: 'Not analyzed' }
    ]
};

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const heightFeet = ['4', '5', '6', '7'];

export const heightInches = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

export const genders = ['Male', 'Female'];

export const relations = [
    {
        id: 'father',
        label: 'Father',
    },
    {
        id: 'mother',
        label: 'Mother',
    },
    {
        id: 'spouse',
        label: 'Spouse',
    },
    {
        id: 'son',
        label: 'Son',
    },
    {
        id: 'daughter',
        label: 'Daughter',
    },
    {
        id: 'guardian',
        label: 'Guardian',
    },
    {
        id: 'other',
        label: 'Other',
    }
]
