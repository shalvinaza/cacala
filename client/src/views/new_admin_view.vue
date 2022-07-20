<template>
  <div class="admin_calon">
    <Navbar2/>
    <div class="content" style="padding:120px 0 70px 0">
        <NewAdmin/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar2 from '@/components/Navbar2.vue'
import NewAdmin from '../components/new_admin.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Detail_admin_calon ',
    components:{
      Navbar2,
      NewAdmin ,
      Footer1
    }
}
</script>

<style>

</style>