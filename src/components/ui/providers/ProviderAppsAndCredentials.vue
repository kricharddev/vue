<template>
    <div v-show="dataIsPending">
        <h1>Loading...</h1>
    </div>
    <div v-show="dataLoaded">
        <form @submit.prevent="submitAppsAndCreds">
            <dx-form
                validation-group="providerAppsAndCreds"
                :show-colon-after-label="false"
                :col-count="2"
                :form-data="$data"
            >
                <dx-group-item
                    caption="App Permissions And Credentials"
                >
                    <dx-empty-item></dx-empty-item>
                    <form-item data-field="mobileUsername" :editor-options="normalTextboxOptions"></form-item>
                    <form-item>
                        <dx-label text="Mobile Password"></dx-label>
                        <dx-text-box
                            v-model.lazy:value="mobilePassword"
                            :buttons="mobilePasswordButtons"
                            :mode="mobilePasswordTextboxMode"
                        >
                        </dx-text-box>
                    </form-item>
                    <dx-empty-item></dx-empty-item>
                    <form-item data-field="catalystUsername" :editor-options="normalTextboxOptions"></form-item>
                    <form-item>
                        <dx-label text="Catalyst Password"></dx-label>
                        <dx-text-box
                            v-model.lazy:value="catalystPassword"
                            :buttons="catalystPasswordButtons"
                            :mode="catalystPasswordTextboxMode"
                        >
                        </dx-text-box>
                    </form-item>
                    <dx-empty-item></dx-empty-item>
                    <form-item >
                        <dx-label text="Admin App Access"></dx-label>
                        <dx-button-group
                            :items="adminAccessButtons"
                        ></dx-button-group>
                    </form-item>
                </dx-group-item>
                <dx-group-item
                    caption="Manage Redemption Codes"
                >
                    <dx-empty-item></dx-empty-item>
                    <form-item>
                        <dx-label text="Current Code"></dx-label>
                        <dx-text-box
                            v-model.lazy:value="redemptionCode"
                            :buttons="generateCodeButton"
                        >
                        </dx-text-box>
                    </form-item>
                </dx-group-item>
            </dx-form>
        </form>
    </div>
