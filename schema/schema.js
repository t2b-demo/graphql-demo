const graphql = require('graphql');
const _ = require('lodash');

const Tenant = require('../model/account');
const Account = require('../model/account');
const Activity = require('../model/activity');
const Epoch = require('../model/epoch');

const { 
    GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLBoolean,
     GraphQLList
} = graphql;

// Dummy data
var tenants = [
    { id: '1', name : 'Novartis', accountId: '3'},
    { id: '2', name : 'Roche', accountId: '1'},
    { id: '3', name : 'Bayer', accountId: '2'},
];
var accounts = [
    { id: '1', name: 'Mark Regenass', role: 'Admin', displayName: 'Mark', tenantId: '2'},
    { id: '2', name: 'Benjamin Rosenbaum', role: 'PowerUser', displayName: 'Benjamin', tenantId: '3'},
    { id: '3', name: 'Bernard Adanlessossi', role: 'User', displayName: 'Bernard', tenantId: '1'},
    { id: '4', name: 'Patrick Toenz', role: 'Guest', displayName: 'Patrick', tenantId: '2'},
    { id: '5', name: 'Stefan Mueller', role: 'Admin', displayName: 'Stefan', tenantId: '1'},
    { id: '6', name: 'Richard David', role: 'Admin', displayName: 'Richard', tenantId: '3'},
    { id: '7', name: 'Michael Pitchert', role: 'PowerUser', displayName: 'Michael', tenantId: '2'},
    { id: '8', name: 'Louis Demgunner', role: 'PowerUser', displayName: 'Louis', tenantId: '1'},
    { id: '9', name: 'Anthony James', role: 'User', displayName: 'Anthony', tenantId: '2'},
    { id: '10', name: 'Christoph Limpalair', role: 'Guest', displayName: 'Christoph', tenantId: '3'},
    { id: '11', name: 'Karin Soltenberg', role: 'Guest', displayName: 'Karin', tenantId: '1'},
    { id: '12', name: 'AJ Jefferson', role: 'User', displayName: 'AJ', tenantId: '3'},
];
var protocols = [
    { id: '1', name: 'Variability of Parkinson Disease', protocolNumber: '1', tag: 'Proto_Roche', tenantId: '2', protocolVersionId: '1'},
    { id: '2', name: 'Evolution of Prostata Cancer', protocolNumber: '2', tag: 'Proto_Novartis', tenantId: '1', protocolVersionId: '2'},
    { id: '3', name: 'Comparison of Dingue and H1N1 Diseases', protocolNumber: '3', tag: 'Proto_Bayer', tenantId: '3', protocolVersionId: '3'}
];
var protocolVersions = [
    { id: '1', versionNumber: '1.5', tag: 'Latest Version' },
    { id: '2', versionNumber: '0.9', tag: 'Valid Version 1' },
    { id: '3', versionNumber: '0.5', tag: 'Valid Version 2' },
    { id: '4', versionNumber: '0.1', tag: 'draft Version' },
];
var soas = [
    { id: '1', name: 'Sequence of Activity 1', tag: 'Client Activity 1', protocolVersionId: '1' },
    { id: '2', name: 'Sequence of Activity 2', tag: 'Client Activity 2', protocolVersionId: '1' },
    { id: '3', name: 'Sequence of Activity 3', tag: 'Client Activity 3', protocolVersionId: '1' },
    { id: '4', name: 'Sequence of Activity 4', tag: 'Client Activity 4', protocolVersionId: '2' },
    { id: '5', name: 'Sequence of Activity 5', tag: 'Client Activity 5', protocolVersionId: '3' },
    { id: '6', name: 'Sequence of Activity 6', tag: 'Client Activity 6', protocolVersionId: '4' },
];
var epochs = [
    { id: '1', parentId: '1', name: 'Screening', ordinal: 1, isFixedAsEarliest: true, soaId: '1' },
    { id: '2', parentId: '1', name: 'Treatment', ordinal: 2, isFixedAsEarliest: true, soaId: '1' },
    { id: '3', parentId: '2', name: 'Follow Up', ordinal: 3, isFixedAsEarliest: true, soaId: '1' },
    { id: '4', parentId: '1', name: 'Screening', ordinal: 1, isFixedAsEarliest: true, soaId: '2' },
    { id: '5', parentId: '3', name: 'Treatment', ordinal: 2, isFixedAsEarliest: true, soaId: '2' },
    { id: '6', parentId: '2', name: 'Follow Up', ordinal: 3, isFixedAsEarliest: true, soaId: '2' },
    { id: '7', parentId: '1', name: 'Screening', ordinal: 1, isFixedAsEarliest: true, soaId: '3' },
    { id: '8', parentId: '3', name: 'Treatment', ordinal: 2, isFixedAsEarliest: true, soaId: '3' },
    { id: '9', parentId: '2', name: 'Follow Up', ordinal: 3, isFixedAsEarliest: true, soaId: '3' },
    { id: '10', parentId: '2', name: 'In House Study Visit - Period 1', ordinal: 1, isFixedAsEarliest: false, soaId: '3' },
    { id: '11', parentId: '2', name: 'In House Study Visit - Period 2', ordinal: 2, isFixedAsEarliest: false, soaId: '3' },
    { id: '12', parentId: '2', name: 'In House Study Visit - Period 3', ordinal: 3, isFixedAsEarliest: false, soaId: '3' },
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
    { id: '1', name: 'Informed Consent', ordinal: 1, soaId: '1', armId: '2' },
    { id: '2', name: 'Medical and medication history', ordinal: 2, soaId: '1', armId: '1' },
    { id: '3', name: 'Demographic Data', ordinal: 3, soaId: '1', armId: '3' },
    { id: '4', name: 'Inclusion/exclusion criteria', ordinal: 4, soaId: '1', armId: '5' },
    { id: '5', name: 'Spinal X Ray', ordinal: 5, soaId: '1', armId: '4' },
    { id: '6', name: 'Urine cotinine', ordinal: 6, soaId: '1', armId: '6' },
    { id: '7', name: 'Urine Drug Screen', ordinal: 7, soaId: '1', armId: '7' },
    { id: '8', name: 'Urine Alcohol', ordinal: 8, soaId: '1', armId: '1' },
    { id: '9', name: 'Physical and neurological examination', ordinal: 9, soaId: '1', armId: '8' },
    { id: '10', name: 'Vital Signs', ordinal: 10, soaId: '1', armId: '1' },
    { id: '11', name: '12 Lead ECG', ordinal: 11, soaId: '1', armId: '1' },
    { id: '12', name: 'Hepatitis B, Hepatitis C, HIV Test', ordinal: 12, soaId: '1', armId: '1' },
    { id: '13', name: 'Hematology', ordinal: 13, soaId: '1', armId: '1' },
    { id: '14', name: 'Coagulation', ordinal: 14, soaId: '1', armId: '1' },
    { id: '15', name: 'Chemical Chemistry', ordinal: 15, soaId: '1', armId: '1' },
    { id: '16', name: 'Urine Analysis', ordinal: 16, soaId: '1', armId: '1' },
];

