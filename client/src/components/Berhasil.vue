<template>
    <div class="popup">
        <div class="col-md-3 popup-inner p-4 m-4">
            <div class="d-flex justify-content-center mb-3">
              <h5 class="text-center">{{title}}</h5>
            </div>
            <div class="p-0">
                <p class="text-center">{{pesanPopup}}</p>
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        pesanPopup: {
            type: String
        }
    },
    // methods:{
    //     close(){
    //         this.$emit('toggle-modal');
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner{
        background: white;
        border-radius: 15px;
    }
}
.fa-times{
    color: grey;

    &:hover{
        color: orange;
    }
}
</style>