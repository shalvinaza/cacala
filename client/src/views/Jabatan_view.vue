<template>
  <div class="admin_calon">
    <Navbar2/>
    <div class="content" style="padding:120px 0 70px 0">
        <Jabatan/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar2 from '@/components/Navbar2.vue'
import Jabatan from '../components/jabatan.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Detail_admin_calon ',
    components:{
      Navbar2,
      Jabatan ,
      Footer1
    }
}
</script>

<style>

</style>