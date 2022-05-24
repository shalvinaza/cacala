<template>
  <div class="dprd_prov" id="dprd_prov">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <All_dprd_prov/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import All_dprd_prov from '@/components/All_dprd_prov.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Dpd_ri',
    components:{
      Navbar,
      All_dprd_prov,
      Footer1
    }
}
</script>

<style>

</style>