<template>
<div class="d-flex">
    <div class="container-fluid bg-dark-blue nav-shadow d-flex flex-column">
      <nav class="container navbar navbar-expand-lg navbar-dark" id="navbar">
        <a class="navbar-brand extra-bold" id="home" style="letter-spacing: 0.45em;" href="/">CACALA</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav me-auto mb-2 mb-lg-0">
                <a href="/#caraPenggunaan" class="nav-link cara">Cara Penggunaan</a>
                <router-link to="/presiden" class="nav-link pres">Presiden</router-link>
                <router-link to="/dpr_ri" class="nav-link dprri">DPR RI</router-link>
                <router-link to="/dpd_ri" class="nav-link dpdri">DPD RI</router-link>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle txt-white prov" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                  <a class="nav-link dropdown-toggle txt-white kab" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    DPRD Kabupaten/Kota
                  </a>
                  <div class="dropdown-menu p-2" aria-labelledby="navbarDropdown">
                    <li>
                        <p style="cursor:pointer" class="mb-1">Pilih provinsi</p>
                        <select v-model="checkProv" class="dropKab w-100">
                          <option value="" disabled>All</option>
                          <option v-for="prov in provinsi" :key="prov.id_provinsi" :value="prov.provinsi" @click="filterKota">{{prov.provinsi}}</option>
                        </select>
                    </li>
                    <li class="mt-2">
                        <p style="cursor:pointer" class="mb-1">Pilih Kabupaten/Kota</p>
                        <select @change="goToKab($event)" class="dropKab w-100">
                          <option value="allKot" disabled>All</option>
                          <option v-for="kota in filterKota" :key="kota.id_kota" :value="kota.id_kota" @click="goToKota(kota.id_kota)">
                            {{kota.kota}}
                          </option>
                        </select>

                    </li>
                  </div>
                </li>
                <span v-if="isLoggedIn">
                  <router-link to="/dasbor_saya" class="nav-link">Dasbor</router-link>
                </span>
            </div>
            <div class="d-flex align-items-center">
              <button class="btn bg-light-orange text-white me-3 br-10" type="button" @click="goToSearch()">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                  Cari</button>
              <span v-if="isLoggedIn">
                <div class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle nav-profil"   id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <font-awesome-icon icon="fa-solid fa-circle-user" />
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" style="color:black; cursor:pointer" @click="goToProfil()">Profil Saya</a></li>
                      <li><a class="dropdown-item" style="color:black; cursor:pointer" @click="toggleShow()">Keluar</a></li>
                  </div>
                </div>
              </span>
              <span v-else>
                <button class="btn bg-light-orange text-white br-10" type="button" @click="goToLogin()">Login</button>
              </span>
            </div>
        </div>
      </nav>

      <Popup v-if="openPopup" title="Apakah Anda yakin?" pesanPopup="Anda tidak dapat mengikuti calon maupun melihat dasbor setelah keluar">
        <div class="d-flex justify-content-end">
          <button class="bg-light-orange-pop me-2 br-10" @click="toggleShow()">Tidak</button>
          <button class="btn-outline-orange" @click="logUserOut()">Iya</button>
        </div>
      </Popup>
    </div>
  </div>
</template>

<script>
import Popup from './Berhasil.vue'

const PROVINSI_API_URL = `${process.env.VUE_APP_API_URL}/dapil/provinsi`
const KOTA_API_URL = `${process.env.VUE_APP_API_URL}/dapil/kota`

export default {
  name: 'Navbar',
  data: () => ({
    provinsi: [],
    kota: [],
    openPopup: false,
    checkProv: ''
  }),
  components:{
    Popup
  },
  computed: {
    isLoggedIn: function() {
      return localStorage.getItem("token") != null
    },
    filterKota:function(){
      return this.kota.filter((kta)=>{
        return kta.provinsi.match(this.checkProv)
      })
    }
  },
  mounted(){
    fetch(PROVINSI_API_URL)
      .then(response => response.json())
      .then(result => {
        this.provinsi = result
      })
    fetch(KOTA_API_URL)
      .then(response => response.json())
      .then(result => {
        this.kota = result
      })
  },
  methods:{
    goToLogin(){
      this.$router.push('/login');
    },
    goToProfil(){
      this.$router.push('/profil_user');
    },
    toggleShow(){
      this.openPopup = !this.openPopup;
    },
    logUserOut(){
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    goToSearch(){
      this.$router.push('/search/')
    },
    goToKab(e){
      this.$router.push({ name: 'Dprd_kab_kota', params: { id_kota: e.target.value  } })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  color: white;
}
a:focus, a:hover{
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
.btn-outline-orange{
    color:#DDA18C;
    font-weight:400;
    border: 1px solid #DDA18C;
    min-width: 4rem;
    background: white;
}
.bg-light-orange-pop:hover,.btn-outline-orange:hover{
    color:white;
    background-color: #D65A40;
    border-color: #D65A40;
}
.bg-light-orange-pop{
    font-weight:400;
    border: 1px solid;
    min-width: 4rem;
    color: white;
    background-color: #DDA18C;
}
@media (min-width: 992px) and (max-width: 1200px) { 
  .navbar{
    font-size: 90%;
  }
 }
</style>