<template>
  <div class="dapil">
    <Navbar2/>
    <div class="content" style="padding:120px 0 70px 0">
        <Dapil/>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import Navbar2 from '@/components/Navbar2.vue'
import Dapil from '../components/dapil.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Dapil ',
    components:{
      Navbar2,
      Dapil ,
      Footer1
    }
}
</script>

<style>

</style>