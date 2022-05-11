//File-related provider data
export const providerResumeFile=[{
    providerId:426753920586893,
    file:new File(
        [""], 
        "test resume", 
        {
            lastModified: new Date(), 
            size:5387, 
            type:"doc/docx", 
            webkitRelativePath:""
        }
    ),
    fileType:".docx",
    fileName:"test resume"
}];

export const providerSignatureImageFile=[{
    providerId:426753920586893,
    file:new File(
        [""], 
        "signature", 
        {
            lastModified: new Date(), 
            size:5387, 
            type:"img/png", 
            webkitRelativePath:""
        }
    ),
    fileType:".png",
    fileName:"signature"
}];

//Data provider management UI's and their respective view models depends on
export const providerSeviceAreas = [
    {
        id:1110,
        zipCode:'33331',
        city:'Blasville',
        county:'Noidea1',
        state:'NJ',
        isDeleted:false
    },
    {
        id:222,
        zipCode:'33332',
        city:'Manhatten',
        county:'Noidea2',
        state:'NY',
        isDeleted:false
    },
    {
        id:333,
        zipCode:'33333',
        city:'Bleck',
        county:'Noidea3',
        state:'FL',
        isDeleted:false
    },
    {
        id:444,
        zipCode:'33334',
        city:'San Fancisco',
        county:'Noidea4',
        state:'FL',
        isDeleted:false
    },
    {
        id:5555,
        zipCode:'333332',
        city:'Bleck',
        county:'Noidea3',
        state:'FL',
        isDeleted:false
    },
    {
        id:6666,
        zipCode:'33335',
        city:'San Fancisco',
        county:'Noidea4',
        state:'FL',
        isDeleted:false
    },
];

export const languages = [
    {
        id: 1,
        name: 'English',
    },
    {
        id: 2, 
        name: 'German',
    },
    {
        id: 3, 
        name: 'Spanish',
    },
    {
        id: 4, 
        name: 'Haitian-Creole',
    },
    {
        id: 5, 
        name: 'Jamacan Creole',
    }
];

export const types = [
    {
        id:783906,
        code:"ST",
        name:"Some Type 1",
        isOutsourced:false,
        canSupervise:false
    }
];

export const subTypes = [
    {
        id:111,
        code:'STC1',
        name:'Something',
        parentTypeId:783906
    },
    {
        id:222,
        code:'STC2',
        name:'Something',
        parentTypeId:783906
    },
    {
        id:333,
        code:'STC3',
        name:'Something',
        parentTypeId:783906
    },
    {
        id:444,
        code:'STC4',
        name:'Something',
        parentTypeId:783906
    }
];

export const corperations = [
    {
        id:111,
        name:'Smarty Juice'
    },
    {
        id:222,
        name:'Faceless Megacorp'
    },
    {
        id:333,
        name:'Strongbadia'
    },
];

export const states = [
    {id:111, name:'Florida', abbreviation:'FL'},
    {id:222, name:'North Carolina', abbreviation:'NC'},
    {id:333, name:'New York', abbreviation:'NY'},
    {id:444, name:'Maryland', abbreviation:'MA'},
];

export const statuses = [
    {value:0, text:"Inactive"},
    {value:1, text:"Active"},
    {value:2, text:"Active"},
    {value:3, text:"DoNotStaff"},
    {value:4, text:"Onboarded"},
    {value:5, text:"Oriented"}
];

//provider dto related data
export const providerInfoData = [
    {
        id:426753920586893,
        firstName:'Bob',
        lastName:'Bobbyson',
        gender:"male",
        email1:'bbobbyson1@gmail.com',
        email2:'bbobbyson2@gmail.com',
        address1:'something1 something1 ave.',
        address2:'something2 something2 ave.',
        phone:'555-555-5555',
        phone2:'555-555-5556',
        type:783906,
        subType:111,
        status:1,
        company:222,
        state:111,
        fax:'111-111-1111',
        city:'Somethingville',
        zip:'31312',
        languageIds:[
            1,2,3,4
        ],
        providerSubTypeId:1,
        statusHistory:[
            {
                id:1, 
                statusName:"Inactive",
                status:0,
                updateDate:"2022-03-22T00:00:00"
            },
            {
                id:2, 
                statusName:"Active",
                status:1,
                updateDate:"2022-03-23T00:00:00"
            },
            {
                id:3, 
                statusName:"Potential",
                status:2,
                updateDate:"2022-03-24T00:00:00"
            },
        ],
        typeInfo:{
            id:783906,
            code:"ST",
            name:"Some Type 1",
            isOutsourced:false,
            canSupervise:false
        },
        notes:'This is a note',
        noteDetails:[{
            id:1,
            sourceType:"Case",
            parentId:7489365,
            correspondenceType:1,
            correspondenceName:"General",
            entryDate:'2022-03-23T00:00:00',
        }],
        serviceAreas:[
            {
                id:111,
                zipCode:'33331',
                city:'Blasville',
                county:'Noidea1',
                state:'NJ',
                isDeleted:false
            }
        ]   
    }
];

