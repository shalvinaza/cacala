<template>
   <div class="profil_user">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <Form_profil_user/>
    </div>
    <Footer1/>
  </div> 
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Form_profil_user from '@/components/Form_profil_user.vue'
import Footer1 from '@/components/Footer.vue'


export default {
    name:'Profil_user',
    components:{
        Navbar,
        Form_profil_user,
        Footer1
    }
}
</script>

<style>

</style>