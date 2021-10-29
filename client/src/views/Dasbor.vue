<template>
  <div class="dasbor">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <My_dasbor/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import My_dasbor from '@/components/My_dasbor.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Dasbor',
    components:{
      Navbar,
      My_dasbor,
      Footer1
    }
}
</script>

<style>

</style>