<template>
    <h4>Render Amount Test {{renderProp.mobilePassword}}{{renderProp.mobileUserName}}</h4>
</template>
<script>
export default {
    data(){
        return{}
    },
    mounted(){
        console.log("mounted, render");
    },
    beforeUpdate(){
        console.log("before update, render");
    },
    updated(){
        console.log("updated, render");
    },
    props:{
        renderProp:{
            type:Object,
            required:true
        }
    }
}
</script>
