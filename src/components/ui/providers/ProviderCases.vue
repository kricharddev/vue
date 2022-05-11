<template>
     <div v-show="dataIsPending">
        <h1>Loading...</h1>
    </div>
    <div v-show="dataLoaded">
        <dx-box>
            <dx-item :ratio="1">
                <dx-accordion
                    :multiple="false"
                    :collapsible="true"
                >
                    <acc-item title="Active Cases">
                        <dx-list
                            :data-source="activeCases"
                            :height="300"
                            :search-enabled="true"
                            search-expr="patient"
                            key-expr="id"
                            display-expr="patient"                    
                        ></dx-list>
                    </acc-item>
                    <acc-item title="Inactive Cases">
                        <dx-list
                            :data-source="inactiveCases"
                            :height="300"
                            :search-enabled="true"
                            search-expr="patient"
                            key-expr="id"
                            display-expr="patient"
                        ></dx-list>
                    </acc-item>
                </dx-accordion>
            </dx-item>
            <dx-item :ratio="0.07"></dx-item>
            <dx-item :ratio="3">
                <dx-box
                    direction="row"
                    width="100%"
                >
                    <dx-item :ratio="5">
                        <dx-box 
                            direction="row"
                            width="100%"
                        >
                            <dx-item :ratio="1">
                                <p class="no-margin">
                                    <b>Total Hours : </b>
                                    <span v-if="hoursLoaded">{{hoursAndDates.totals.totalHoursWorked}}</span>
                                </p>
                            </dx-item>
                            <dx-item :ratio="1">
                                <p class="no-margin">
                                    <b>Total Payable Hours : </b>
                                    <span v-if="hoursLoaded">{{hoursAndDates.totals.totalPayableHours }}</span>
                                </p>
                            </dx-item>
                            <dx-item :ratio="1">
                                <p>
                                    <b>Total Billable Hours : </b>
                                    <span v-if="hoursLoaded">{{hoursAndDates.totals.totalBillableHours}}</span>
                                </p>
                            </dx-item>
                        </dx-box>
                    </dx-item>
                    <dx-item :ratio="2">
                        <dx-select-box
                            :items="hoursAndDates.dates"
                            ref="startDateField"
                            label="Start Date"
                            labelMode="static"
                            @selection-changed = "updateHours($event)"
                        ></dx-select-box>
                    </dx-item>
                    <dx-item :ratio="0.1"></dx-item>
                    <dx-item :ratio="2">
                        <dx-select-box
                            :items="hoursAndDates.dates"
                            ref="endDateField"
                            label="End Date"
                            labelMode="static"
                            @selection-changed = "updateHours($event)"
                        ></dx-select-box>
                    </dx-item>
                </dx-box>
                <br/>
                <dx-box
                    direction="row"
                    width="100%"
                >
                    <dx-item :ratio="4">
                        <dx-data-grid 
                            :data-source="hoursAndDates.hours"
                            :active-state-enabled="false"
                            :allow-column-resizing="true"
                            key-expr="id"
                            ref="providerHours"
                        >
                            <dx-load-panel :enabled="hoursLoaded"></dx-load-panel>
                            <dx-filter-row :visible="true"></dx-filter-row>
                            <dx-column data-field="patientName" caption="Patient"></dx-column>
                            <dx-column data-field="statusCode" caption="Status"></dx-column>
                            <dx-column data-field="hasCatalystData" caption="Has Data"></dx-column>
                            <dx-column data-field="billed"></dx-column>
                            <dx-column data-field="paid"></dx-column>
                            <dx-column data-field="authCode" caption="Auth"></dx-column>
                            <dx-column data-field="date" caption="Date"></dx-column>
                            <dx-column data-field="startTime" caption="Time In"></dx-column>
                            <dx-column data-field="endTime" caption="Time Out"></dx-column>
                            <dx-column data-field="serviceCode" caption="Service"></dx-column>
                            <dx-column data-field="totalHours" caption="Hours"></dx-column>
                            <dx-column data-field="payableHours" caption="Payable"></dx-column>
                            <dx-column data-field="billableHours" caption="Billable"></dx-column>
                        </dx-data-grid>
                    </dx-item>
                </dx-box>
            </dx-item>
        </dx-box>
    </div>
</template>
<script>

    import DxSelectBox from 'devextreme-vue/select-box';
    import {DxBox, DxItem} from 'devextreme-vue/box';
    import DxList from 'devextreme-vue/list';
    import DxAccordion, {DxItem as AccItem} from 'devextreme-vue/accordion';

    //import DxAccordion from 'devextreme-vue/accordion';

    import {
        DxDataGrid,
        DxColumn,
        DxFilterRow,
        DxLoadPanel,
    } from 'devextreme-vue/data-grid';

    import api from '../../../callApi/devAPI';

    const apiUrls = {
        getActiveCases:{verb:'get',url:'/provider/manage/cases/activeCase'},
        getInactiveCases:{verb:'get',url:'/provider/manage/cases/inactiveCase'},
        getHours:{verb:'get',url:'/provider/manage/cases/hoursTable'}
    };

    export default {
        components:{
            DxBox, 
            DxItem,
            DxDataGrid,
            DxColumn,
            DxFilterRow,
            DxSelectBox,
            DxLoadPanel,
            DxList,
            DxAccordion,
            AccItem
        },
        data(){
            return{
                hoursAndDates:{},
                activeCases:[],
                inactiveCases:[],
                casesLoaded:false,
                hoursLoaded:false
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
            dataLoaded(){
                return this.casesLoaded && this.hoursLoaded;
            },
        },
        methods:{
            loadInactiveCases(){
                let paramsCases = {providerId:this.providerIdIn, date:'02/03/2022', extensionInDays:1};

                let getInactiveCases = api.get(apiUrls.getInactiveCases.url, paramsCases);

                if(getInactiveCases.success){
                    this.inactiveCases = getInactiveCases.message;
                }else{
                    console.log(getInactiveCases.message);
                }
            },
            loadActiveCases(){
                let paramsCases = {providerId:this.providerIdIn, date:'02/03/2022', extensionInDays:1};

                let getActiveCases = api.get(apiUrls.getActiveCases.url, paramsCases);

                if(getActiveCases.success){
                    this.activeCases = getActiveCases.message;
                }else{
                    console.log(getActiveCases.message);
                }
            },
            updateHours(event){
                console.log(event);
            },
            loadHours(start, end){
                if(this.hoursLoaded) this.hoursLoaded = false;

                let paramsHours = {providerId:this.providerIdIn, startDate:start, endDate:end};

                let getHoursAndDates = api.get(apiUrls.getHours.url, paramsHours);

                if(getHoursAndDates.success){
                    this.hoursAndDates = getHoursAndDates.message;
                    console.log("Hours And Dates ", getHoursAndDates.message);
                    this.hoursLoaded = true;
                }else{
                    console.log(getHoursAndDates.message);
                }
            },
            loadData(){
                if(this.dataLoaded) this.casesLoaded = false;

                //figure out where to get these default dates later
                this.loadHours('02/04/2022','02/15/2022');
                this.loadActiveCases();

                this.casesLoaded = true;

                this.loadInactiveCases();
            },
            refreshHoursData(start, end){
                this.$refs.providerHours.instance.refresh().then(()=>{
                    this.loadHours(start, end);
                });
            },
        }
    }
</script>
