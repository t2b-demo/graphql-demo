// Dummy data
var tenants = [
    { id: '1', name : 'Novartis', accountId: '3'},
    { id: '2', name : 'Roche', accountId: '1'},
    { id: '3', name : 'Bayer', accountId: '2'},
];

var studies = [
    { id: '1', name : 'Novartis studies'},
    { id: '2', name : 'Roche studies'},
    { id: '3', name : 'Bayer studies'},
];

var accounts = [
    { id: '1', name: 'Mark Regenass', role: 'Admin', displayName: 'Mark', tenantId: '2'},
    { id: '2', name: 'Benjamin Rosenbaum', role: 'PowerUser', displayName: 'Benjamin', tenantId: '3'},
    { id: '3', name: 'Bernard Adanlessossi', role: 'User', displayName: 'Bernard', tenantId: '1'},
    { id: '4', name: 'Patrick Toenz', role: 'Guest', displayName: 'Patrick', tenantId: '2'}
];

var protocols = [
    { id: '1', name: 'First Protocol', number: 'v1.5', tag: 'Proto_Roche', tenantId: '2'},
    { id: '2', name: 'Second Protocol', number: 'v1.2', tag: 'Proto_Novartis', tenantId: '1'},
    { id: '3', name: 'Third Protocol', number: 'v2.0', tag: 'Proto_Bayer', tenantId: '3'}
];

var protocolVersions = [
    { id: '1', versionNumber: '1.5', tag: 'Latest Version' },
    { id: '2', versionNumber: '0.9', tag: 'Valid Version 1' },
    { id: '3', versionNumber: '0.5', tag: 'Valid Version 2' },
    { id: '4', versionNumber: '0.1', tag: 'draft Version' },
]

var soas = [
    { id: '1', name: 'Sequence of Activity 1', tag: 'Client Activity 1', protocolVersionId: '1' },
    { id: '2', name: 'Sequence of Activity 2', tag: 'Client Activity 2', protocolVersionId: '1' },
    { id: '3', name: 'Sequence of Activity 3', tag: 'Client Activity 3', protocolVersionId: '1' },
    { id: '4', name: 'Sequence of Activity 4', tag: 'Client Activity 4', protocolVersionId: '2' },
    { id: '5', name: 'Sequence of Activity 5', tag: 'Client Activity 5', protocolVersionId: '3' },
    { id: '6', name: 'Sequence of Activity 6', tag: 'Client Activity 6', protocolVersionId: '4' },
];

var epochs = [
    { id: '1', parentId: '1', name: 'Epoch of activity 1', ordinal: 3, isFixedAsEarliest: true, soaId: '1' },
    { id: '2', parentId: '1', name: 'Epoch of activity 2', ordinal: 3, isFixedAsEarliest: true, soaId: '2' },
    { id: '3', parentId: '2', name: 'Epoch of activity 3', ordinal: 3, isFixedAsEarliest: true, soaId: '1' },
    { id: '4', parentId: '1', name: 'Epoch of activity 4', ordinal: 3, isFixedAsEarliest: true, soaId: '3' },
    { id: '5', parentId: '3', name: 'Epoch of activity 5', ordinal: 3, isFixedAsEarliest: true, soaId: '2' },
    { id: '6', parentId: '2', name: 'Epoch of activity 6', ordinal: 3, isFixedAsEarliest: true, soaId: '3' },
];

var arms = [
    { id: '1', name: 'ARM 1', ordinal: 2, tag: 'Client Arm 1', soaId: '1' },
    { id: '2', name: 'ARM 2', ordinal: 1, tag: 'Client Arm 2', soaId: '3' },
    { id: '3', name: 'ARM 3', ordinal: 2, tag: 'Client Arm 3', soaId: '2' },
    { id: '4', name: 'ARM 4', ordinal: 3, tag: 'Client Arm 4', soaId: '1' },
    { id: '5', name: 'ARM 5', ordinal: 1, tag: 'Client Arm 5', soaId: '2' },
    { id: '6', name: 'ARM 6', ordinal: 4, tag: 'Client Arm 6', soaId: '3' },
    { id: '7', name: 'ARM 7', ordinal: 3, tag: 'Client Arm 7', soaId: '5' },
    { id: '8', name: 'ARM 8', ordinal: 5, tag: 'Client Arm 8', soaId: '6' },
];