var visits = [
    { id: '1', name: 'Day 1', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '1' },
    { id: '2', name: 'Day 2', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '3' },
    { id: '3', name: 'Day 3', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '2' },
    { id: '4', name: 'Day 4', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '4' },
    { id: '5', name: 'Day 5', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '5' },
    { id: '6', name: '10-14 days', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '2' },
    { id: '7', name: 'Day 20', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '1' },
    { id: '8', name: 'Day 21', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '3' },
    { id: '9', name: 'Day 22', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '3' },
    { id: '10', name: 'Day 23', absoluteDay: 1, window: 'daily', soaId: '1', epochId: '2', armId: '3' },
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

const VisitType = new GraphQLObjectType({
    name: 'Visit',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        absoluteDay: { type: GraphQLInt },
        window: { type: GraphQLString },
        soaId: { type: GraphQLID },
        epochId: { type: GraphQLID },
        armId: { type: GraphQLID },
        soa: {
            type: SoaType,
            resolve(parent, args){
                return _.find(soas, {id: parent.soaId});
            }
        },
        epoch: {
            type: EpochType,
            resolve(parent, args){
                return _.find(epochs, {id: parent.epochId});
            }
        },
        arm: {
            type: ArmType,
            resolve(parent, args){
                return _.find(arms, {id: parent.armId});
            }
        }
    })
});

