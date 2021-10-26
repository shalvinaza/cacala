<template>
    <div class="container-fluid bg-dark-blue nav-shadow">
      <nav class="container navbar navbar-expand-lg">
        <a class="navbar-brand extra-bold" style="letter-spacing: 0.45em;" href="/">CACALA</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" style="color:white"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav me-auto mb-2 mb-lg-0">
                <router-link to="/presiden" class="nav-item nav-link">Presiden</router-link>
                <router-link to="/dpr_ri" class="nav-item nav-link">DPR RI</router-link>
                <router-link to="/dpd_ri" class="nav-link">DPD RI</router-link>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle txt-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    DPRD Provinsi
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" style="color:black" href="#">Provinsi 1</a></li>
                    <li><a class="dropdown-item" style="color:black" href="#">Provinsi 2</a></li>
                  </div>
                </li>
                <router-link to="/dprd_kab_kota" class="nav-link">DPRD Kabupaten/Kota</router-link>
            </div>
            <div class="d-flex">
              <button class="btn bg-light-orange text-white me-3 br-10" type="button">
                <i class="fas fa-search me-1"></i>
                  Cari</button>
              <!-- <button class="btn bg-light-orange text-white br-10" type="button" @click="goToLogin()">Login</button> -->
              <span v-if="isLoggedIn">
                <button class="btn bg-light-orange text-white br-10" type="button" @click="logUserOut">Logout</button>
              </span>
              <span v-else>
                <button class="btn bg-light-orange text-white br-10" type="button" @click="goToLogin()">Login</button>
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
</style>
