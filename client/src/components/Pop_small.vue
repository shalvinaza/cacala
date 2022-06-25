<template>
<div class="container">
    <div class="d-flex popup m-4 br-15">
        <b-alert
            :show="dismissCountDown"
            fade
            @dismissed="close"
            @dismiss-count-down="countDownChanged"
            class="p-3 br-15 m-0 justify-content-between alert"
            style="border-color:transparent"
        >
        <div class="row">
            <span class="d-flex justify-content-end" @click="close"><font-awesome-icon icon="fa-solid fa-xmark" class="close"/></span>
            <slot class=""/>
        </div>
        </b-alert>
    </div>
</div>
</template>

<script>
export default {
    props: {
        messageProps: {
            type: String
        }
    },
    data: () => ({
        dismissSecs: 3,
        dismissCountDown: 0
        // alertMessage: false,
    }),
    mounted(){
        this.dismissCountDown = this.dismissSecs
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

    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#DDA18C;

    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}
.alert{
    background-color:#DDA18C;
    color: black;
}
.close{
    color: black;
}
.close:hover{
    color: black;
}

</style>