export const providerComunications=[{
    providerId:426753920586893,
    email:'bbobbyson1@gmail.com',
    phone:'555-555-5555',
    allowMarketingSMS:true,
    allowNotificationSMS:false,
    allowConversationalSMS:true,
    allowNotificationEmail:false,
    allowMarketingEmail:true,
    allowConversationalEmail:false
}];

export const hrData = [{
    providerId:426753920586893,
    hasSignatureImage:false,
    signatureImageLocation:"img/mbaileysignature",
    hasBackgroundCheck:false,
    hasReferences:false,
    hasResume:true,
    resumeUploaded:true,
    hireDate:'2022-04-12T00:00:00',
    isHire:true,
    isSalary:true,
    payrolId:6582395,
    hourlyRate:200.00,
    salaryAmount:700000,
    providerRates:[
        {
            id:1,
            type:'A Rate1',
            rate:30000.00,
            effectiveDate:'2022-03-23T00:00:00',
            formattedRate:'$30000.00',
            formattedEffectiveDate:'2022-03-23T00:00:00',
            isDeleted:false
        },
        {
            id:2,
            type:'A Rate2',
            rate:40000.00,
            effectiveDate:'2022-03-24T00:00:00',
            formattedRate:'$40000.00',
            formattedEffectiveDate:'2022-03-24T00:00:00',
            isDeleted:false
        },
        {
            id:3,
            type:'A Rate3',
            rate:50000.00,
            effectiveDate:'2022-03-25T00:00:00',
            formattedRate:'$50000.00',
            formattedEffectiveDate:'2022-03-25T00:00:00',
            isDeleted:false
        }
    ],
    resumeFileName:"",
}];

export const providerSettings = [{
    providerId:426753920586893,
    sessionEntryRestriction:1,
    precheckDaysAdvance:5
}];

export const appsAndCreds = [{
    providerId:426753920586893,
    mobileUsername:'bbobbyson2@gmail.com',
    mobilePassword:'something12345',
    catalystUsername:'bbobbyson3@gmail.com',
    catalystPassword:'something654321',
    redemptionCode:'77210',
    allowAdminAccess:false
}];

