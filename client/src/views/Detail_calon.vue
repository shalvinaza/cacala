<template>
  <div class="detail_calon">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <Post_detail_calon/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Post_detail_calon from '@/components/Post_detail_calon.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Detail_calon',
    components:{
      Navbar,
      Post_detail_calon,
      Footer1
    }
}
</script>

<style>

</style>