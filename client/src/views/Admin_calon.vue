<template>
  <div class="admin_calon">
    <Navbar2/>
    <div class="content" style="padding:120px 0 70px 0">
        <Detail_admin_calon/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar2 from '@/components/Navbar2.vue'
import Detail_admin_calon from '@/components/Detail_admin_calon .vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Detail_admin_calon ',
    components:{
      Navbar2,
      Detail_admin_calon ,
      Footer1
    }
}
</script>

<style>

</style>