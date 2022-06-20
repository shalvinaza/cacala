<template>
  <div class="search">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <div class="container">
            <h1 class="text-center mb-5">Siapa Calon Yang Ingin Anda Cari?</h1>
            <form @submit.prevent="getData" class="w-100">
            <div class="input-group">
                    <input type="search" class="form-control" placeholder="Ketik nama calon disini" v-model="search">
                    <button type="submit" class="input-group-text"><font-awesome-icon icon="fa-solid fa-magnifying-glass"/></button>                    
            </div>
            </form>
            <!-- search result -->
            <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
                <div class="col" v-for="calon in calons" :key="calon.id_calon">
                    <div class="card h-100">
                        <img :src=calon.foto class="card-img-top" alt="dpr 2">
                        <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                            <h5>{{calon.no_urut}}</h5>
                        </div>
                        <div class="card-body p-4">
                            <h5 class="card-title text-center">{{calon.nama}}</h5>
                            <p class="card-subtitle text-center text-muted">Calon {{calon.jabatan_tujuan}}</p>
                            <div class="row align-items-start mt-3">
                                <p class="col d-flex flex-wrap card-title">Partai</p>
                                <div class="col d-flex flex-wrap justify-content-end">
                                <div class="col d-flex flex-wrap justify-content-end">
                                    <img v-for="(partai) in calon.partai" :key="partai.nama_partai" :src=partai.logo_partai class="img-partai m-1">
                                </div>
                                </div>
                            </div>
                            <div class="row align-items-start mb-2">
                                <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                                <div class="col d-flex flex-wrap justify-content-end">
                                    <p>{{calon.kota}}</p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center justify-content-between">
                                <router-link :to="{ name: 'Detail_calon', params: { id_admin: calon.id_admin}}" class="btn btn-outline-orange">Detail</router-link>
                                <span v-if="isLoggedIn">
                                    <button class="btn btn-outline-blue" @click="followCalon(calon.id_calon, calon.status), calon.status = !calon.status" v-show="!calon.status">Ikuti</button>
                                    <button class="btn btn-outline-blue" @click="unfollowCalon(calon.id_calon, calon.status), calon.status = !calon.status" v-show="calon.status">Berhenti</button>
                                </span>   
                                <span v-else>
                                    <button class="btn btn-outline-blue" @click="goToLogin()">Ikuti</button> 
                                </span>                          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import Footer1 from '@/components/Footer.vue'

export default {
    name:'Search',
    data : () => ({
        search: null,
        calons: []
    }),
    components:{
      Navbar,
      Footer1
    },
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null}
    },
    methods: {
        async getData(){
            // const search = this.$route.params.search;
            await axios.get(`${process.env.VUE_APP_API_URL}/calon/search/${this.search}`)
            .then((result)=>{
                this.calons = result.data
                var parsedobj = JSON.parse(JSON.stringify(result))
                console.log(parsedobj)
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        goToLogin(){
            this.$router.push('/login');
        },

        followCalon(id_calon){
            const FOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token
            
            axios.post(FOLLOW_API_URL)
                .catch((error) => {
                    console.error(error)
                })
        },

        unfollowCalon(id_calon){
            const UNFOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/unfollow/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token

            axios.delete(UNFOLLOW_API_URL)
                .catch((error) => {
                    console.error(error)
                })
        },
    }
}
</script>

<style scoped>
.input-group input{
    height: 50px;
    border: 2px solid #9D9493;
    border-radius:10px;
}

.input-group input:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #D65A40; 
}
.input-group button {
    height: 50px;
    background-color: #9D9493;
    border-radius:10px;
    color: white;
}
.input-group button:hover {
    box-shadow: none;
    outline: none;
    background-color: #D65A40;
    color: white;
}
h1{
    letter-spacing: 0.10em;
    font-weight: 700;
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
.card-subtitle{
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #C2A49D;
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
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
}
.btn-outline-orange, .btn-outline-blue{
    min-width: 5rem;
}
</style>