<template>
  <div class="container">
      <h1 class="text-center pb-4 mb-4">Calon yang Diikuti</h1>
      <div class="d-flex d-inline-row pb-3 mb-4">
          <a href="#" class="me-3" style="color: #D65A40;">Semua</a>
          <a href="#" class="me-3">Presiden</a>
          <a href="#" class="me-3">DPR RI</a>
          <a href="#" class="me-3">DPD RI</a>
          <a href="#" class="me-3">DPRD Provinsi</a>
          <a href="#" class="me-3">DPRD Kabupaten/Kota</a>
      </div>
      <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
            <div class="col" v-for="(calon,index) in calons" :key="calon.id_calon">
                <div class="card h-100">
                    <img :src=calon.foto class="card-img-top" alt="dpr 2">
                    <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                        <h5>{{index + 1}}</h5>
                    </div>
                    <div class="card-body p-4">
                        <h5 class="card-title text-center">{{calon.nama}}</h5>
                        <p class="card-subtitle text-center text-muted">Calon {{calon.jabatan_tujuan}}</p>
                        <div class="row align-items-start mt-3">
                            <p class="col d-flex flex-wrap card-title">Partai</p>
                            <div class="col d-flex flex-wrap justify-content-end" v-for="(partai) in calon.partai" :key="partai.nama_partai">
                                <img :src=partai.logo_partai class="img-partai m-1" alt="{{partai.nama_partai}}">
                            </div>
                        </div>
                        <div class="row align-items-start mb-2">
                            <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p>{{calon.kota}}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-outline-orange" @click="goToDetail()">Detail</button>
                            <button class="btn btn-outline-blue" @click="unfollowCalon(calon.id_calon)">Berhenti Mengikuti</button>                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
const FOLLOWED_CALON_API_URL = `${process.env.VUE_APP_API_URL}/user/followed`

export default {
    name:'My_dasbor',
    data : () => ({
        no_data: false,
        calons: [],
    }),
    mounted(){
        this.fetchFollowedCalon()
    },
    methods : {
        fetchFollowedCalon(){
            const headers = { token: localStorage.token }
        fetch(FOLLOWED_CALON_API_URL, { headers })
            .then(response => response.json())
            .then(result => {
                this.calons = result
                var parsedobj = JSON.parse(JSON.stringify(result))
                console.log(parsedobj)
            })
            .catch(error => {
                if(calons==null){
                    this.no_data = true;
                }
            });
        },

        goToDetail(){
        this.$router.push('/detail_calon');
        },

        unfollowCalon(id_calon){
            const UNFOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/unfollow/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token

            axios.delete(UNFOLLOW_API_URL)
                .then(() => {
                    window.location = "/dasbor_saya"
                })
                .catch((error) => {
                    console.error(error)
                })

            
        }
    }
}
</script>

<style scoped>
a{
    color: black;
    font-weight: 600;
}
a:hover,a:active{
    color: #D65A40;
}
h1{
    letter-spacing: 0.10em;
    font-weight: 700;
}
.d-inline-row{
    border-bottom: 2px solid black;
}
.card{
    background-color: #F2F0E1;
    border-radius: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border:none;
    /* min-height: 35rem; */
}
.card-img-top{
    border-radius: 15px 15px 0 0;   
}
.img-partai{
    max-width: 22px;
    max-height: 22px;
    border-radius: 15px;
}
.card-img-overlay{
    right: unset;
    left: unset;
    bottom: unset;
    background-color: white;
    min-width: 50px;
    min-height: 50px;
    border-radius: 40px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>