<template>
    <div class="popup">
        <div class="popup-inner">
            <slot/>
            <div class="d-flex align-items-center justify-content-between p-3">
              <span>{{title}}</span>
            </div>
            <div class="p-3">
                <div class="mb-4">
                    Modal Body
                </div>
                <button @click.prevent="close" class="btn btn-primary">
                    confirm
                </button>
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
        padding: 32px;
    }
}
</style>