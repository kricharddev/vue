<template>
    <div class="row">
        <div class="col-100">
            <div v-show="dataIsPending">
                <h1>Loading...</h1>
            </div>
            <div v-show="dataLoaded">
                <dx-popup
                    :visible="statusModalOpen"
                    :close-on-outside-click="true"
                    :show-close-button="true"
                    :show-title="true"
                    :width="500"
                    :height="300"
                    :drag-enabled="false"
                    title="Status History"
                    @hidden="closeStatusModal"
                >
                    <dx-data-grid
                        :data-source="providerInfoData.statusHistory"
                    >
                        <dx-column
                            data-field="statusName"
                        ></dx-column>
                        <dx-column
                            data-field="updateDate"
                        ></dx-column>
                    </dx-data-grid>
                </dx-popup>
                <form @submit.prevent="submitProviderInformation">
                    <dx-form
                        validation-group="providerData"
                        :show-colon-after-label="false"
                        :col-count="2"
                        :form-data="providerInfoData"
                    >
                        <dx-group-item
                            caption="Personal Info"
                        >
                            <form-item data-field="firstName">
                                <dx-required-rule message="First Name is required"></dx-required-rule>
                            </form-item>
                            <form-item data-field="lastName">
                                <dx-required-rule message="Last Name is required"></dx-required-rule>
                            </form-item>
                            <dx-group-item
                                :col-count="2"
                            >
                                <form-item data-field="type" editor-type="dxSelectBox" :editor-options="getProviderTypes">
                                    <dx-required-rule message="Type is required"></dx-required-rule>
                                </form-item>
                                <form-item data-field="subType" editor-type="dxSelectBox" :editor-options="getProviderSubTypes">
                                    <dx-required-rule message="Sub Type is required"></dx-required-rule>
                                </form-item>
                            </dx-group-item>
                            <form-item>
                                <dx-label text="Status"></dx-label>
                                <dx-box
                                    direction="row"
                                    width="100%"
                                >
                                    <box-item :ratio="1">
                                        <dx-select-box
                                            value-expr="value"
                                            display-expr="text"
                                            :value="providerInfoData.status"
                                            :items="providerInfoData.statusesList"
                                            @selection-changed="updateStatus($event)"
                                        >
                                        </dx-select-box>
                                    </box-item>
                                    <box-item :ratio="1">
                                        <dx-button
                                            text="Show Status Logs"
                                            @click="showStatusModal"
                                        >
                                        </dx-button>
                                    </box-item>
                                </dx-box>
                            </form-item>
                            <form-item>
                                <dx-label text="Gender"></dx-label>
                                <dx-button-group
                                    :items="providerGenderButtons"
                                    @selection-changed="setProviderGender($event)"
                                ></dx-button-group>
                            </form-item>
                            <form-item data-field="email1">
                                <dx-required-rule message="Email 1 is required"></dx-required-rule>
                                <dx-email-rule message="Email 1 is not valid"></dx-email-rule>
                            </form-item>
                            <form-item data-field="email2">
                                <dx-required-rule message="Email 2 is required"></dx-required-rule>
                                <dx-email-rule message="Email 2 is not valid"></dx-email-rule>
                            </form-item>
                            <form-item data-field="phone">
                                <dx-required-rule message="Phone 1 is required"></dx-required-rule>
                                <dx-pattern-rule message="Phone 1 is not valid" :pattern="phoneNumberPattern"></dx-pattern-rule>
                            </form-item>
                            <form-item data-field="phone2">
                                <dx-required-rule message="Phone 2 is required"></dx-required-rule>
                                <dx-pattern-rule message="Phone 2 is not valid" :pattern="phoneNumberPattern"></dx-pattern-rule>
                            </form-item>
                            <form-item data-field="fax">
                                <dx-required-rule message="Fax is required"></dx-required-rule>
                                <dx-pattern-rule message="Fax is not valid" :pattern="phoneNumberPattern"></dx-pattern-rule>
                            </form-item>
                            <dx-empty-item itemType="empty"></dx-empty-item>
                            <dx-empty-item itemType="empty"></dx-empty-item>
                            <form-item data-field="company" editor-type="dxSelectBox" :editor-options="getProviderCorperations">
                                <dx-required-rule message="Corperation is required"></dx-required-rule>
                            </form-item>
                            <form-item data-field="address1">
                                <dx-required-rule message="Address is required"></dx-required-rule>
                            </form-item>
                            <form-item data-field="address2">
                                <dx-required-rule message="Address 2 is required"></dx-required-rule>
                            </form-item>
                            <form-item data-field="city">
                                <dx-required-rule message="City is required"></dx-required-rule>
                            </form-item>
                            <dx-group-item
                                :col-count="2"
                            >
                                <form-item data-field="state" editor-type="dxSelectBox" :editor-options="getProviderStates">
                                    <dx-required-rule message="State is required"></dx-required-rule>
                                </form-item>
                                <form-item data-field="zip">
                                    <dx-required-rule message="Zip is required"></dx-required-rule>
                                    <dx-pattern-rule message="Zip is not valid" :pattern="numberPattern"></dx-pattern-rule>
                                </form-item>
                            </dx-group-item>
                        </dx-group-item>
                        <dx-group-item caption="Other Info">
                            <form-item>
                                <dx-label text="Languages"></dx-label>
                                <div :class="languageListValidationStyles">
                                    <dx-scroll-view 
                                        :show-scrollbar="'always'"
                                        :height="300"
                                    >
                                        <dx-list
                                            key-expr="id"
                                            display-expr="name"
                                            search-mode="contains"
                                            :selected-item-keys="providerInfoData.languageIds"
                                            :data-source="providerInfoData.allLanguages"
                                            :selection-mode="'multi'"
                                            :search-enabled="true"
                                            :show-selection-controls="true"
                                            @selection-changed="updateLanguages($event)"
                                        >
                                        </dx-list>
                                    </dx-scroll-view>
                                    <!--<dx-validator validation-group="providerData">
                                        <dx-required-rule message="Plese select at least 1 language"></dx-required-rule>
                                    </dx-validator>-->
                                </div>
                            </form-item>
                            <form-item>
                                <template #default>
                                    <dx-label text="Notes"></dx-label>
                                    <dx-text-area v-model:value="providerInfoData.notes" :height="200">
                                        <!--<dx-validator validation-group="providerData">
                                            <dx-required-rule message="Notes is required"></dx-required-rule>
                                        </dx-validator>-->
                                    </dx-text-area>
                                </template>
                            </form-item>
                        </dx-group-item>
                        <dx-button-item 
                            horizontal-alignment="left"
                            :button-options="submitButtonStyleProps"
                        >
                        </dx-button-item>
                    </dx-form>
                </form>
            </div>
        </div>
    </div>
