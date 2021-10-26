<template>
  <div class="login justify-content-center">
    <Navbar1/>
    <Form_login style="padding:120px 0 70px 0"/>
    <Footer1/>
  </div>
</template>

<script>
import Navbar1 from '@/components/Navbar1.vue'
import Form_login from '@/components/Form_login.vue'
import Footer1 from '@/components/Footer1.vue'

export default {
    name:'Login',
    components:{
      Navbar1,
      Form_login,
      Footer1
    }
}
</script>

<style>

</style>