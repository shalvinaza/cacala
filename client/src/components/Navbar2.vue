<template>
    <div class="container-fluid bg-dark-blue nav-shadow">
      <nav class="container navbar navbar-expand-lg">
        <a class="navbar-brand extra-bold" style="letter-spacing: 0.45em;" href="/">CACALA</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" style="color:white"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav me-auto mb-2 mb-lg-0">
                <router-link to="/detail_admin_calon" class="nav-item nav-link">Dasbor</router-link>
                <router-link to="#" class="nav-item nav-link">Edit Akun</router-link>
            </div>
            <div class="d-flex align-items-center">
              <span v-if="isLoggedIn">
                <button class="btn bg-light-orange text-white br-10" type="button" @click="logUserOut">Keluar</button>
              </span>
              <span v-else>
                <button class="btn bg-light-orange text-white br-10" type="button" @click="goToLogin()">Masuk</button>
              </span>
            </div>
        </div>
      </nav>

    </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLoggedIn: function() {return localStorage.getItem("token") != null}
  },
  methods:{
    goToLogin(){
      this.$router.push('/login');
    },
    logUserOut(){
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a, a:hover{
  color: white;
}
a:active{
  color: #D65A40;
}
.nav-profil{
    color: #DDA18C;
    font-size: large;
    padding: 0;
}
.nav-profil:hover{
    color: #D65A40;
}
</style>
