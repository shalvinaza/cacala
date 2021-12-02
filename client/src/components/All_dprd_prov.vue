<template>
    <div class="container">
        <h1 class="text-center pb-4 mb-4">Calon DPRD Provinsi {{provinsi.provinsi}}</h1>
        <a class="dropdown-toggle btn btn-outline-orange2 me-3" href="#" id="navbarDropdown" data-bs-toggle="dropdown">
            Daerah Pilih
        </a>
        <div class="dropdown-menu">
            <li v-for="(kta) in kota" :key="kta.id_kota"><a class="dropdown-item" style="color:black" href="#">{{kta.kota}}</a></li>
        </div>
        <a class="dropdown-toggle btn btn-outline-orange2" href="#" id="navbarDropdown" data-bs-toggle="dropdown">
            Partai
        </a>
        <div class="dropdown-menu">
            <li><a class="dropdown-item" style="color:black" href="#" v-for="(prt) in partai" :key="prt.id_partai">{{prt.nama_partai}}</a></li>
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
                            <div class="col d-flex flex-wrap justify-content-end">
                                <div v-for="(partai) in calon.partai" :key="partai.nama_partai">
                                    <img :src=partai.logo_partai class="img-partai m-1" alt="{{partai.nama_partai}}">
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
</template>

<script>
import axios from 'axios'
const FOLLOWED_CALON_API_URL = `${process.env.VUE_APP_API_URL}/user/followed`

export default {
    name: 'All_dprd_kab_kota',
    data : () => ({
        no_data: false,
        follow: false,
        unfollow: false,
        calons: [],
        user: [],
        provinsi: [],
        kota: [],
        followed_calon: [],
        partai: []
    }),
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null},
    },
    // beforeMount(){
    //     },
    mounted(){
        this.fetchDPRDProvCalons()
        this.fetchProvinsiName()
        this.fetchKotaName()
        this.fetchPartai()
        // if(localStorage.getItem("token") != null){
        //     this.fetchFollowedCalon()
        // }
    },
    methods : {
        fetchKotaName(){
            const KOTA_API_URL = `${process.env.VUE_APP_API_URL}/dapil/kota/provinsi/${this.$route.params.id_provinsi}`
        
            fetch(KOTA_API_URL)
            .then(response => response.json())
            .then(result => {
                this.kota = result 
                var parsedobj = JSON.parse(JSON.stringify(result))
                console.log(parsedobj)
            })
        },
    
        fetchProvinsiName(){
            const PROV_API_URL = `${process.env.VUE_APP_API_URL}/dapil/provinsi/${this.$route.params.id_provinsi}`
        
            fetch(PROV_API_URL)
            .then(response => response.json())
            .then(result => {
                this.provinsi = result
            })   
        },

        fetchDPRDProvCalons(){
            const id_provinsi = this.$route.params.id_provinsi;
            const DRPD_PROV_API_URL = `${process.env.VUE_APP_API_URL}/calon/dprdProv/${id_provinsi}` 

            fetch(DRPD_PROV_API_URL)
                .then(response => response.json())
                .then(result => {
                    this.calons = result
                    if(localStorage.getItem("token") != null){
                        this.fetchFollowedCalon()
                    }
                })
                .catch(error => {
                    if(calons==null){
                        this.no_data = true;
                    }
                });
        },

        fetchFollowedCalon(){
            const headers = { token: localStorage.token }
            fetch(FOLLOWED_CALON_API_URL, { headers })
                .then(response => response.json())
                .then(result => {
                    this.followed_calon = result
                    this.checkFollowedCalon()
                    // var parsedobj = JSON.parse(JSON.stringify(result))
                    // console.log(parsedobj)
                    // console.log(`followed calon: ${this.followed_calon.length}`)
                    // console.log(`calon: ${this.calons.length}`)
                })
        },

        checkFollowedCalon(){
            console.log(this.calons.length)
            this.calons.forEach((value, i) => {
                //this.calons[i].status = false
                // console.log(`${this.calons[i].nama} => status: ${this.calons[i].status}`)

                this.followed_calon.forEach((value, j) => {
                    if(this.calons[i].id_calon == this.followed_calon[j].id_calon){
                        this.calons[i].status = true
                        console.log(`${this.calons[i].nama} => status: ${this.calons[i].status}`)
                    }
                })
            })
        },

        fetchPartai(){
            const PARTAI_API_URL = `${process.env.VUE_APP_API_URL}/partai`
        
            fetch(PARTAI_API_URL)
            .then(response => response.json())
            .then(result => {
                this.partai = result
                var parsedobj = JSON.parse(JSON.stringify(result))
                console.log(parsedobj)
        })  
        },

        goToLogin(){
            this.$router.push('/login');
        },

        followCalon(id_calon, status){
            const FOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token
            
            axios.post(FOLLOW_API_URL)
                .then(() => {
                    console.log(status)
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        unfollowCalon(id_calon, status){
            const UNFOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/unfollow/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token

            axios.delete(UNFOLLOW_API_URL)
                .then(() => {
                   console.log("calon unfollowed!")
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        
        // follUnfoll(id_calon, status){
        //     const FOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/${id_calon}`
        //     const UNFOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/unfollow/${id_calon}`
        //     axios.defaults.headers.common["token"] = localStorage.token

        //     //belum follow => follow
        //     if(!status){
        //         axios.post(FOLLOW_API_URL)
        //             .then(() => {
        //                 //this.$router.push("/dasbor_saya")
        //                 status = !status
        //                 console.log(status)
        //                 // this.$refs.btnToggle.innerText = status?'Ikuti':'Berhenti'
        //             })
        //             .catch((error) => {
        //                 console.error(error)
        //             })
        //         console.log("calon unfollowed!")
        //     } else { //sudah follow => unfollow
        //         axios.delete(UNFOLLOW_API_URL)
        //             .then(() => {
        //                 // window.location = "/dasbor_saya"
        //                 status = !status
        //             })
        //             .catch((error) => {
        //                 console.error(error)
        //             })
        //     }
        // }
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