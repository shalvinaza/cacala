<template>
<div class="register justify-content-center">
  <Navbar1/>
  <div class="content" style="padding:120px 0 70px 0">
      <Form_login_admin/>
  </div>
  <Footer1/>
</div>
  
</template>

<script>
import Navbar1 from '@/components/Navbar1.vue'
import Form_login_admin from '@/components/Form_login_admin.vue'
import Footer1 from '@/components/Footer1.vue'

export default {
    name:'Login_admin',
    components:{
      Navbar1,
      Form_login_admin,
      Footer1
    }
}
</script>

<style>

</style>