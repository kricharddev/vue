<template>
    <div v-show="dataIsPending">
        <h1>Loading...</h1>
    </div>
    <div v-show="dataLoaded">
        <div class="col-100">
            <form @submit.prevent="">
                <dx-form
                    validation-group="providerHRData"
                    :show-colon-after-label="false"
                    :col-count="2"
                    :form-data="$data"
                >
                    <dx-group-item caption="Hiring Information">
                        <dx-empty-item></dx-empty-item>
                        <dx-group-item
                            :col-count="3"
                        >
                            <form-item editor-type="dxCheckBox" data-field="isHire">
                            </form-item>
                            <form-item :col-span="2" data-field="hireDate" editor-type="dxDateBox" :editor-options="datePickerOptions">
                            </form-item>
                        </dx-group-item>
                        <dx-group-item :col-count="3">
                            <form-item  editor-type="dxCheckBox" data-field="hasResume" :editor-options="hasResumeOptions">
                            </form-item>
                            <dx-group-item :col-span="2">
                                <form-item>
                                    <dx-label v-if="loadedResumePresent" text="Current Resume"></dx-label>
                                    <dx-label v-else text="Upload Resume"></dx-label>
                                    <span></span>
                                    <div v-if="loadedResumePresent">
                                        <dx-button
                                            text="Download Resume"
                                            icon="download"
                                            @click="downloadResume"
                                        ></dx-button>
                                    </div>
                                    <div v-else>
                                        <dx-file-uploader
                                            label-text=""
                                            width="100%"
                                            select-button-text="Browse..."
                                            upload-mode="useForm"
                                            :col-span="2"
                                            :element-attr="resumeUploaderAttributes"
                                            :value="resumeFile"
                                        >
                                            <!--You will need to add a validator here-->
                                        </dx-file-uploader>
                                    </div>
                                </form-item> 
                            </dx-group-item>
                        </dx-group-item>
                        <form-item editor-type="dxCheckBox" data-field="hasReferences">
                        </form-item>
                        <form-item editor-type="dxCheckBox" data-field="hasBackgroundCheck">
                        </form-item>
                        <dx-empty-item></dx-empty-item>
                        <dx-empty-item></dx-empty-item>
                        <dx-group-item :col-count="3">
                            <form-item :col-span="3">
                                <dx-label v-if="hasSignatureImage" text="Current Signature"></dx-label>
                                <dx-label v-else text="Provider Signature"></dx-label>
                                <span></span>
                                <div v-if="hasSignatureImage">
                                    <dx-button
                                        text="Reset Signature"
                                        icon="refresh"
                                        @click="downloadResume"
                                    ></dx-button>
                                </div>
                                <div v-else>
                                    <dx-file-uploader
                                        label-text=""
                                        upload-mode="useForm"
                                        select-button-text="Browse..."
                                        :element-attr="signatureUploaderAttributes"
                                        @value-changed="uploadFiles($event)"
                                        :value="signatureImage"
                                    >
                                        <!--You will need to add a validator here-->
                                    </dx-file-uploader>
                                </div>
                            </form-item>
                        </dx-group-item>
                        <dx-empty-item></dx-empty-item>
                        <dx-empty-item></dx-empty-item>
                        <dx-button-item 
                            horizontal-alignment="left"
                            :button-options="submitHiringInfoStyleProps"
                        >
                        </dx-button-item>
                    </dx-group-item>
                    <dx-group-item caption="Payment Information">
                        <dx-empty-item></dx-empty-item>
                        <form-item>
                            <dx-label text="Payroll Id"></dx-label>
                            <dx-text-box
                                placeholder="generate payroll id"
                                :value="payrolId"
                            >
                                <dx-text-box-button
                                    :options="payrolIdButtonOptions"
                                    name="generateId"
                                    location="after"
                                ></dx-text-box-button>
                            </dx-text-box>
                        </form-item>
                        <dx-empty-item></dx-empty-item>
                        <dx-group-item :col-count="2">
                            <form-item editor-type="dxCheckBox" data-field="isSalary">
                            </form-item>
                            <form-item :col-span="2" data-field="salaryAmount" :editor-options="salaryInputOptions">
                            </form-item>
                        </dx-group-item>
                    </dx-group-item>
                </dx-form>
            </form>
        </div>
        <hr/>
        <div class="col-100">
            <h2 class="custom-item-label">Rate History</h2>
            <dx-data-grid 
                :data-source="providerRates"
                :active-state-enabled="false"
                @row-inserting="updatProviderRates($event, apis.addProviderRate.verb, apis.addProviderRate.url)"
                @row-removing="updatProviderRates($event, apis.deleteProviderRate.verb, apis.deleteProviderRate.url)"
                @row-updating="updatProviderRates($event, apis.updateProviderRate.verb, apis.updateProviderRate.url)"
                key-expr="id"
                ref="providerRates"
            >
                <dx-editing
                    :allow-deleting="true"
                    :allow-updating="true"
                    :allow-adding="true"
                    :use-icons="true"
                    mode="row"
                >
                </dx-editing>
                <dx-load-panel :enabled="ratesLoaded"></dx-load-panel>
                <dx-column data-field="formattedRate" caption="Rate Amount">
                    <dx-required-rule
                        message="You must enter a currency value"
                    ></dx-required-rule>
                    <dx-pattern-rule 
                        :pattern="validateCurrencyInput"
                        message="value must be a currency (ex. $100.00)"
                    ></dx-pattern-rule>
                </dx-column>
                <dx-column data-field="formattedEffectiveDate" data-type="date" format="yyyy/dd/mm" caption="Issued Date">
                    <dx-required-rule
                        message="You must enter a date"
                    ></dx-required-rule>
                </dx-column>
            </dx-data-grid>
        </div>
    </div>
