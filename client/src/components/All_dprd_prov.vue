<template>
    <div class="container">
        <h1 class="text-center pb-4 mb-4">Calon DPRD Provinsi {{provinsi.provinsi}}</h1>
        <a class="dropdown-toggle btn btn-outline-orange2 me-3" href="#" id="navbarDropdown" data-bs-toggle="dropdown">
            Daerah Pilih
        </a>
        <div class="dropdown-menu">
            <li><a class="dropdown-item" style="color:black" href="#">Kota 1</a></li>
            <li><a class="dropdown-item" style="color:black" href="#">Kota 2</a></li>
        </div>
        <a class="dropdown-toggle btn btn-outline-orange2" href="#" id="navbarDropdown" data-bs-toggle="dropdown">
            Partai
        </a>
        <div class="dropdown-menu">
            <li><a class="dropdown-item" style="color:black" href="#">Partai 1</a></li>
            <li><a class="dropdown-item" style="color:black" href="#">Partai 2</a></li>
        </div>
        <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
            <div class="col" v-for="(calon,index) in calons" :key="calon.id_calon">
                <div class="card h-100">
                    <img src="../assets/images/dpr.jpg" class="card-img-top" alt="dpr 2">
                    <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                        <h5>{{index + 1}}</h5>
                    </div>
                    <div class="card-body p-4">
                        <h5 class="card-title text-center">{{calon.nama}}</h5>
                        <p class="card-subtitle text-center text-muted">Calon {{calon.jabatan_tujuan}}</p>
                        <div class="row align-items-start mt-3">
                            <p class="col d-flex flex-wrap card-title">Partai</p>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="dpr 2">
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
                                <!-- <span v-if="isFollowed">
                                    <button class="btn btn-outline-blue" @click="followCalon(calon.id_calon)">Berhenti</button>  
                                </span>
                                <span v-else> -->
                                    <button class="btn btn-outline-blue" @click="followCalon(calon.id_calon)">Ikuti</button> 
                                    <!-- <button @click="followedCalon(calon.id_calon)">Show if followed</button>  -->
                                <!-- </span>  -->
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
</template>

<script>
import axios from 'axios'
const FOLLOWED_CALON_API_URL = `http://localhost:3000/user/followed`

// length = this.followed_calon.length
// for(let i=0; i<length; i++){
//     if(this.followed_calon[i].id_calon == id_calon){
//         isFollowed = true
//     }
// }

export default {
    name: 'All_dprd_kab_kota',
    data : () => ({
        no_data: false,
        calons: [],
        user: [],
        provinsi: [],
        followed_calon: [],
        isFollowed: false
    }),
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null},
        // isFollowed: function(id_calon){
        //     length = this.followed_calon.length
        //     for(let i=0; i<length; i++){
        //         return this.followed_calon[i].id_calon == id_calon
        //     }
        // }
    },
    beforeMount(){
        const headers = { token: localStorage.token }
        fetch(FOLLOWED_CALON_API_URL, { headers })
            .then(response => response.json())
            .then(result => {
                this.followed_calon = result
                var parsedobj = JSON.parse(JSON.stringify(result))
                console.log(parsedobj)
            })

        //this.followedCalon()
    },
    mounted(){
        const id_provinsi = this.$route.params.id_provinsi;
        const DRPD_PROV_API_URL = `http://localhost:3000/calon/dprdProv/${id_provinsi}` 

        fetch(DRPD_PROV_API_URL)
            .then(response => response.json())
            .then(result => {
                this.calons = result
            })
            .catch(error => {
                if(calons==null){
                    this.no_data = true;
                }
            });

        const PROV_API_URL = `http://localhost:3000/dapil/provinsi/${this.$route.params.id_provinsi}`
        
        fetch(PROV_API_URL)
        .then(response => response.json())
        .then(result => {
            this.provinsi = result
        })
    },
    methods : {
        goToLogin(){
            this.$router.push('/login');
        },

        followCalon(id_calon){
            const FOLLOW_API_URL = `http://localhost:3000/user/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token
            
            axios.post(FOLLOW_API_URL)
                .then(() => {
                    this.$router.push("/dasbor_saya")
                })
                .catch((error) => {
                    console.error(error)
                })

            console.log(localStorage.token)
        },

        followedCalon(id_calon){
            calon_length = this.calons.length
            followed_calon_length = this.followed_calon.length
            for(let i=0; i<length; i++){
                // if(this.followed_calon[i].id_calon == id_calon){
                //     this.isFollowed = true;
                // }
            }
        }
    }
}
</script>

<style scoped>
h1{
    letter-spacing: 0.10em;
    font-weight: 700;
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
.card-subtitle{
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #C2A49D;
}
.img-partai{
    max-width: 22px;
    max-height: 22px;
    border-radius: 15px;
}
.btn-outline-orange, .btn-outline-blue{
    min-width: 5rem;
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
</style>