<template>
    <div v-show="dataIsPending">
        <h1>Loading...</h1>
    </div>
    <div v-show="dataLoaded">
        <div v-if="modalVisible">
            <provider-edit-modal
                :is-visible="dialogueVisible"
                :dialogue-data="dialogueData"
                @submit-dialogue="submitDialogue"
                @close-modal="closeModal"
            >
                <template #content="data">
                    <dx-select-box
                        search-mode="contains"
                        :items="data.dialogue.dataList"
                        :search-enabled="true"
                        :search-expr="data.dialogue.field"
                        :label="data.dialogue.field"
                        @selection-changed="data.dialogueUpdate($event.selectedItem, data.dialogue.field)"
                        @submit-dialogue="submitDialogue"
                    ></dx-select-box>
                </template>
            </provider-edit-modal>
        </div>
        <dx-button
            text="Add Zip"
            @click="openModal($event)"
        ></dx-button>
        <dx-button
            text="Add City"
            @click="openModal($event)"
        ></dx-button>
        <dx-button
            text="Add County"
            @click="openModal($event)" 
        ></dx-button>
        <!--The magic strings above need to be removed some how-->
        <dx-data-grid 
            ref="providerZips"
            :data-source="providerServiceAreas"
            :allow-column-reordering="true"
            :active-state-enabled="true"
            :height="300"
            @row-removing="deleteProviderServiceZip($event)"
        >
            <dx-editing
                :allow-deleting="true"
                :use-icons="true"
            ></dx-editing>
            <dx-filter-row :visible="true"></dx-filter-row>
            <dx-column data-field="zipCode"></dx-column>
            <dx-column data-field="city"></dx-column>
            <dx-column data-field="county"></dx-column>
            <dx-column :width="100" type="buttons">
                <dx-button
                    text="Delete"
                    name="delete"
                ></dx-button>
            </dx-column>
        </dx-data-grid>
    </div>
</template>
<script>
    import {
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxFilterRow,
        //DxList
    } from 'devextreme-vue/data-grid';

    import ProviderEditModal from '../ProviderEditModal.vue';
    import DxButton from 'devextreme-vue/button';
    import DxSelectBox from 'devextreme-vue/select-box';
    //import DxList from 'devextreme-vue/list';

    import api from '../../../callApi/devAPI';

    const apiUrls = {
        getProviderServiceAreas:{verb:"get", url:"/Provider/ServiceArea",},
        getProviderZipcodes:{verb:"get", url:"/ServiceAreas/getZipList",},
        getProviderCounties:{verb:"get", url:"/ServiceAreas/getCountyList",},
        getProviderCities:{verb:"get", url:"/ServiceAreas/getCityList",},
        addProviderServiceAreas:{verb:"post", url:"/provider/servicearea"},
        deleteProviderServiceArea:{verb:"post",url:"/provider/servicearea/deleteServiceArea"}
    };

    export default {
        components:{
            DxSelectBox,
            DxDataGrid,
            DxColumn,
            DxButton,
            DxEditing,
            DxFilterRow,
            ProviderEditModal,
        },
        data(){
            return{
                cityList:[],
                countyList:[],
                zipcodeList:[],
                providerServiceAreas:[],
                dataLoaded:false,
                dialogueData:{},
                dialogueVisible:false
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
            modalVisible(){
                return this.dialogueVisible === true;
            }
        },
        methods:{
            openModal(event){
                this.dialogueVisible=true;
                
                let modalName=event.component._props.text;
                let apiUrl = "";

                this.dialogueData={
                    modalName,
                    values:{},
                };
                
                switch(modalName){
                    case "Add Zip":
                        this.dialogueData.field = 'zipCode';
                        apiUrl = apiUrls.getProviderZipcodes.url;
                        break;
                    case "Add City":
                        this.dialogueData.field = 'city'
                         apiUrl = apiUrls.getProviderCities.url;
                        break;
                    case "Add County":
                        this.dialogueData.field = 'county';
                         apiUrl = apiUrls.getProviderCounties.url;
                        break;
                }
                
                const params = {id:this.providerIdIn};

                let getSelectedServiceAreaList = api.get(apiUrl,params);

                if(getSelectedServiceAreaList.success){
                    this.dialogueData.dataList = getSelectedServiceAreaList.message;
                }else{
                    console.log(getSelectedServiceAreaList.message);
                }
            },  
            closeModal(){
                this.dialogueVisible = false;
            },
            submitDialogue(data){
                this.dialogueVisible = false;
                
                const newServiceArea={
                    id:this.providerIdIn,
                    serviceArea:data
                };
                
                let addServiceArea = api.post('/provider/servicearea',newServiceArea);

                if(addServiceArea.success){
                    this.refreshServiceAreaData()
                }else{
                    console.log(addServiceArea.message);
                }

            },
            refreshServiceAreaData(){
                this.$refs.providerZips.instance.refresh().then(()=>{
                    this.loadData();
                });
            },
            deleteProviderServiceZip(event){
                event.cancel = true;
                 
                let params = {};

                params.id = this.providerIdIn;
                params.serviceAreaId = event.data.id;

                let deleteServiceArea = api.post(apiUrls.deleteProviderServiceArea.url, params);

                if(deleteServiceArea.success){
                     this.refreshServiceAreaData()
                }else{
                    console.log(deleteServiceArea.message);
                }
            },
            loadData(){
                if(this.dataLoaded) this.dataLoaded = false;

                const params = {id:this.providerIdIn};

                let getProviderServiceAreas = api.get(apiUrls.getProviderServiceAreas.url, params);

                console.log(getProviderServiceAreas);

                if(getProviderServiceAreas.success){
                    this.providerServiceAreas = getProviderServiceAreas.message;
                }else{
                    console.log(getProviderServiceAreas.message);
                }
                
                console.log(this.serviceAreas);

                this.dataLoaded = true;
            }
        }
    }
</script>