const VisitDataType = new GraphQLObjectType({
    name: 'VisitData',
    fields: () => ({
        id: { type: GraphQLID },
        activityId : { type: GraphQLID },
        soaId: { type: GraphQLID },
        activity: {
            type: ActivityType,
            resolve(parent, args){
                return _.find(activities, {id: parent.id});
            }
        },
        soa: {
            type: SoaType,
            resolve(parent, args){
                return _.find(soas, {id: parent.id});
            }
        }
    })
});

const ProtocolType = new GraphQLObjectType({
    name: 'Protocol',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        protocolNumber: { type: GraphQLString },
        tag: { type: GraphQLString },
        tenantId: { type: GraphQLID },
        tenant: {
            type: TenantType,
            resolve(parent, args){
                return _.find(tenants, {id: parent.tenantId})
            }
        },
        protocolVersionId: { type: GraphQLID },
        protocolVersion: {
            type: ProtocolVersionType,
            resolve(parent, args){
                return _.find(protocolVersions, {id: parent.protocolVersionId})
            }
        }
    })
});

const ProtocolVersionType = new GraphQLObjectType({
    name: 'ProtocolVersion',
    fields: () => ({
        id: { type: GraphQLID },
        versionNumber : { type: GraphQLString },
        tag:  { type: GraphQLString }
    })
});

const SequencerType = new GraphQLObjectType({
    name: 'Sequencer',
    fields: () => ({
        id: { type: GraphQLID },
        specification : { type: GraphQLString },
        activityId: { type: GraphQLID },
        epochId: { type: GraphQLID },
        activity: {
            type: ActivityType,
            resolve(parent, args){
                return _.find(activities, {id: parent.activityId})
            }
        },
        epoch: {
            type: EpochType,
            resolve(parent, args){
                return _.find(epochs, {id: parent.epochId})
            }
        }
    })
});

const CohortType = new GraphQLObjectType({
    name: 'Cohort',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        ordinal: { type: GraphQLInt },
        protocolVersionId: { type: GraphQLID },
        protocolVersion: {
            type: ProtocolVersionType,
            resolve(parent, args){
                return _.find(protocolVersions, {id: parent.protocolVersionId})
            }
        }
    })
});

const AccountType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        role: { type: GraphQLString },
        displayName: { type: GraphQLString },
        tenantId: { type: GraphQLID },
        tenant: {
            type: TenantType,
            resolve(parent, args){
                //return Account.findById(parent.tenantId)
                return _.find(tenants, {id: parent.tenantId})
            }
        }
    })
});


const EpochType = new GraphQLObjectType({
    name: 'Epoch',
    fields: () => ({
        id: { type: GraphQLID },
        parentId: { type: GraphQLID },
        name : { type: GraphQLString },
        ordinal: { type: GraphQLInt },
        isFixedAsEarliest: { type: GraphQLBoolean },
        soaId: { type: GraphQLID },
        soa: {
            type: SoaType,
            resolve(parent, args){
                return _.find(soas, {id: parent.soaId})
            }
        }
    })
});

const SoaType = new GraphQLObjectType({
    name: 'Soa',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        tag:  { type: GraphQLString },
        protocolVersionId: { type: GraphQLID },
        protocolVersion: {
            type: ProtocolVersionType,
            resolve(parent, args){
                return _.find(soas, {id: parent.soaId})
            }
        }
    })
});

const ArmType = new GraphQLObjectType({
    name: 'Arm',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        ordinal: { type: GraphQLInt },
        tag:  { type: GraphQLString },
        soaId: { type: GraphQLID },
        soa: {
            type: SoaType,
            resolve(parent, args){
                return _.find(soas, {id: parent.soaId});
            }
        }
    })
});

