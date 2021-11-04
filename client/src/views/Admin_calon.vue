<template>
  <div class="admin_calon">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <detail_admin_calon/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Detail_admin_calon from '@/components/Detail_admin_calon .vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Detail_admin_calon ',
    components:{
      Navbar,
      Detail_admin_calon ,
      Footer1
    }
}
</script>

<style>

</style>