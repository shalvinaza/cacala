<template>
  <div class="dpd_ri">
    <Navbar2/>
    <div class="content" style="padding:120px 0 70px 0">
        <All_dpd_ri/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar2 from '@/components/Navbar2.vue'
import All_dpd_ri from '@/components/All_dpd_ri.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Dpd_ri',
    components:{
      Navbar2,
      All_dpd_ri,
      Footer1
    }
}
</script>

<style>

</style>