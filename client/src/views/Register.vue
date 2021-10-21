<template>
<div class="register justify-content-center">
  <Navbar1/>
  <div class="content" style="padding:120px 0 70px 0">
      <Form_register/>
  </div>
  <Footer1/>
</div>
  
</template>

<script>
import Navbar1 from '@/components/Navbar1.vue'
import Form_register from '@/components/Form_register.vue'
import Footer1 from '@/components/Footer1.vue'

export default {
    name:'Register',
    components:{
      Navbar1,
      Form_register,
      Footer1
    }
}
</script>

<style>

</style>