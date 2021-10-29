<template>
  <div class="dprd_kab_kota">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <All_dprd_kab/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import All_dprd_kab from '@/components/All_dprd_kab.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Dpd_ri',
    components:{
      Navbar,
      All_dprd_kab,
      Footer1
    }
}
</script>

<style>

</style>