var repeatingSequences = [
    { id: '1', beginDay: 1, occurrences: 1, interval: 1 },
    { id: '2', beginDay: 1, occurrences: 1, interval: 2 },
    { id: '3', beginDay: 1, occurrences: 1, interval: 3 },
    { id: '4', beginDay: 1, occurrences: 2, interval: 1 },
    { id: '5', beginDay: 1, occurrences: 2, interval: 2 },
    { id: '6', beginDay: 1, occurrences: 2, interval: 3 },
];

var sequencers = [
    { id: '1', specification: '2', activityId: '1', epochId: '1'},
    { id: '2', specification: '1', activityId: '2', epochId: '2'},
    { id: '3', specification: '3', activityId: '3', epochId: '3'},
    { id: '4', specification: '4', activityId: '4', epochId: '4'},
    { id: '5', specification: '5', activityId: '5', epochId: '5'},
    { id: '6', specification: '6', activityId: '6', epochId: '6'},
];

var activities = [
    { id: '1', name: 'Screening', ordinal: 1, soaId: '1', armId: '2' },
    { id: '2', name: 'Treatment', ordinal: 1, soaId: '1', armId: '1' },
    { id: '3', name: 'Follow Up', ordinal: 1, soaId: '1', armId: '3' },
    { id: '4', name: 'Screening', ordinal: 1, soaId: '1', armId: '5' },
    { id: '5', name: 'Treatment', ordinal: 1, soaId: '1', armId: '4' },
    { id: '6', name: 'Follow Up', ordinal: 1, soaId: '1', armId: '6' },
    { id: '7', name: 'Treatment', ordinal: 1, soaId: '1', armId: '7' },
    { id: '8', name: 'Screening', ordinal: 1, soaId: '1', armId: '1' },
    { id: '9', name: 'Treatment', ordinal: 1, soaId: '1', armId: '8' },
];

var visits = [
    { id: '1', name: 'First Visit', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '1' },
    { id: '2', name: 'Screening Visit', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '3' },
    { id: '3', name: 'Treatment Visit', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '2' },
    { id: '4', name: 'First Follow Up', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '4' },
    { id: '5', name: 'Second Follow Up', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '5' },
    { id: '6', name: 'Third Follow Up', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '2' },
    { id: '7', name: 'More Screening', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '1' },
    { id: '8', name: 'Second Treatment', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '3' },
];

var activityVisitData = [
    { id: '1', activityId: '1', soaId: '1'},
    { id: '2', activityId: '3', soaId: '2'},
    { id: '3', activityId: '2', soaId: '1'},
    { id: '4', activityId: '1', soaId: '2'},
    { id: '5', activityId: '4', soaId: '1'},
    { id: '6', activityId: '5', soaId: '2'},
];

var cohorts = [
    { id: '1', name: 'Cohort 1', ordinal : 1, protocolVersionId: '1'},
    { id: '2', name: 'Cohort 2', ordinal : 2, protocolVersionId: '2'},
    { id: '3', name: 'Cohort 3', ordinal : 1, protocolVersionId: '1'},
    { id: '4', name: 'Cohort 4', ordinal : 3, protocolVersionId: '2'},
    { id: '5', name: 'Cohort 5', ordinal : 1, protocolVersionId: '1'},
    { id: '6', name: 'Cohort 6', ordinal : 2, protocolVersionId: '2'},
    { id: '7', name: 'Cohort 7', ordinal : 1, protocolVersionId: '1'},
    { id: '8', name: 'Cohort 8', ordinal : 3, protocolVersionId: '2'},
    { id: '9', name: 'Cohort 9', ordinal : 1, protocolVersionId: '1'},
    { id: '10', name: 'Cohort 10', ordinal : 1, protocolVersionId: '2'},
];