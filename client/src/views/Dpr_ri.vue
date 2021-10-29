<template>
  <div class="dpr_ri">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <All_dpr_ri/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import All_dpr_ri from '@/components/All_dpr_ri.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Dpr_ri',
    components:{
      Navbar,
      All_dpr_ri,
      Footer1
    }
}
</script>

<style>

</style>