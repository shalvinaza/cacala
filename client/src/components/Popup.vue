<template>
    <div class="popup">
        <div class="col-md-6 popup-inner p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5>{{title}}</h5>
              <span  @click.prevent="close"><i class="fas fa-times"></i></span>
            </div>
            <div class="p-0">
                <div class="">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods:{
        close(){
            this.$emit('toggle-modal');
        }
    }
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