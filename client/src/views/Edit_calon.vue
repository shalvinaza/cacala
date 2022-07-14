<template>
  <div class="edit_calon">
    <Navbar2/>
    <div class="content" style="padding:120px 0 70px 0">
        <Edit_calon_com/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar2 from '@/components/Navbar2.vue'
import Edit_calon_com from '@/components/Edit_calon_com.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Edit_calon ',
    components:{
      Navbar2,
      Edit_calon_com ,
      Footer1
    }
}
</script>