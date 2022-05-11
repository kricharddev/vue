
import {
    providerSeviceAreas,
    providerInfoData,
    hrData,
    providerComunications,
    providerSettings,
    appsAndCreds,
    providerResumeFile,
    providerSignatureImageFile,
    providerHours,
    providerActiveCases,
    providerInactiveCases,
    languages,
    types,
    subTypes,
    statuses,
    corperations,
    states
} from './data/data';

function post(path, params){
    let response = {};

    const generateNewId = (items, idKey) =>{
        const MIN = 10000;
        const MAX = 99999;

        let newItemId = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        let alreadyHasId = items.find(item => item[idKey] === newItemId);

        if(alreadyHasId){
            generateNewId();
        }else{
            return newItemId;
        }
        
    };

    //Main API
    if(path === '/provider/manage'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);
        
        const processData = (/*resolve, reject*/) =>{
            if(dataProvider){
                   
                response.success = true;
                response.message = params;

                return response;
            }else{
                response.success = false;
                response.message = "Could not update the current provider info";
                
                return response;
            }
            // setTimeout(()=>{
                
            // });
        }

        //return new Promise (processData(resolve, reject));
        return processData();
    }

    //Provider Human Resources
    if(path === '/provider/manage/humanresources'){
        let dataProviderHr = hrData.find((p)=>p.providerId === params.providerId);
        
        if(dataProviderHr){

            dataProviderHr.providerId = params.id;
            dataProviderHr.hasBackgroundCheck = params.hasBackgroundCheck;
            dataProviderHr.hasReferences = params.hasReferences;
            dataProviderHr.hireDate = params.hireDate;
            dataProviderHr.isHire = params.isHire;
            dataProviderHr.isSalary = params.isSalary;
            dataProviderHr.payrolId = params.payrolId;
            dataProviderHr.salaryAmount = params.salaryAmount;
            dataProviderHr.resumeFileName = params.resumeFileName;

            let hasAttachedSignatureImage = params.signatureImage.length > 0;
            let hasAttachedResume = params.resumeFile.length > 0;

            if(hasAttachedSignatureImage){
                let getProviderSignature = providerSignatureImageFile.find((p)=>p.providerId === params.providerId);

                if(getProviderSignature){
                    
                    console.log(params.signatureImage);
                    dataProviderHr.hasSignatureImage = true;
                }
            }

            if(hasAttachedResume){
                let getProviderResume = providerResumeFile.find((p)=>p.providerId === params.providerId);

                if(getProviderResume){
                    console.log(params.resumeFile);
                    
                    dataProviderHr.hasResume = true;
                    dataProviderHr.resumeUploaded = true;
                }
            }

            response.success = true;
            response.message = params;
        }else{
            response.success = false;
            response.message = "Could not update the current provider HR info";

        }

        return response;
    }
    if(path === '/provider/manage/humanresources/AddRate'){
        let dataProviderHrRates = hrData.find((p)=>p.providerId === params.id).providerRates;

        if(dataProviderHrRates){
            console.log("test");

            let newItemId = generateNewId(dataProviderHrRates, "providerId");
            let currentDate = new Date().toISOString();
            let currentTime = currentDate.substring(currentDate.indexOf('T'), currentDate.length);
            let newISODate = new Date(params.effectiveDate).toISOString() + 'T' + currentTime;
            
            //We will probably not need the effective date here.
            let newRate = {
               id:newItemId,
               type:0,
               rate:params.rate,
               effectiveDate:newISODate,
               formattedEffectiveDate:params.effectiveDate,
               formattedRate:"$"+params.rate.toString(),
               isDeleted:false
            };

            dataProviderHrRates.push(newRate);
            
            console.log(dataProviderHrRates);

            response.success = true;
            response.message = params;
        }else{
            response.success = false;
            response.message = "Could not find provider"
        }

        return response;
    }
    if(path === '/provider/manage/humanresources/DeleteRate'){
        let dataProviderHr = hrData.find((p)=>p.providerId === params.id);

        if(dataProviderHr){
            
            let getRateToDelete = dataProviderHr.providerRates.find((r)=>r.id === params.rateId);
            
            if(getRateToDelete){
                getRateToDelete.isDeleted = true;
                response.success = true;
                response.message = params;
            }else{
                response.success = false;
                response.message = "Could not get rate to delete";
            }

        }else{
            response.success = true;
            response.message = "Could not find provider"
        }

        return response;
    }

    //Provider Service Areas
    if(path === '/provider/servicearea'){
        console.log(params);
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);

        if(dataProvider){
        
            let providerData = providerSeviceAreas;
            let passedEntryKeys = Object.keys(params.serviceArea);

            if(providerData){
                //This is psuedo javascript code for a back-end service that fetches
                //the required zipcodes by the field (i.e. zipCode, city, county) specified
                let acquiredZipcodes =  providerData.filter((item) => item[passedEntryKeys] === params.serviceArea[passedEntryKeys]);

                let updatedServiceAreaList = dataProvider.serviceAreas.concat(acquiredZipcodes);

                dataProvider.serviceAreas = updatedServiceAreaList;
                //This is psuedo javascript code for a back-end service that fetches
                //the required zipcodes by the field (i.e. zipCode, city, county) specified

                response.success = true;
                response.message = params;
            }else{
                response.success = false;
                response.message = "No service areas";
            }
        
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }
        
        return response;
    }
    if(path === '/provider/servicearea/deleteServiceArea'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);

        if(dataProvider){
            let selectServiceAreaToDelete = dataProvider.serviceAreas.find((sa)=> sa.id === params.serviceAreaId);

            if(selectServiceAreaToDelete){
                selectServiceAreaToDelete.isDeleted = true;

                response.success = true;
                response.message = params;
            }else{
                response.success = false;
                response.message = "Could not find service area";
            }
            
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }

        return response;
    }

    //Provider Communications
    if(path === '/provider/manage/communications'){
        let providerCommunicationsData = providerComunications.find((pc)=>pc.providerId === params.providerId);
        
        const processData = (/* */) => {
            if(providerCommunicationsData){

                providerCommunicationsData.providerId = params.providerId;
                providerCommunicationsData.email = params.email;
                providerCommunicationsData.phone = params.phone;
                providerCommunicationsData.allowMarketingSMS = params.allowMarketingSMS;
                providerCommunicationsData.allowNotificationSMS = params.allowNotificationSMS;
                providerCommunicationsData.allowConversationalSMS = params.allowConversationalSMS;
                providerCommunicationsData.allowNotificationEmail = params.allowNotificationEmail;
                providerCommunicationsData.allowMarketingEmail = params.allowMarketingEmail;
                providerCommunicationsData.allowConversationalEmail = params.allowConversationalEmail;
    
                response.success = true;
                response.message=params;
            }else{
                response.success = false;
                response.message="Could not find provider"
            }
            
            console.log(response);

            return response;
        }

        return processData();
    }

    //Provider Settings
    if(path === '/provider/manage/settings'){
        let providerSettingsData = providerSettings.find(ps=>ps.providerId === params.providerId);

        console.log(params, providerSettingsData);

        if(providerSettingsData){
            providerSettingsData.providerId = params.providerId;
            providerSettingsData.sessionEntryRestriction = params.sessionEntryRestriction;
            providerSettingsData.precheckDaysAdvance = params.precheckDaysAdvance;
            response.success = true;
            response.message = params;
        }else{
            response.success = true;
            response.message = "Could not find provider";
        }

        return response;
    }

    //Provider Apps And Credentials
    if(path === '/provider/manage/apps-credentials/assignCodeToProvider'){
        const MIN = 10000;
        const MAX = 99999;

        let newRedemptionCode = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        let appsAndCredsData = appsAndCreds.find((pac)=>pac.providerId === params.id);
        
        appsAndCredsData.redemptionCode = newRedemptionCode;

        if(appsAndCredsData){
            response.success = true;
            response.message = newRedemptionCode;
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }

        return response;
    }
    if(path === '/provider/manage/apps-credentials/sendCodeToProviderByEmail'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);

        if(dataProvider){
            response.success = true;
            response.message = "Email sent for code " + params.code;
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }

        return response;
    }
    if(path === '/provider/manage/apps-credentials/changeProviderAdminAuth'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);

        if(dataProvider){
            dataProvider.allowAdminAccess = params.allowAdminAccess;
            response.success = true;
            response.message = params;
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }

        return response;
    }
}

