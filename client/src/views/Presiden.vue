<template>
  <div class="presiden" id="presiden">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <All_capres/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import All_capres from '@/components/All_capres.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Presiden',
    components:{
      Navbar,
      All_capres,
      Footer1
    }
}
</script>

<style>

</style>