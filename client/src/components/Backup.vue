<template></template>
<div>
  <!-- <div v-if="isVisibility" class="overlay">
      <div class="modal">
          <div class="d-flex align-items-center justify-content-between p-3">
              <span>Modal Title</span>
              <button class="button"> 
                Klik disini   
              </button>
          </div>
          <div class="p-3">
              <div class="mb-4">
                  Modal Body
              </div>
              <button @click.prevent="toggleModal" class="btn btn-primary">
                  confirm
              </button>
          </div>
      </div>
  </div> -->

  <button @click.prevent="toggleModal" class="btn btn-primary green">
      Open modal {{isVisibility}}
  </button>
</div>

</template>
<script>
export default {
    data() {
        return {
            isVisibility: false
        }
    },
    methods: {
        toggleModal(){
            this.isVisibility = !this.isVisibility;
        }
    }
}
</script>

<style lang="postcss" scoped>
.overlay{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}
.model{
    width: 500px;
    box-shadow: 1px 2px 4px rgba(153,155,168,0.12);
    border-radius: 4px;
    background-color: white;
    padding: 10%;
}
</style>