function put(path, params){
    let response = {};

    if(path === "/provider/manage/humanresources/EditRate"){
        let dataProviderHrRates = hrData.find((p)=>p.providerId === params.providerId).providerRates;
        
        if(dataProviderHrRates){
            let selectedRate = dataProviderHrRates.find((r)=>r.id === params.rateId);
            
            if(selectedRate){
                let currentDate = new Date().toISOString();
                let currentTime = currentDate.substring(currentDate.indexOf('T'), currentDate.length);
                let newISODate = new Date(params.date).toISOString() + 'T' + currentTime;

                selectedRate.effectiveDate = newISODate;
                selectedRate.formattedRate = "$"+params.rate.toString();

                response.success = true;
                response.message = params;
            }else{
                response.success = false;
                response.message = "Cannot find specified rate";
            }
            
        }else{
            response.success = false;
            response.message = "Cannot find provider";
        }

        console.log(response);

        return response;
    }
}

function get(path, params){
    let response = {};

    //Main API
    if(path === '/provider/manage'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);
        
        if(dataProvider){
            response.success = true;
            response.message = dataProvider;
        }else{
            response.success = false;
            response.message = "Could not find provider info";
        }

        return response;
    } 
    if(path == '/provider/languages'){
        let getLanguages = languages;

        if(getLanguages.length > 0){
            response.success = true;
            response.message = getLanguages;
        }else{
            response.success = false;
            response.message = "Could not find languages";
        }

        return response;
    }
    if(path === '/provider/types'){
        let getTypes = types;

        if(getTypes.length > 0){
            response.success = true;
            response.message = getTypes;
        }else{
            response.success = false;
            response.message = "Could not find types";
        }

        return response;
    }
    if(path === '/provider/subtypes'){
        let getSubTypes = subTypes;

        if(getSubTypes.length > 0){
            response.success = true;
            response.message = getSubTypes;
        }else{
            response.success = false;
            response.message = "Could not find subtypes";
        }

        return response;
    }
    if(path === '/provider/statuses'){
        let getStatuses = statuses;

        if(getStatuses.length > 0){
            response.success = true;
            response.message = getStatuses;
        }else{
            response.success = false;
            response.message = "Could not find statuses";
        }

        return response;
    }
    if(path === '/provider/corperations'){
        let getCorperations = corperations;

        if(getCorperations.length > 0){
            response.success = true;
            response.message = getCorperations;
        }else{
            response.success = false;
            response.message = "Could not find corperations";
        }

        return response;
    }
    if(path === '/provider/states'){
        let getStates = states;

        if(getStates.length > 0){
            response.success = true;
            response.message = states;
        }else{
            response.success = false;
            response.message = "Could not find states"
        }

        return response;
    }

    //Provider Human Resources
    if(path === '/provider/manage/humanresources'){
        let dataProviderHr = hrData.find((p)=>p.providerId === params.id);
        if(dataProviderHr){
            let getFields = {}
            
            getFields.providerId = dataProviderHr.providerId;
            getFields.hasSignatureImage= dataProviderHr.hasSignatureImage;
            getFields.hasBackgroundCheck = dataProviderHr.hasBackgroundCheck;
            getFields.hasReferences = dataProviderHr.hasReferences;
            getFields.hasResume = true;
            getFields.hireDate = dataProviderHr.hireDate;
            getFields.isHire = dataProviderHr.isHire;
            getFields.isSalary = dataProviderHr.isSalary;
            getFields.payrolId = dataProviderHr.payrolId;
            getFields.salaryAmount = dataProviderHr.salaryAmount;
            getFields.resumeFileName = dataProviderHr.resumeFileName;
            getFields.resumeUploaded = dataProviderHr.resumeUploaded;

            response.success = true;
            response.message = getFields;
        }else{
            response.success = false;
            response.message = "Could not find provider HR info";
        }

        return response;
    }
    if(path === '/provider/manage/humanresources/GetProviderSignatureImage'){
        let getSignatureImage = providerSignatureImageFile.find((i)=>i.providerId === params.id);

        const processData = (/*resolve, reject*/) =>{
            if(getSignatureImage){
                response.success = true;
                response.message = getSignatureImage;
            }else{
                response.success = false;
                response.message = "Could not find provider signature file";
            }
        };
        
        return processData();
    }
    if(path === '/provider/manage/humanresources/GetResume'){
        let getProviderResume = providerResumeFile.find((i)=> i.providerId === params.id);

        console.log(getProviderResume);

        const processData = (/*resolve, reject*/) =>{
            if(getProviderResume){
                response.success = true;
                response.message = getProviderResume;

                return response;
            }else{
                response.success = false;
                response.message = "Could not find provider resume";

                return response;
            } 
        }
        
        return processData();
    }
    if(path === '/provider/manage/humanresources/GetRates'){
        let dataProviderHrRates = hrData.find((p)=>p.providerId === params.id).providerRates;
        
        if(dataProviderHrRates){
            let activeProviderRates = dataProviderHrRates.filter((r)=> r.isDeleted === false);
            let fetchedProviderRates = [];

            if(activeProviderRates.length > 0){

                activeProviderRates.forEach(item => fetchedProviderRates.push(item));

                fetchedProviderRates.forEach(i => {
                    i.formattedEffectiveDate = i.formattedEffectiveDate.slice(0,10).replaceAll("-","/");
                });

                response.success = true;
                response.message = fetchedProviderRates;
            }else{
                response.success = false;
                response.message = "Could not find any rates for current provider";
            }
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }

        return response;
    }
    if(path === '/provider/manage/humanresources/GetPayrollId'){

        const MIN = 100000;
        const MAX = 999999;

        let newPayrollId = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

        if(newPayrollId){
            response.success = true;
            response.message = newPayrollId;
        }else{
            response.message = false;
            response.message = "";
        }

        return response;
    }

    //Provider Service Areas
    if(path === '/Provider/ServiceArea'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);
        
        console.log(params.id);

        const processData = (/*resolve, reject*/) =>{
                if(dataProvider){
                    let serviceAreas = dataProvider.serviceAreas.filter((sa)=>sa.isDeleted === false);

                    console.log(serviceAreas);

                    response.success = true;
                    response.message = serviceAreas;
                    
                    return response;
                }else{
                    response.success = false;
                    response.message = "Could not find provider service area info";
                    
                    return response;
                }
                // setTimeout(()=>{
                // },API_LOAD_TIME_DELAY);
        }
            
        //return new Promise (processData(resolve, reject)); 
        return processData();
    }
    if(path === '/ServiceAreas/getCityList'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);

        if(dataProvider){
            let dataProviderServiceAreas = providerSeviceAreas;

            // let filterOutExtraCities = dataProviderServiceAreas.indexOf(item) === index;
            if(dataProviderServiceAreas){
                let allCities = dataProviderServiceAreas.map(item=>item.city);
                let filterAddedCities = allCities.filter((item)=>dataProvider.serviceAreas.find((sa)=>sa.city === item) === undefined);
                let filterDuplicateCities = filterAddedCities.filter((item,index)=>filterAddedCities.indexOf(item) === index);

                response.success = true;
                response.message = filterDuplicateCities;
            }else{
                response.success = false;
                response.message = "Could not find service areas";
            }
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }
        return response;
    }
    if(path === '/ServiceAreas/getCountyList'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);

        if(dataProvider){
            let dataProviderServiceAreas = providerSeviceAreas;

            if(dataProviderServiceAreas){
                let allCounties = dataProviderServiceAreas.map(item=>item.county);
                let filterAddedCounties = allCounties.filter((item)=>dataProvider.serviceAreas.find((sa)=>sa.county === item) === undefined);
                let filterDuplicateCounties = filterAddedCounties.filter((item,index)=>filterAddedCounties.indexOf(item) === index);
                
                response.success = true;
                response.message = filterDuplicateCounties;
            }else{
                response.success = false;
                response.message = "Could not find service areas";
            }
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }
        
        return response;
    }
    if(path === '/ServiceAreas/getZipList'){
        let dataProvider = providerInfoData.find((p)=>p.id === params.id);

        if(dataProvider){
            let dataProviderServiceAreas = providerSeviceAreas;

            if(dataProviderServiceAreas){
                let allZips = dataProviderServiceAreas.map(item=>item.zipCode);
                let filterZips = allZips.filter((item)=>dataProvider.serviceAreas.find((sa)=>sa.zipCode === item) === undefined);

                response.success = true;
                response.message = filterZips;
            }else{
                response.success = false;
                response.message = "Could not find service areas";
            }
        }else{
            response.success = false;
            response.message = "Could not find provider";
        }
       
        return response;
    }
    
    //Provider Communications
    if(path === '/provider/manage/communications'){
        let providerCommunicationsData = providerComunications.find(pc=>pc.providerId === params.id);
        const processData = (/*resolve, reject*/) => {

            console.log("Communications",providerComunications);
            console.log("Params",params);

            if(providerCommunicationsData){
                response.success = true;
                response.message=providerCommunicationsData;
            }else{
                response.success = false;
                response.message="Could not find provider";
            }

            return response;
        }

        return processData();
    }

    //Provider Settings
    if(path === '/provider/manage/settings'){
        let providerSettingsData = providerSettings.find(ps=>ps.providerId === params.id);

        if(providerSettingsData){
            response.success = true;
            response.message = providerSettingsData;
        }else{
            response.success = true;
            response.message = "Could not find provider";
        }

        return response;
    }

    //Provider Apps And Credentials
    if(path === '/provider/manage/apps-credentials'){
        let appsAndCredsData = appsAndCreds.find((pac)=> pac.providerId === params.id);

        if(appsAndCredsData){
            response.success = true;
            response.message = appsAndCredsData;
        }else{
            response.success = true;
            response.message = "Could not find provider";
        }

        return response;
    }

    //Provider Cases
    if(path === '/provider/manage/cases/hoursTable'){
        let createStartDate = new Date(params.startDate).toISOString();
        let createEndDate = new Date(params.endDate).toISOString();
        let getHours = providerHours.filter((h)=>h.startTime === createStartDate && h.endTime === createEndDate);
        
        if(getHours){

            let hoursAndDates = {};
            let dates = [];
            let totals = {};

            hoursAndDates.hours = getHours;

            getHours.forEach(item=>{
                dates.push(item.startTime);
                dates.push(item.endTime);
            });

            dates.sort();
            dates = dates.filter((date,index) => dates.indexOf(date) === index);
            
            let totalHoursWorked = getHours.reduce((acc,item)=>{return acc + item.totalHours;},0);
            let totalPayableHours = getHours.reduce((acc,item)=>{return acc + item.payableHours;},0);
            let totalBillableHours = getHours.reduce((acc,item)=>{return acc + item.billableHours;},0);

            totals.totalHoursWorked = totalHoursWorked.toFixed(2);
            totals.totalPayableHours = totalPayableHours.toFixed(2);
            totals.totalBillableHours = totalBillableHours.toFixed(2);

            console.log("Totals API", totals);
            
            hoursAndDates.dates = dates;
            hoursAndDates.totals = totals;

            response.success = true;
            response.message = hoursAndDates;
        }else{
            response.success = false;
            response.message = "Could not get provider hours";
        }
        
        return response;
    }
    if(path === '/provider/manage/cases/activeCase'){
        let getActiveCases = providerActiveCases.filter((ac)=>ac===ac);

        console.log(params.providerId);
        console.log(params.date);
        console.log(params.extensionInDays);

        if(getActiveCases){
            
            let fetchedCases = [];

            getActiveCases.forEach(item=>fetchedCases.push(item));
            
            fetchedCases.forEach(item=>{
                let selectedPatient = item.patient.firstName + " " + item.patient.lastName;
                item.patient = selectedPatient;
                console.log(item.patient, selectedPatient);
            });

            response.success = true;
            response.message = fetchedCases;
        }else{
            response.success = false;
            response.message = "Could not get provider active cases";
        }

        return response;
    }
    if(path === '/provider/manage/cases/inactiveCase'){
        let getInactiveCases = providerInactiveCases.filter((ac)=>ac===ac);
        console.log(params.providerId);
        console.log(params.date);
        console.log(params.extensionInDays);
        
        if(getInactiveCases){
            
            let fetchedCases = [];
        
            getInactiveCases.forEach(item=>fetchedCases.push(item));
            
            fetchedCases.forEach(item=>{
                let selectedPatient = item.patient.firstName + " " + item.patient.lastName;
                item.patient = selectedPatient;
                console.log(item.patient, selectedPatient);
            });
        
            response.success = true;
            response.message = fetchedCases;
        }else{
            response.success = false;
            response.message = "Could not get provider active cases";
        }

        return response;
    }

}

const api = {
    post,
    put,
    get,
};

export default api;