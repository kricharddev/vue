<template>
    <div v-show="dataIsPending">
        <h1>Loading...</h1>
    </div>
    <div v-show="dataLoaded">
        <form @submit.prevent="submitProviderSettings">
            <dx-form
                validation-group="providerSettings"
                :show-colon-after-label="false"
                :col-count="1"
                :form-data="$data"
            >
                <dx-group-item :col-count="2">
                    <form-item editor-type="dxCheckBox" data-field="sessionEntryRestriction">
                    </form-item>
                    <form-item editor-type="dxNumberBox" data-field="precheckDaysAdvance">
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
        DxSimpleItem as FormItem,
        DxButtonItem,
        DxGroupItem,
    } from 'devextreme-vue/form';

    import api from '../../../callApi/devAPI';

    export default{
        components:{
            DxForm,
            FormItem,
            DxButtonItem,
            DxGroupItem,  
        },
        data(){
            return{
                sessionEntryRestriction:false,
                precheckDaysAdvance:0,
                dataLoaded:false
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
        computed:{
            dataIsPending(){
                return !this.dataLoaded;
            },
            sessionEntryRestrictionsSelected(){
                return (this.sessionEntryRestriction > 0 ? "true" : "false");
            },
            submitButtonStyleProps(){
                return{
                    text: 'Save Info',
                    type: 'success',
                    useSubmitBehavior: true,
                };
            },
        },
        methods:{
            refreshData(){
                this.loadData();
            },
            submitProviderSettings(){

                let sessionEntryRestricted = this.sessionEntryRestriction;
                let objectToSubmit = {};
                
                objectToSubmit.providerId = this.providerIdIn;
                objectToSubmit.precheckDaysAdvance = this.precheckDaysAdvance;
                objectToSubmit.sessionEntryRestriction = (sessionEntryRestricted ? 1 : 0);
                
                console.log(objectToSubmit);

                api.post('/provider/manage/settings', objectToSubmit);

                this.refreshData();
            },
            loadData(){
                if(this.dataLoaded) this.dataLoaded = false;

                let params = {id:this.providerIdIn}
                let getSettingsData = api.get('/provider/manage/settings', params);
                
                if(getSettingsData.success){
                    let fetchedData = getSettingsData.message;

                    this.sessionEntryRestriction = fetchedData.sessionEntryRestriction > 0 ? true : false;
                    this.precheckDaysAdvance = fetchedData.precheckDaysAdvance;
                }else{
                    console.log(getSettingsData.message)
                }
                
                this.dataLoaded = true;
            }
        }
    }
</script>
