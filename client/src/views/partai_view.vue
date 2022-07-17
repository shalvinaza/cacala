<template>
  <div class="partai">
    <Navbar2/>
    <div class="content" style="padding:120px 0 70px 0">
        <Partai/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar2 from '@/components/Navbar2.vue'
import Partai from '../components/partai.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Detail_admin_calon ',
    components:{
      Navbar2,
      Partai ,
      Footer1
    }
}
</script>

<style>

</style>