const ActivityType = new GraphQLObjectType({
    name: 'Activity',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        ordinal: { type: GraphQLInt },
        soaId: { type: GraphQLID },
        armId: { type: GraphQLID },
        soa: {
            type: SoaType,
            resolve(parent, args){
                return _.find(soas, {id: parent.soaId});
            }
        },
        arm: {
            type: ArmType,
            resolve(parent, args){
                return _.find(arms, {id: parent.armId});
            }
        }
    })
});

const RepeatingSequencesType = new GraphQLObjectType({
    name: 'RepeatingSequences',
    fields: () => ({
        id: { type: GraphQLID },
        beginDay : { type: GraphQLInt },
        occurrences: { type: GraphQLInt },
        interval:  { type: GraphQLInt }
    })
});

const TenantType = new GraphQLObjectType({
    name: 'Tenant',
    fields: () => ({
        id: { type: GraphQLID },
        name : { type: GraphQLString },
        accounts: {
            type: new GraphQLList(AccountType),
            resolve(parent, args){
                return _.filter(accounts, {tenantId: parent.id});
                //return Tenant.find({tenantId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tenant: {
            type: TenantType,
            args: {id: { type: GraphQLID }},
            resolve(parent,args){
                // code to get data from db
               return  _.find(tenants, {id: args.id});
               //return Tenant.findById(args.id);
            }
        },
        tenants: {
            type: new GraphQLList(TenantType),
            resolve(parent, args){
                //return Tenant.find({});// return all
                return tenants;
            }
        },
        account: {
            type: AccountType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                // code to get data from the db
                return _.find(accounts, {id: args.id});
                //return Account.findById(args.id);
            }
        },
        accounts: {
            type: new GraphQLList(AccountType),
            resolve(parent, args){
                //return Account.find({});// return all
                return accounts;
            }
        },
        activity: {
            type: ActivityType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(activities, {id: args.id});
            }
        },
        activities: {
            type: new GraphQLList(ActivityType),
            resolve(parent, args){
                return activities;
            }
        },
        arm: {
            type: ArmType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(arms, {id: args.id});
            }
        },
        arms: {
            type: new GraphQLList(ArmType),
            resolve(parent, args){
                return arms;
            }
        },
        soa: {
            type: SoaType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(soas, {id: args.id});
            }
        },
        soas: {
            type: new GraphQLList(SoaType),
            resolve(parent, args){
                return soas;
            }
        },
        epoch: {
            type: EpochType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(epochs, {id: args.id });
            }
        },
        epochs: {
            type: new GraphQLList(EpochType),
            resolve(parent, args){
                return epochs;
            }
        },
        cohort: {
            type: CohortType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(cohorts, {id: args.id });
            }
        },
        cohorts: {
            type:  new GraphQLList(CohortType),
            resolve(parent, args){
                return cohorts;
            }
        },
        visit: {
            type: VisitType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(visits, {id: args.id });
            }
        },
        visits: {
            type: new GraphQLList(VisitType),
            resolve(parent, args){
                return visits;
            }
        },
        visitData: {
            type: VisitDataType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(activityVisitData, {id: args.id });
            }
        },
        repeatingSequence: {
            type: RepeatingSequencesType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(repeatingSequences, {id: args.id });
            }
        },
        protocol: {
            type: ProtocolType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                return _.find(protocols, {id: args.id });
            }
        },
        protocols: {
            type: new GraphQLList(ProtocolType),
            resolve(parent, args){
                return protocols;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTenant: {
            type: TenantType,
            args: {
                name : { type: GraphQLString },
                accountId: { type: GraphQLID}
            },
            resolve(parent, args){
                let tenant = new Tenant({
                    name: args.name,
                    accountId: args.accountId
                });
                return tenant.save();
            }
        },
        addAccount: {
            type: AccountType,
            args: {
                name : { type: GraphQLString },
                displayName : { type: GraphQLString },
                role : { type: GraphQLString },
                tenantId : { type: GraphQLID },
            },
            resolve(parent, args){
                let account = new Account({
                    name: args.name,
                    displayName: args.displayName,
                    role: args.role,
                    tenantId: args.tenantId
                });
                return account.save();
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery,
    mutation: Mutation
});