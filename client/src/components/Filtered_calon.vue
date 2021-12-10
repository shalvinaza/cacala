<template>
    <div class="filtered-calon">
        <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
            <slot/>
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

<style scoped>
</style>