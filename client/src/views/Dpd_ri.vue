<template>
  <div class="dpd_ri" id="dpd_ri">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <All_dpd_ri/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import All_dpd_ri from '@/components/All_dpd_ri.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Dpd_ri',
    components:{
      Navbar,
      All_dpd_ri,
      Footer1
    }
}
</script>

<style>

</style>