</template>
<script>

    import DxTextArea from 'devextreme-vue/text-area';
    import DxList from 'devextreme-vue/list';
    import { DxScrollView } from 'devextreme-vue/scroll-view';
    import {
       //DxValidator,
       DxPatternRule,
       DxEmailRule
    } from 'devextreme-vue/validator';
    import DxButton from 'devextreme-vue/button';
    import DxForm, {
       DxRequiredRule,
       DxSimpleItem as FormItem,
       DxButtonItem,
       DxGroupItem,
       DxLabel,
       DxEmptyItem
    } from 'devextreme-vue/form';
    import DxButtonGroup from 'devextreme-vue/button-group';
    import DxSelectBox from 'devextreme-vue/select-box';
    import {
        DxBox,
        DxItem as BoxItem
    } from 'devextreme-vue/box';
    import { DxPopup } from 'devextreme-vue/popup';
    import {
        DxDataGrid,
        DxColumn
    } from 'devextreme-vue/data-grid'

    import api from '../../../callApi/devAPI';
    import {customValidatorUtils as validator, textValidationUtils as textValidator} from '../../../utils/ValidationUtils';
    
    // const apiUrls = {

    // };

    export default {
        components:{
            DxButton,
            DxTextArea,
            DxColumn,
            DxList,
            DxScrollView,
            DxForm,
            FormItem,
            DxLabel,
            DxButtonItem,
            DxGroupItem,
            DxRequiredRule,
            DxEmptyItem,
            DxEmailRule,
            DxPatternRule,
            DxButtonGroup,
            DxDataGrid,
            BoxItem,
            DxBox,
            DxSelectBox,
            DxPopup
        },
        data(){
            return{
                providerInfoData:{
                    firstName:"",
                    lastName:"",
                    gender:"",
                    status:0,
                    type:0,
                    subType:0,
                    company:0,
                    email1:"",
                    email2:"",
                    address1:"",
                    address2:"",
                    phone:"",
                    phone2:"",
                    fax:"",
                    city:"",
                    state:0,
                    zip:"",
                    languageIds:[],
                    providerSubTypeId:0,
                    notes:"",
                    typeInfo:{}, //This is for the header
                    statusHistory:[],
                    noteDetails:[],
                    corperations:[],
                    statusesList:[],
                    allLanguages:[],
                    subTypes:[],
                    types:[],
                    states:[],
                },
                dataLoaded:false,
                statusModalOpen:false,
            };
        },
        mounted(){
            this.loadData();
        },
        computed:{
            getProviderSubTypes(){
                return {
                    dataSource:this.providerInfoData.subTypes,
                    valueExpr:"id",
                    displayExpr:"code",
                };
            },
            getProviderNoteDetails(){
                return {
                    items:this.providerInfoData.noteDetails
                };
            },
            getProviderStates(){
                return {
                    dataSource:this.providerInfoData.states,
                    valueExpr:"id",
                    displayExpr:"abbreviation",
                }
            },
            getProviderTypes(){
                //Note: this probably needs to be re-thought, confirm with Jack.
                return {
                    dataSource:this.providerInfoData.types,
                    displayExpr:"name",
                    valueExpr:"id",
                    selectionChanged:this.updateType
                }
            },
            getProviderCorperations(){
                return {
                    dataSource:this.providerInfoData.corperations,
                    displayExpr:"name",
                    valueExpr:"id",
                }
            },
            getProviderStatusHistory(){
                return {items:this.statusHistory}
            },
            hasSelectedLanguages(){
                return this.providerSelectedLanguages.length > 0;
            },
            providerGenderButtons(){
                return[
                    {
                        text:'Male',
                    },
                    {
                        text:'Female',
                    },
                    {
                        text:'Other',
                    }
                ];
            },
            dataIsPending(){
                return !this.dataLoaded;
            },
            languageListValidationStyles(){
                return {
                    border:"add-border-grey"
                }
            },
            phoneNumberPattern(){
                return textValidator.phoneNumberPattern;
            },
            numberPattern(){
                return textValidator.numberTextPattern;
            },
            submitButtonStyleProps(){
                return{
                    text: 'Save Info',
                    type: 'success',
                    useSubmitBehavior: true,
                }
            },
        },
        props:{
            providerIdIn:{
                type:Number,
                required:true
            }
        },
        methods:{
            updateLanguages(event){
                console.log(event);
            },
            updateType(event){
                console.log(event);
            },
            updateSubType(event){
                console.log(event);
            },
            setProviderGender(event){
                let selectedGender = event.component._buttonsCollection._selection.options.selectedItemKeys[0];
                this.gender = selectedGender;
            },
            submitProviderInformation(event){
                let updatedProviderInfo = {};

                console.log(event);
                updatedProviderInfo.firstName=this.firstName;
                updatedProviderInfo.lastName=this.lastName;
                updatedProviderInfo.gender=this.gender;
                updatedProviderInfo.status=this.status;
                updatedProviderInfo.email1=this.email1;
                updatedProviderInfo.email2=this.email2;
                updatedProviderInfo.address1=this.address1;
                updatedProviderInfo.address2=this.address2;
                updatedProviderInfo.phone=this.phone;
                updatedProviderInfo.phone2=this.phone2;
                updatedProviderInfo.fax=this.fax;
                updatedProviderInfo.city=this.city;
                updatedProviderInfo.state=this.state;
                updatedProviderInfo.zip=this.zip;
                updatedProviderInfo.companyName=this.companyName;
                updatedProviderInfo.languages=this.languages;
                updatedProviderInfo.providerSubTypeId=this.providerSubTypeId;
                updatedProviderInfo.notes=this.notes;
                updatedProviderInfo.noteDetails=this.noteDetails;
                updatedProviderInfo.corperations=this.corperations;
                
            },
            setUpValidator(params){
                
                let providerLanguagesValidator = validator({
                    callbacks:params.callbacks,
                    validationLogic: params.callbacks,
                    isValidValue: params.isValidValue,
                    isInvalidValue: params.isInvalidValue
                });

                return providerLanguagesValidator;
            },
            refreshData(){
                console.log("Provider Info Refresh");
                this.loadData();
            },
            updateStatus(event){
                console.log(event);
            },
            showStatusModal(){
                this.statusModalOpen = true;
            },
            closeStatusModal(){
                this.statusModalOpen = false;
            },
            loadData(){
               if(this.dataLoaded) this.dataLoaded = false;

                const params = {id:this.providerIdIn};

                let getProviderInfo = api.get('/provider/manage',params);
                
                if(getProviderInfo.success){

                    this.providerInfoData.firstName=getProviderInfo.message.firstName;
                    this.providerInfoData.lastName=getProviderInfo.message.lastName;
                    this.providerInfoData.gender=getProviderInfo.message.gender;
                    this.providerInfoData.status=getProviderInfo.message.status;
                    this.providerInfoData.email1=getProviderInfo.message.email1;
                    this.providerInfoData.email2=getProviderInfo.message.email2;
                    this.providerInfoData.address1=getProviderInfo.message.address1;
                    this.providerInfoData.address2=getProviderInfo.message.address2;
                    this.providerInfoData.phone=getProviderInfo.message.phone;
                    this.providerInfoData.phone2=getProviderInfo.message.phone2;
                    this.providerInfoData.fax=getProviderInfo.message.fax;
                    this.providerInfoData.city=getProviderInfo.message.city;
                    this.providerInfoData.state=getProviderInfo.message.state;
                    this.providerInfoData.zip=getProviderInfo.message.zip;
                    this.providerInfoData.company=getProviderInfo.message.company;
                    this.providerInfoData.languageIds=getProviderInfo.message.languageIds;
                    this.providerInfoData.statusHistory=getProviderInfo.message.statusHistory;
                    this.providerInfoData.type=getProviderInfo.message.type; 
                    this.providerInfoData.subType=getProviderInfo.message.subType;
                    this.providerInfoData.notes=getProviderInfo.message.notes;
                    this.providerInfoData.noteDetails=getProviderInfo.message.noteDetails;
                    this.providerInfoData.corperations=getProviderInfo.message.corperations;

                    let getAllLanguages = api.get('/provider/languages');
                    let getTypes = api.get('/provider/types');
                    let getStatuses = api.get('/provider/statuses');
                    let getSubTypes = api.get('/provider/subtypes');
                    let getCorperations = api.get('/provider/corperations');
                    let getStates = api.get('/provider/states');
                    
                    if(getAllLanguages.success){
                        this.providerInfoData.allLanguages = getAllLanguages.message;
                    }else{
                        console.log(getAllLanguages.message);
                    }

                    if(getTypes.success){
                        this.providerInfoData.types = getTypes.message;
                    }else{
                        console.log(getTypes.message);
                    }

                    if(getStatuses.success){
                        this.providerInfoData.statusesList = getStatuses.message;
                    }else{
                        console.log(getStatuses.message);
                    }

                    if(getSubTypes.success){
                        this.providerInfoData.subTypes = getSubTypes.message;
                    }else{
                        console.log(getTypes.message);
                    }

                    if(getCorperations.success){
                        this.providerInfoData.corperations = getCorperations.message;
                    }else{
                        console.log(getCorperations.message);
                    }

                    if(getStates.success){
                        this.providerInfoData.states = getStates.message;
                    }else{
                        console.log(getCorperations.message);
                    }
                    
                    this.dataLoaded = true;
                }else{
                    console.log(getProviderInfo.message);
                }
            }
        },
    };
</script>
