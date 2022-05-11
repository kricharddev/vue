<template>
    <div v-show="dataIsPending">
        <h1>Loading...</h1>
    </div>
    <div v-show="dataLoaded">
        <form @submit.prevent="submitCommunicationSettings">
            <dx-form
                validation-group="communications"
                :show-colon-after-label="false"
                :col-count="3"
                :form-data="$data"
            >
                <dx-group-item
                    caption="Primary Contact Info"
                >
                    <form-item data-field="email">
                        <dx-required-rule message="Email is rquired"></dx-required-rule>
                        <dx-email-rule message="Email is not valid"></dx-email-rule>
                    </form-item>
                    <form-item data-field="phone">
                        <dx-required-rule message="Phone is rquired"></dx-required-rule>
                        <dx-pattern-rule message="Phone 1 is not valid" :pattern="phoneNumberPattern"></dx-pattern-rule>
                    </form-item>
                </dx-group-item>
                <dx-group-item
                    caption="SMS Settings"
                >
                    <form-item editor-type="dxCheckBox" data-field="allowMarketingSMS">
                    </form-item>
                    <form-item editor-type="dxCheckBox" data-field="allowNotificationSMS">
                    </form-item>
                    <form-item editor-type="dxCheckBox" data-field="allowConversationalSMS">
                    </form-item>
                </dx-group-item>
                <dx-group-item
                    caption="Email Settings"
                >
                    <form-item editor-type="dxCheckBox" data-field="allowNotificationEmail">
                    </form-item>
                    <form-item editor-type="dxCheckBox" data-field="allowMarketingEmail">
                    </form-item>
                    <form-item editor-type="dxCheckBox" data-field="allowConversationalEmail">
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
</template>
<script>
    import DxForm, {
       DxEmailRule,
       DxRequiredRule,
       DxSimpleItem as FormItem,
       DxButtonItem,
       DxGroupItem,
       DxPatternRule
    } from 'devextreme-vue/form';

    import api from '../../../callApi/devAPI';
    import {textValidationUtils as textValidator} from '../../../utils/ValidationUtils';

    export default {
        components:{
            DxForm,
            FormItem,
            DxGroupItem,
            DxRequiredRule,
            DxEmailRule,
            DxButtonItem,
            DxPatternRule
        },
        data(){
            return{
                providerId:0,
                email:'',
                phone:'',
                allowMarketingSMS:false,
                allowNotificationSMS:false,
                allowConversationalSMS:false,
                allowNotificationEmail:false,
                allowMarketingEmail:false,
                allowConversationalEmail:false,
                dataLoaded:false,
            };
        },
        props:{
            providerIdIn:{
                type:Number,
                required:true
            }
        },
        mounted(){
            this.loadData();
            console.log('Mounted');
        },
        computed:{
            dataIsPending(){
                return !this.dataLoaded;
            },
            phoneNumberPattern(){
                return textValidator.phoneNumberPattern;
            },
            submitButtonStyleProps(){
                return{
                    text: 'Save Info',
                    type: 'success',
                    useSubmitBehavior: true,
                }
            }
        },
        methods:{
            submitCommunicationSettings(){
                this.providerId = this.providerIdIn;
                
                api.post('/provider/manage/communications',this.$data);
                
                this.refreshData();
            },
            refreshData(){
               this.loadData(); 
            },
            loadData(){
                if(this.dataLoaded) this.dataLoaded = false;
                
                console.log(this.providerIdIn);

                let params = {id:this.providerIdIn}
                let getCommunicationsData = api.get('/provider/manage/communications',params);
                
                if(getCommunicationsData.success){
                    
                    console.log(getCommunicationsData.message);
                    
                    let loadedData = getCommunicationsData.message;

                    this.email = loadedData.email;
                    this.phone = loadedData.phone;
                    this.allowMarketingSMS = loadedData.allowMarketingSMS;
                    this.allowNotificationSMS = loadedData.allowNotificationSMS;
                    this.allowConversationalSMS = loadedData.allowConversationalSMS;
                    this.allowNotificationEmail = loadedData.allowNotificationEmail;
                    this.allowMarketingEmail = loadedData.allowMarketingEmail;
                    this.allowConversationalEmail = loadedData.allowConversationalEmail;

                    console.log(this.$data);
                }else{
                    console.log(getCommunicationsData.message)
                }

                this.dataLoaded = true;                
            }

        }
    }
</script>
