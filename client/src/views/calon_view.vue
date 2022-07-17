<template>
  <div class="calon">
    <Navbar2/>
    <div class="content" style="padding:120px 0 70px 0">
        <Calon/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar2 from '@/components/Navbar2.vue'
import Calon from '../components/calon.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Detail_admin_calon ',
    components:{
      Navbar2,
      Calon,
      Footer1
    }
}
</script>

<style>

</style>