<template>
    <div class="container">
        <div class="row-100">
            <div class="col-100">
                <h1>Provider Edit</h1>
            </div>
        </div>
        <div class="row-100">
            <div class="col-100">
                <br/>
                <dx-accordion 
                    :multiple="true"
                    :collapsible="true"
                    @selection-changed="getSelection"
                    @content-ready="setDefaultSelection"
                >
                    <dx-item title="Provider Information">
                        <div v-if="renderSections['ProviderInformation']">
                            <provider-information ref="ProviderInformation"
                                :provider-id-in="providerId"
                            ></provider-information>
                        </div>
                        <div v-if="!renderSections['ProviderInformation']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                    <dx-item title="Human Resources">
                        <div v-if="renderSections['HumanResources']">
                            <provider-human-resources ref="HumanResources"
                                :provider-id-in="providerId"
                            ></provider-human-resources>
                        </div>
                        <div v-if="!renderSections['HumanResources']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                    <dx-item title="Service Areas">
                        <div v-if="renderSections['ServiceAreas']">
                            <provider-service-areas ref="ServiceAreas" 
                                :provider-id-in="providerId"
                            ></provider-service-areas>
                        </div>
                        <div v-if="!renderSections['ServiceAreas']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                    <dx-item title="Scheduling">
                        <div v-if="renderSections['Scheduling']">
                            <provider-scheduling ref="Scheduling"
                                :provider-id-in="providerId"
                            ></provider-scheduling>
                        </div>
                        <div v-if="!renderSections['Scheduling']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                    <dx-item title="Communications">
                        <div v-if="renderSections['Communications']">
                            <provider-communications ref="Communications"
                                :provider-id-in="providerId"
                            ></provider-communications>
                        </div>
                        <div v-if="!renderSections['Communications']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                    <dx-item title="Settings">
                        <div v-if="renderSections['Settings']">
                            <provider-settings ref="Settings"
                                :provider-id-in="providerId"
                            ></provider-settings>
                        </div>
                        <div v-if="!renderSections['Settings']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                    <dx-item title="Apps And Credentials">
                        <div v-if="renderSections['AppsAndCredentials']">
                            <provider-apps-and-credentials ref="AppsAndCredentials"
                                :provider-id-in="providerId"
                            ></provider-apps-and-credentials>
                        </div>
                        <div v-if="!renderSections['AppsAndCredentials']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                    <dx-item title="Licenses">
                        <div v-if="renderSections['Licenses']">
                            <provider-licenses ref="Licenses"
                                :provider-id-in="providerId"
                            ></provider-licenses>
                        </div>
                        <div v-if="!renderSections['Licenses']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                    <dx-item title="Cases">
                        <div v-if="renderSections['Cases']">
                            <provider-cases ref="Cases"
                                :provider-id-in="providerId"
                            ></provider-cases>
                        </div>
                        <div v-if="!renderSections['Cases']">
                            <h1>Loading</h1>
                        </div>
                    </dx-item>
                </dx-accordion>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineAsyncComponent } from 'vue';
    import DxAccordion, { DxItem }  from 'devextreme-vue/accordion';
    
    const ProviderInformation = defineAsyncComponent(() => import('../components/ui/providers/ProviderInformation.vue'));
    const ProviderHumanResources = defineAsyncComponent(()=> import('../components/ui/providers/ProviderHumanResources.vue'));
    const ProviderServiceAreas = defineAsyncComponent(()=>import('../components/ui/providers/ProviderServiceAreas.vue'));
    const ProviderScheduling = defineAsyncComponent(() => import('../components/ui/providers/ProviderScheduling.vue'));
    const ProviderCommunications = defineAsyncComponent(() => import('../components/ui/providers/ProviderCommunications.vue'));
    const ProviderSettings = defineAsyncComponent(() => import('../components/ui/providers/ProviderSettings.vue'));
    const ProviderAppsAndCredentials = defineAsyncComponent(() => import('../components/ui/providers/ProviderAppsAndCredentials.vue'));
    const ProviderLicenses = defineAsyncComponent(() => import('../components/ui/providers/ProviderLicenses.vue'));
    const ProviderCases = defineAsyncComponent(() => import('../components/ui/providers/ProviderCases.vue'));

    const DEFAULT_SECTION = "ProviderInformation";

    export default {
        components:{
            DxAccordion,
            DxItem,
            ProviderInformation,
            ProviderHumanResources,
            ProviderServiceAreas,
            ProviderScheduling,
            ProviderCommunications,
            ProviderSettings,
            ProviderAppsAndCredentials,
            ProviderLicenses,
            ProviderCases
        },
        data(){
            return{
                providerId:0,
                renderSections:{
                    ProviderInformation:false,
                    HumanResources:false,
                    ServiceAreas:false,
                    Scheduling :false,
                    Communications:false,
                    Settings:false,
                    AppsAndCredentials:false,
                    Licenses:false,
                    Cases:false,
                }
            }
        },
        computed:{
            getSelectionArea(){
                return this.$refs
            }
        },
        beforeMount(){
            this.getProviderId();
            this.loadDefaultSection();
        },
        methods:{
            getProviderId(){
                this.providerId = 426753920586893;
            },
            loadDefaultSection(){
                this.renderSections[DEFAULT_SECTION] = true
            },
            getSelection(item){
                let hasAddedItem = item.addedItems.length > 0;
                //let hasRemovedItem = item.removedItems.length > 0;
                console.log(this.$refs);
                if(hasAddedItem){
                    let currentVisibleSection = item.addedItems[0].title.replace(/ /g,'');
                    let itemIsDisabled = this.renderSections[currentVisibleSection] === false;
                    console.log(currentVisibleSection);
                    if(itemIsDisabled){
                        this.renderSections[currentVisibleSection] = true;
                        console.log(currentVisibleSection);

                        //Do reasearch on how to detect if a component has mounted
                        //before you call the refresh data method
                        //this.$refs[currentVisibleSection].refreshData();
                    }
                    
                }
                
                // if(hasRemovedItem){
                //     let currentRemovedSection = item.removedItems[0].title.replace(/ /g,'');
                //     let itemIsActive = this.renderSections[item.removedItems[0].title] === true;

                //     if(itemIsActive){
                //         this.renderSections[currentRemovedSection] = false;
                //     }
                // }

            }
        }
    };
</script>

