<template>
    <div class="container-fluid bg-dark-blue nav-shadow">
      <nav class="container navbar navbar-expand-lg navbar-dark">
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
                <button class="btn bg-light-orange text-white br-10" type="button" @click="toggleShow()">Keluar</button>
              </span>
              <span v-else>
                <button class="btn bg-light-orange text-white br-10" type="button" @click="goToLogin()">Masuk</button>
              </span>
            </div>
        </div>

        <Popup v-if="openPopup" title="Apakah Anda yakin?" pesanPopup="Anda tidak dapat membuat, melihat, mengubah, maupun menghapus informasi kampanye setelah keluar">
          <div class="d-flex justify-content-end">
            <button class="bg-light-orange me-2 br-10" @click="toggleShow()">Tidak</button>
            <button class="btn-outline-orange" @click="logUserOut()">Iya</button>
          </div>
        </Popup>
      </nav>

    </div>
</template>

<script>
import Popup from './Berhasil.vue'
export default {
  name: 'Navbar',
  data: function(){
    return{
      openPopup: false
    }
  },
  components:{
    Popup
  },
  computed: {
    isLoggedIn: function() {return localStorage.getItem("token") != null}
  },
  methods:{
    goToLogin(){
      this.$router.push('/login');
    },
    toggleShow(){
      this.openPopup = !this.openPopup;
    },
    logUserOut(){
      localStorage.removeItem('token')
      this.$router.push('/login_admin')
    },
    goToSearch(){
      this.$router.push('/search/')
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
.btn-outline-orange{
    color:#DDA18C;
    font-weight:400;
    border: 2px solid #DDA18C ;
    min-width: 4rem;
    background: white;
}
.bg-light-orange:hover,.btn-outline-orange:hover{
    color:white;
    background-color: #D65A40;
    border-color: #D65A40;
}
.bg-light-orange{
    font-weight:400;
    border: 2px solid #DDA18C ;
    min-width: 4rem;
}
</style>
