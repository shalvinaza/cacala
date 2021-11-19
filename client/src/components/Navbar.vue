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
                    <li>
                      <router-link v-for="(prov) in provinsi" :key="prov.id_provinsi" :to="{name: 'Dprd_prov', params: { id_provinsi: prov.id_provinsi }}" class="dropdown-item" style="color:black">
                        {{prov.provinsi}}
                      </router-link>
                    </li>
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle txt-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    DPRD Kabupaten/Kota
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <router-link v-for="(kta) in kota" :key="kta.id_kota" :to="{name: 'Dprd_kab_kota', params: { id_kota: kta.id_kota }}" class="dropdown-item" style="color:black">
                        {{kta.kota}}
                      </router-link>
                    </li>
                  </div>
                </li>
                <span v-if="isLoggedIn">
                  <router-link to="/dasbor_saya" class="nav-link">Dasbor</router-link>
                </span>
            </div>
            <div class="d-flex align-items-center">
              <button class="btn bg-light-orange text-white me-3 br-10" type="button">
                <i class="fas fa-search me-1"></i>
                  Cari</button>
              <span v-if="isLoggedIn">
                <div class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle nav-profil" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="far fa-user-circle nav-profil"></i>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" style="color:black" href="/profil_user">Profil Saya</a></li>
                      <li><a class="dropdown-item" style="color:black" @click="logUserOut" href="#">Keluar</a></li>
                  </div>
                </div>
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
import axios from 'axios'

const PROVINSI_API_URL = `http://localhost:3000/dapil/provinsi`
const KOTA_API_URL = `http://localhost:3000/dapil/kota`

export default {
  name: 'Navbar',
  data: () => ({
    provinsi: [],
    kota: []
  }),
  computed: {
    isLoggedIn: function() {return localStorage.getItem("token") != null}
  },
  mounted(){
    fetch(PROVINSI_API_URL)
      .then(response => response.json())
      .then(result => {
        this.provinsi = result
        var parsedobj = JSON.parse(JSON.stringify(result))
        console.log(parsedobj)
      })
    fetch(KOTA_API_URL)
      .then(response => response.json())
      .then(result => {
        this.kota = result
        var parsedobj = JSON.parse(JSON.stringify(result))
        console.log(parsedobj)
      })
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
