<template>
  <div class="search">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <div class="container">
            <h1 class="text-center mb-5">Siapa Calon Yang Ingin Anda Cari?</h1>
            <div class="input-group">
                <input type="search" class="p-3 w-100" placeholder="Ketik nama calon disini" v-model="search">
            </div>

            <!-- search result -->
            <h5 class="mt-3">Hasil pencarian dengan nama "{{search}}"</h5>
            <div v-if="search" class="row mt-4">
                <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
                    <div class="col" v-for="calon in searchedCalons" :key="calon.id_calon">
                        <div class="card h-100">
                            <img :src="calon.foto" class="card-img-top" alt="dpr 2">
                            <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                                <h5>{{calon.no_urut}}</h5>
                            </div>
                            <div class="card-body pt-4 ps-4 pe-4 pb-0">
                                <h6 class="card-title text-center">{{calon.nama}}</h6>
                                <p class="card-subtitle text-center text-muted">Calon {{calon.jabatan_tujuan}}</p>
                                <div class="row align-items-start mt-2">
                                    <p class="col d-flex flex-wrap card-title">Partai</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <div class="col d-flex flex-wrap justify-content-end">
                                            <img v-for="(partai,index) in calon.partai" :key="index" :src=partai.logo_partai class="img-partai m-1">
                                        </div>
                                    </div>
                                </div>
                                <div class="row align-items-start">
                                    <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <p v-for="(kota,index) in calon.kota" :key="index">{{kota.kota}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer mb-2">
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-outline-orange" :value="calon.id_admin" @click="goToDetail($event)">Detail</button>
                                    <span v-if="isLoggedIn">
                                        <button class="btn btn-outline-blue" @click="followCalon(calon.id_calon, calon.status), calon.status = !calon.status" v-show="!calon.status">Ikuti</button>
                                        <button class="btn btn-outline-blue" @click="unfollowCalon(calon.id_calon, calon.status), calon.status = !calon.status" v-show="calon.status">Berhenti ikuti</button>
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
            <div v-if="!searchedCalons.length" class="row d-flex justify-content-center mt-3">
                <img src='../assets/images/error.png' class="d-flex" style="width:40%" alt="Not Found">
                <h5 class="d-flex d-flex justify-content-center align-items-center mt-3">Hasil tidak ditemukan</h5>
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

const ALL_CALON_API = `${process.env.VUE_APP_API_URL}/calon`

export default {
    name:'Search',
    data : () => ({
        search: "",
        calons: []
    }),
    components:{
      Navbar,
      Footer1
    },
    created(){
        this.getData()
    },
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null},
        searchedCalons: function(){
            let calons =this.calons
            const search = this.search
            
            if(search.length){
                return calons.filter((calon) => {
                    return calon.nama.toLowerCase().match(this.search) 
                })
            }

            else{
                console.log('gaada hasil')
            }

            return calons
        }
    },
    methods: {
        getData(){
            // // const search = this.$route.params.search;
            // await axios.get(`${process.env.VUE_APP_API_URL}/calon/search/%${this.search}%`)
            // .then((result)=>{
            //     this.calons = result.data
            //     var parsedobj = JSON.parse(JSON.stringify(result))
            //     console.log(parsedobj)
            // })
            // .catch((error)=>{
            //     console.log(error)
            // })

            fetch(ALL_CALON_API)
            .then(response => response.json())
            .then(result => {
                this.calons = result
                // if(localStorage.getItem("token") != null){
                //     this.fetchFollowedCalon()
                // }
            })
        },

        goToDetail(e){
            this.$router.push({ name: 'Detail_calon', params: { id_admin: e.target.value}})
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
h1{
    letter-spacing: 0.10em;
    font-weight: 700;
}
.card{
    background-color: #F2F0E1;
    border-radius: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border:none;
    cursor: pointer;
    /* min-height: 35rem; */
}
.card-img-top{
    border-radius: 15px 15px 0 0;
    height: 250px;   
}
.card-subtitle{
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #C2A49D;
}
.img-partai{
    width: 30px;
    height: 30px;
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
    padding: 0.3rem;
    min-width: 6rem;
    font-size: 80%;
}
p{
    font-size: 95%;
}
</style>