export const providerActiveCases=[
    {
        id:1111,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:99664,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:46145,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:13858,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:10463,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:74890,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:53681,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:29111,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:96917,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:14387,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
    {
        id:60182,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:1,
        statusChangeDate:'02/12/2022',
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:'02/04/2022', 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:'02/31/2022', 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:'02/15/2022', 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:'02/05/2022', 
        canReceiveSMSTexts:false,
    },
];

export const providerInactiveCases = [
    {
        id:84162,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:64720,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:53206,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:18882,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:56270,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:33948,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:75564,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:89782,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:22278,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:95819,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
    {
        id:80072,
        patient:{
            firstName:'Roy',
            lastName:'Biv'
        },
        referralId:33572, 
        status:0,
        statusChangeDate:new Date('02/12/2022').toISOString(),
        statusNotes:'these are some notes',
        caseSubStatus:1, 
        startDate:new Date('02/04/2022').toISOString(), 
        corporationName:'Faceless Megacorp', 
        requiredHoursNotes:'required hours notes', 
        requiredServicesNotes:'required service notes', 
        hasPrescription:false, 
        hasAssessment:true, 
        hasIntake:true, 
        useATrackWorkflow:true, 
        aTrackOnly:true, 
        functioningLevel:{
            id:20430,
            name:'High'
        }, 
        dischargeDate:new Date('02/31/2022').toISOString(), 
        dischargeNotes:'This guy no longer needs any help', 
        onHoldDate:new Date('02/15/2022').toISOString(), 
        onHoldReason:{
            id:29971,
            name:'Not Available'
        }, 
        onHoldReasonText:'Not available', 
        restaffType:{
            id:25522,
            name:'Not Restaffed'
        },
        restaffReason:{
            id:50030,
            name:'No need to restaff'
        }, 
        sourcedFromASFI:true, 
        aSFIIntakeID:'35798203568', 
        externalPortalHandoffDate:new Date('02/05/2022').toISOString(), 
        canReceiveSMSTexts:false,
    },
];

export const providerHours=[
    {
        id:51482,
        caseId:63160,
        patientName:'Roy Biv',
        date:new Date('02/03/2022').toISOString(),
        startTime:new Date('02/04/2022').toISOString(),
        endTime:new Date('02/15/2022').toISOString(),
        totalHours:12.00,
        serviceId:54794,
        serviceCode:'83846',
        serviceLocationId:82659,
        status:0,
        statusCode:'F',
        notes:'These are some notes',
        billableHours:5.00,
        billed:false,
        payableHours:1.00,
        paid:true,
        hasCatalystData:false,
        caseAuthId:97234,
        authCode:'98801',
        authorizationResolutionServiceVersion:'12.0.01',
    },
    {
        id:42597,
        caseId:71599,
        patientName:'Roy Biv',
        date:new Date('02/03/2022').toISOString(),
        startTime:new Date('02/04/2022').toISOString(),
        endTime:new Date('02/15/2022').toISOString(),
        totalHours:12.00,
        serviceId:48171,
        serviceCode:'83846',
        serviceLocationId:82659,
        status:0,
        statusCode:'F',
        notes:'These are some notes',
        billableHours:5.00,
        billed:false,
        payableHours:1.00,
        paid:true,
        hasCatalystData:false,
        caseAuthId:14399,
        authCode:'98801',
        authorizationResolutionServiceVersion:'12.0.01',
    },
    {
        id:42597,
        caseId:71599,
        patientName:'Roy Biv',
        date:new Date('02/03/2022').toISOString(),
        startTime:new Date('02/04/2022').toISOString(),
        endTime:new Date('02/15/2022').toISOString(),
        totalHours:12.00,
        serviceId:48171,
        serviceCode:'83846',
        serviceLocationId:82659,
        status:0,
        statusCode:'F',
        notes:'These are some notes',
        billableHours:5.00,
        billed:false,
        payableHours:1.00,
        paid:true,
        hasCatalystData:false,
        caseAuthId:14399,
        authCode:'98801',
        authorizationResolutionServiceVersion:'12.0.01',
    },
    {
        id:42597,
        caseId:71599,
        patientName:'Roy Biv',
        date:new Date('02/03/2022').toISOString(),
        startTime:new Date('02/04/2022').toISOString(),
        endTime:new Date('02/15/2022').toISOString(),
        totalHours:12.00,
        serviceId:48171,
        serviceCode:'83846',
        serviceLocationId:82659,
        status:0,
        statusCode:'F',
        notes:'These are some notes',
        billableHours:5.00,
        billed:false,
        payableHours:1.00,
        paid:true,
        hasCatalystData:false,
        caseAuthId:14399,
        authCode:'98801',
        authorizationResolutionServiceVersion:'12.0.01',
    },
    {
        id:42597,
        caseId:71599,
        patientName:'Roy Biv',
        date:new Date('02/03/2022').toISOString(),
        startTime:new Date('02/04/2022').toISOString(),
        endTime:new Date('02/15/2022').toISOString(),
        totalHours:12.00,
        serviceId:48171,
        serviceCode:'83846',
        serviceLocationId:82659,
        status:0,
        statusCode:'F',
        notes:'These are some notes',
        billableHours:5.00,
        billed:false,
        payableHours:1.00,
        paid:true,
        hasCatalystData:false,
        caseAuthId:14399,
        authCode:'98801',
        authorizationResolutionServiceVersion:'12.0.01',
    },
    {
        id:42597,
        caseId:71599,
        patientName:'Roy Biv',
        date:new Date('02/03/2022').toISOString(),
        startTime:new Date('02/04/2022').toISOString(),
        endTime:new Date('02/15/2022').toISOString(),
        totalHours:12.00,
        serviceId:48171,
        serviceCode:'83846',
        serviceLocationId:82659,
        status:0,
        statusCode:'F',
        notes:'These are some notes',
        billableHours:5.00,
        billed:false,
        payableHours:1.00,
        paid:true,
        hasCatalystData:false,
        caseAuthId:14399,
        authCode:'98801',
        authorizationResolutionServiceVersion:'12.0.01',
    },
    {
        id:42597,
        caseId:71599,
        patientName:'Roy Biv',
        date:new Date('02/03/2022').toISOString(),
        startTime:new Date('02/04/2022').toISOString(),
        endTime:new Date('02/15/2022').toISOString(),
        totalHours:12.00,
        serviceId:48171,
        serviceCode:'83846',
        serviceLocationId:82659,
        status:0,
        statusCode:'F',
        notes:'These are some notes',
        billableHours:5.00,
        billed:false,
        payableHours:1.00,
        paid:true,
        hasCatalystData:false,
        caseAuthId:14399,
        authCode:'98801',
        authorizationResolutionServiceVersion:'12.0.01',
    }    
];