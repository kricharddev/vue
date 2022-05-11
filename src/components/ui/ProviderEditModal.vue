<template>
    <div v-if="modalHasContent">
        <dx-popup
            v-model:visible="visible"
            :show-close-button="false"
            :drag-enabled="false"
            :show-title="true"
            :title="dialogueData.modalName"
            :width="300"
            :height="280"
        >
            <slot name="content" :dialogue="dialogueContent" :dialogue-update="changeValues"></slot>
            <dx-toolbar-item
                widget="dxButton"
                toolbar="bottom"
                location="before"
                :options="closeButtonOptions"
            ></dx-toolbar-item>
            <dx-toolbar-item
                widget="dxButton"
                toolbar="bottom"
                location="before"
                :options="submitButtonOptions"
            ></dx-toolbar-item>
        </dx-popup>
    </div>
</template>
<script>
    import { DxPopup,  DxToolbarItem } from 'devextreme-vue/popup';

    export default {
        components:{
            DxPopup, 
            DxToolbarItem,
        },
        data(){
            return{
                dialogueContent:{},
                visible:false,
            };
        },
        computed:{
            modalHasContent(){
                return JSON.stringify(this.dialogueContent) !== '{}';
            },
            closeButtonOptions(){
                return {
                    text: 'Close',
                    onClick:this.closeModal
                };
            },
            submitButtonOptions(){
                return {
                    text: 'Save',
                    type:'success',
                    icon:'save',
                    onClick:this.submitDialogue
                };
            }
        },
        mounted(){
            this.dialogueContent = this.dialogueData;
            this.visible = this.isVisible;
        },
        props:{
            dialogueData:{
                type:Object,
                required:true
            },
            isVisible:{
                type:Boolean,
                required:true
            }
        },
        emits:['submit-dialogue', 'close-modal', 'change-values'],
        methods:{
            submitDialogue(){
                console.log(this.dialogueContent);
                this.$emit('submit-dialogue', this.dialogueContent.values);
            },
            closeModal(){
                this.$emit('close-modal');
            },
            changeValues(value, fieldName){
                if(fieldName){
                    this.dialogueContent.values[fieldName] = value;
                }else{
                    this.dialogueContent.values = value; 
                }
            }
        }
    }
</script>

