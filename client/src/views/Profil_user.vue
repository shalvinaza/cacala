<template>
   <div class="profil_user">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <h1>Profil user</h1>
    </div>
    <Footer1/>
  </div> 
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer1 from '@/components/Footer.vue'


export default {
    name:'Profil_user',
    components:{
        Navbar,
        Footer1
    }
}
</script>

<style>

</style>