</template>
<script>
    import DxForm, {
        DxSimpleItem as FormItem,
        DxButtonItem,
        DxLabel,
        DxGroupItem,
        DxEmptyItem,
        DxRequiredRule,
        DxPatternRule
    } from 'devextreme-vue/form';
    import DxFileUploader from 'devextreme-vue/file-uploader';
    import {
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxLoadPanel
    } from 'devextreme-vue/data-grid';  
    import { DxTextBox, DxButton as DxTextBoxButton } from 'devextreme-vue/text-box';
    import DxButton from 'devextreme-vue/button';
    import { textValidationUtils } from '../../../utils/ValidationUtils';

    import api from '../../../callApi/devAPI';
    
    //use these later in other sections as well!
    const apiUrls = {
        getPayrollId:{verb:'get', url:'/provider/manage/humanresources/GetPayrollId'},
        updatePaymentAndHiringInfo:{verb:'get', url:'/provider/manage/humanresources'},
        addProviderRate:{verb:'post',url:'/provider/manage/humanresources/AddRate'},
        updateProviderRate:{verb:'put',url:'/provider/manage/humanresources/EditRate'},
        deleteProviderRate:{verb:'softDel',url:'/provider/manage/humanresources/DeleteRate'},
        getProviderResume:{verb:'get', url:'/provider/manage/humanresources/GetResume'},
        getProviderSignature:{verb:'get', url:'/provider/manage/humanresources/GetProviderSignatureImage'}
    };
    
    export default {
        components:{
            DxEditing,
            DxForm,
            DxButtonItem,
            DxGroupItem,
            DxFileUploader,
            FormItem,
            DxEmptyItem,
            DxLabel,
            DxTextBoxButton,
            DxDataGrid,
            DxTextBox,
            DxColumn,
            DxRequiredRule,
            DxPatternRule,
            DxLoadPanel,
            DxButton
        },
        data(){
            return{
                apis:apiUrls,
                providerId:0,
                hasBackgroundCheck:false,
                hasSignatureImage:false,
                hasReferences:false,
                hasResume:false,
                hireDate:"",
                resumeUploaded:false,
                isHire:false,
                isSalary:false,
                payrolId:0,
                hourlyRate:0,
                salaryAmount:0,
                providerRates:[],
                signatureImage:[],
                resumeFile:[],
                resumeFileName:"",
                dataLoaded:false,
                ratesLoaded:false
            }; 
        },
        props:{
            providerIdIn:{
                type:Number,
                required:true
            }
        },
        mounted(){
            console.log("Mounted");
            this.loadData();
            
        },
        computed:{
            dataIsPending(){
                return !this.dataLoaded;
            },
            getRates(){
                return this.providerHrInfo.Rates;
            },
            resumeUploaderAttributes(){
                return{
                    class:(this.hasResume ? "" : "disabled-item ")+"no-padding add-border-grey provider-file-upload"
                };
            },
            signatureUploaderAttributes(){
                return{
                    class:(this.hasSignatureImage ? "" : "")+ "no-padding add-border-grey provider-file-upload"
                };
            },
            validateCurrencyInput(){
                return textValidationUtils.currencyTextPattern;
            },
            submitHiringInfoStyleProps(){
                return{
                    text: 'Save Info',
                    type: 'success',
                    useSubmitBehavior: false,
                    onClick:this.submitProviderInformation
                };
            },
            datePickerOptions(){
                return {
                    type:'date',
                    pickerType:'calendar',
                    onValueChanged:self.getSelectedDate,
                    dateSerializationFormat:"MM/dd/yyyy",
                    elementAttr:{
                        class:(!this.isHire ? "disabled-item " : "")
                    }
                };
            },
            salaryInputOptions(){
                return {
                   elementAttr:{
                       class:(this.isSalary? "" : "disabled-item ")
                   } 
                };
            },
            payrolIdButtonOptions(){
                return{
                    text: 'Generate Id',
                    type:'default',
                    onClick:this.generatePayrollId
                }
            },
            hasResumeOptions(){
                return{
                    onOptionChanged:this.canResetResume
                }
            },
            loadedResumePresent(){
                return this.resumeUploaded && this.hasResume;
            },
        },
        methods:{
            submitProviderInformation(){
                let params = {};

                params.providerId = this.providerId;
                params.hasBackgroundCheck = this.hasBackgroundCheck;
                params.hasReferences = this.hasReferences;
                params.hasResume = this.hasResume;
                params.hireDate = (this.isHire ? this.hireDate : "");
                params.isHire = this.isHire;
                params.isSalary = this.isSalary;
                params.payrolId = this.payrolId;
                params.resumeFileName = this.resumeFileName;
                params.signatureImage = (this.hasSignatureImage ? this.signatureImage : {});
                params.resumeFile = (this.hasResume ? this.resumeFile : {});
                params.salaryAmount = (this.isSalary ? this.salaryAmount : 0);

                let addProviderHrInfo = api.post(apiUrls.updatePaymentAndHiringInfo.url, params);

                if(addProviderHrInfo.success){
                    console.log("Submitted",addProviderHrInfo.message);
                    this.loadData();
                }else{
                    console.log(addProviderHrInfo.message);
                }

                console.log(params);
            },
            getSelectedDate(event){
                if(event.value !== null){
                    this.providerHrInfo.hireDate = event.value;
                }
            },
            generatePayrollId(){
                let getPayrollId = api.get(getPayrollId);

                if(getPayrollId.success){
                     this.payrolId = getPayrollId.message;
                }else{
                    console.log(getPayrollId.message);
                }

            },
            loadData(){
                if(this.dataLoaded) this.dataLoaded = false;

                let params = {id:this.providerIdIn};

                let getHumanResources = api.get('/provider/manage/humanresources', params);
                
                if(getHumanResources.success){
                    this.providerId =  getHumanResources.message.providerId;
                    this.hasBackgroundCheck =  getHumanResources.message.hasBackgroundCheck;
                    this.hasReferences = getHumanResources.message.hasReferences;
                    this.hasResume = getHumanResources.message.hasResume;
                    this.hireDate = getHumanResources.message.hireDate;
                    this.isHire = getHumanResources.message.isHire;
                    this.isSalary = getHumanResources.message.isSalary;
                    this.payrolId = getHumanResources.message.payrolId;
                    this.hourlyRate = getHumanResources.message.hourlyRate;
                    this.salaryAmount = getHumanResources.message.salaryAmount;
                    this.resumeFileName = getHumanResources.message.resumeFileName;
                    this.hasSignatureImage = getHumanResources.message.hasSignatureImage;
                    this.resumeUploaded = getHumanResources.message.resumeUploaded;

                    console.log(this.resumeUploaded);

                    this.loadRates();

                    this.dataLoaded = true;

                }else{
                    console.log(getHumanResources.message);
                }
            },
            refreshData(){
                this.loadData();
            },
            updatProviderRates(event, mode, url){
                event.cancel = true;

                let params = {};

                let updateProviderRate = {}

                console.log(mode);

                if(mode === "post"){
                    params.id = this.providerIdIn;
                    params.rate=parseFloat(event.data.formattedRate.replace('$','')).toFixed(2),
                    params.effectiveDate = event.data.formattedEffectiveDate;
                    
                    updateProviderRate = api[mode](url, params);

                }else if(mode === "put"){

                    let determineDate = (event.newData.formattedEffectiveDate ? 
                        event.newData.formattedEffectiveDate 
                        : 
                        event.oldData.formattedEffectiveDate
                    );

                    params.providerId = this.providerIdIn;
                    params.rate=parseFloat(event.newData.formattedRate.replace('$','')),
                    params.date=determineDate;
                    params.rateId=event.oldData.id;

                    updateProviderRate = api[mode](url, params);

                }else if(mode === "softDel"){
                    
                    params.id = this.providerIdIn;
                    params.rateId = event.data.id;

                    updateProviderRate = api.post(url, params);
                }

                if(updateProviderRate.success){
                    this.$refs.providerRates.instance.refresh().then(()=>{ 
                        this.$refs.providerRates.instance.cancelEditData();
                        this.loadRates();
                    });
                }else{
                    console.log(updateProviderRate.message);
                }
                
            },
            loadRates(){
                if (this.ratesLoaded) this.ratesLoaded = false;

                let params = {id:this.providerIdIn};

                let getProviderRates = api.get('/provider/manage/humanresources/GetRates',params);

                if(getProviderRates.success){
                    this.providerRates = getProviderRates.message;
                    this.ratesLoaded = true;
                }else{
                    console.log(getProviderRates.message);
                }
            },
            canResetResume(event){
                console.log("Event",event);
                if(this.hasResume && this.resumeUploaded && event.previousValue){
                    this.hasResume = false;
                    this.resumeUploaded = false;

                    if(this.resumeFile.length > 0){
                        this.resumeFile = [];
                    }
                }
            },
            downloadResume(){
                let params = {id:this.providerIdIn};
                let getDocument = api[apiUrls.getProviderResume.verb](apiUrls.getProviderResume.url, params);
                
                if(getDocument.success){
                    this.resumeFile.push(getDocument.message.file);
                    this.resumeFileName = getDocument.message.fileName;
                }else{
                    console.log(getDocument.message, this.resumeFile);
                }
            },
            downloadOrResetSignature(event){
                let currentButton = event.addedItems[0].text;

                if(currentButton.includes("Reset")){
                    this.signatureImage = [];
                    this.hasSignatureImage = false;
                }else{
                    let params = {id:this.providerIdIn};

                    let getSignatureFile = api.get('/provider/manage/humanresources/GetRates',params);

                    if(getSignatureFile.success){
                        this.signatureImage.push(getSignatureFile.message.file);
                    }else{
                        console.log(getSignatureFile.success);
                    }
                }
            }
        },
    };
</script>