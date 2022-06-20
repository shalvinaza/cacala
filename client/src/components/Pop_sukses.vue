<template>
<div class="container">
    <div class="d-inline-flex justify-content-end popup">
        <b-alert
            :show="dismissCountDown"
            fade
            :variant="variantName"
            @dismissed="close"
            @dismiss-count-down="countDownChanged"
            class="ps-3 pe-3 pt-2 pb-2 m-0"
        >
            <span>{{messageProps}}</span> 
            <span class="ms-3" @click="close"><font-awesome-icon icon="fa-solid fa-xmark" :class="`${checkSuk ? 'closeGagal' : 'closeSukses'}`"/></span>
        </b-alert>
    </div>
</div>
</template>

<script>
export default {
    props: {
        messageProps: {
            type: String,
            required: true
        },
        variantName: {
            type: String,
            required: true
        }
        // dismissCountDown:{
        //     type: Number,
        //     required: true
        // }
    },
    data: () => ({
        dismissSecs: 3,
        dismissCountDown: 0
        // alertMessage: false,
    }),
    mounted(){
        this.dismissCountDown = this.dismissSecs
    },
    computed:{
        checkSuk(){
            return this.variantName === 'danger'
        }
    },
    methods:{
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        close(){
            this.dismissCountDown = 0
        }
    }
}
</script>

<style scoped>
.popup{
    position: fixed;
    z-index: 100;
    top: 70px;
    right: var(--bs-gutter-x, 4.5rem);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}
.closeSukses{
    color: #7ABC9D;
}
.closeSukses:hover{
    color: #0F5132;
}
.closeGagal{
    color: #D1989D;
}
.closeGagal:hover{
    color: #8E4A50;
}

</style>