</template>
<script>
    import DxForm, {
        DxSimpleItem as FormItem,
        DxGroupItem,
        DxEmptyItem,
        DxLabel
    } from 'devextreme-vue/form';

    import DxButtonGroup from 'devextreme-vue/button-group';
    import DxTextBox from 'devextreme-vue/text-box';

    import api from '../../../callApi/devAPI';

    //import RenderTest from '../../debug/RenderTest.vue';

    export default {
        components:{
            DxForm,
            FormItem,
            DxGroupItem,
            DxButtonGroup,
            DxEmptyItem,
            DxTextBox,
            DxLabel,
            //RenderTest
        },
        data(){
            return{
                providerId:0,
                mobileUsername:'',
                mobilePassword:'',
                catalystUsername:'',
                catalystPassword:'',
                redemptionCode:'',
                dataLoaded:false,
                showMobilePassword:false,
                showCatalystPassword:false
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
        },
        updated(){
            console.log("updated");
        },
        computed:{
            dataIsPending(){
                return !this.dataLoaded;
            },
            normalTextboxOptions(){
                return{
                    disabled:false,
                };
            },
            mobilePasswordTextboxMode(){
                return(this.showMobilePassword ? 'text' : 'password');
            },
            catalystPasswordTextboxMode(){
                return(this.showCatalystPassword ? 'text' : 'password');
            },
            mobilePasswordButtons(){
                return[{
                    location:'after',
                    name:(this.showMobilePassword ? 'Hide' : 'Show'),
                    options:{
                        text:(this.showMobilePassword ? 'Hide' : 'Show'),
                        type:'default',
                        onClick:this.showHideMobilePassword
                    }
                },{
                    location:'after',
                    name:'Reset',
                    options:{
                        text:'Reset',
                        type:'danger',
                        onClick:this.resetPassword
                    }
                }]
            },
            submitButtonStyleProps(){
                return{
                    text: 'Save Info',
                    type: 'success',
                    useSubmitBehavior: true,
                }
            },
            catalystPasswordButtons(){
                return[{
                    location:'after',
                    name:(this.showCatalystPassword ? 'Hide' : 'Show'),
                    options:{
                        text:(this.showCatalystPassword ? 'Hide' : 'Show'),
                        type:'default',
                        onClick:this.showHideCatalystPassword
                    }
                }];
            },
            adminAccessButtons(){
                return[
                    {
                        text:'Grant',
                        onClick:this.acceptAdminAccess
                    },
                    {
                        text:'Revoke',
                        onClick:this.revokeAdminAccess
                    }
                ];
            },
            generateCodeButton(){
                return[{
                     location:'after',
                     name:'AssignCode',
                     options:{
                         text:'Assign Code',
                         type:'default',
                         onClick:this.generateRedemptionCode
                     }    
                }];
            }
        },
        methods:{
            refreshData(){
                this.loadData();
            },
            showHideMobilePassword(){
                this.showMobilePassword = !this.showMobilePassword;
            },
            showHideCatalystPassword(){
                this.showCatalystPassword = !this.showCatalystPassword;
            },
            resetPassword(event){
                console.log(event);
            },
            acceptAdminAccess(){
                this.allowAdminAccess = true;

                let params = {
                    id:this.providerIdIn,
                    allowAdminAccess:this.allowAdminAccess
                };

                api.post('/provider/manage/apps-credentials/changeProviderAdminAuth',params);
                
                let adminAccessUpdate = api.post('/provider/manage/apps-credentials/changeProviderAdminAuth',params);

                if(adminAccessUpdate.success){
                    console.log("Admin access granted");
                }else{
                    console.log(adminAccessUpdate.message);
                }
            },
            revokeAdminAccess(){
                this.allowAdminAccess = false;

                let params = {
                    id:this.providerIdIn,
                    allowAdminAccess:this.allowAdminAccess
                };

                let adminAccessUpdate = api.post('/provider/manage/apps-credentials/changeProviderAdminAuth',params);

                if(adminAccessUpdate.success){
                    console.log("Admin access revoked");
                }else{
                    console.log(adminAccessUpdate.message);
                }
            },
            generateRedemptionCode(){
                let redemptionCodeParams = {id:this.providerIdIn};
                
                console.log(redemptionCodeParams);

                let getNewRedemtionCode = api.post('/provider/manage/apps-credentials/assignCodeToProvider',redemptionCodeParams);

                if(getNewRedemtionCode.success){
                    this.redemptionCode = getNewRedemtionCode.message;

                    let emailParams = {...redemptionCodeParams, code:this.redemptionCode};
                    let sendEmail = api.post('/provider/manage/apps-credentials/sendCodeToProviderByEmail',emailParams);
                    
                    console.log(sendEmail.message);
                }else{
                    console.log(getNewRedemtionCode.message);
                }

                this.refreshData();
            },
            loadData(){
                if(this.dataLoaded) this.dataLoaded = false;

                let params = {id:this.providerIdIn}
                let getProviderAppsAndCredentials = api.get('/provider/manage/apps-credentials',params);

                if(getProviderAppsAndCredentials.success){
                    let setProviderAppsCreds = getProviderAppsAndCredentials.message;

                    this.mobileUsername = setProviderAppsCreds.mobileUsername;
                    this.mobilePassword = setProviderAppsCreds.mobilePassword;
                    this.catalystUsername = setProviderAppsCreds.catalystUsername;
                    this.catalystPassword = setProviderAppsCreds.catalystPassword;
                    this.redemptionCode = setProviderAppsCreds.redemptionCode;
                    this.allowAdminAccess = setProviderAppsCreds.allowAdminAccess;
                    
                }else{
                    console.log(getProviderAppsAndCredentials.message)
                }

                this.dataLoaded = true;
            }
        }
    }
</script>
