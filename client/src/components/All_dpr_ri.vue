<template>
    <div class="container">
        <h1 class="text-center pb-4 mb-4">Calon DPR Republik Indonesia</h1>
        <div class="row">

            <div class="col-md-2 mt-3">
                <h5 class="mt-3"><font-awesome-icon icon="fa-solid fa-filter" /> Filter</h5>
                <h6 class="mt-3">Partai</h6>
                <div class="form-check" v-for="option in partai" :key="option.nama_partai">
                    <input class="form-check-input" id="semua" type="checkbox" value="semua" v-model="checkPartai">
                    <input class="form-check-input" :id="option" type="checkbox" :value="option.nama_partai" v-model="checkPartai">
                    <label class="form-check-label">{{ option.nama_partai }}</label>
                </div>
            </div>

            <div class="col-md-10">
                <div class="row row-cols-2 row-cols-md-4 g-4 mt-3">
                    <div class="col" v-for="calon in filteredCalons" :key="calon.id_calon">
                        <div class="card h-100">
                            <input type="image" :src="calon.foto" class="card-img-top" alt="dpr 2" @click="goToDetail(calon)"/>
                            <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                                <h5>{{calon.no_urut}}</h5>
                            </div>
                            <div class="card-body p-3">
                                <h6 class="card-title text-center">{{calon.nama}}</h6>
                                <p class="card-subtitle text-center text-muted">Calon {{calon.jabatan_tujuan}}</p>
                                <div class="row align-items-start mt-2">
                                    <p class="col d-flex flex-wrap card-title">Partai</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <img v-for="partai in calon.partai" :key="partai.nama_partai" :src=partai.logo_partai class="img-partai m-1">
                                    </div>
                                </div>
                                <div class="row align-items-start mb-2">
                                    <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <p v-for="kota in calon.kota" :key="kota.id_kota">{{kota.kota}}</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center justify-content-between">
                                    <button class="btn btn-outline-orange" @click="goToDetail(calon)">Detail</button>
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

                <div v-if="!filteredCalons.length" class="row d-flex justify-content-center mt-3">
                    <img src='../assets/images/error.png' class="d-flex" style="width:40%" alt="Not Found">
                    <h5 class="d-flex d-flex justify-content-center align-items-center mt-3">Hasil tidak ditemukan</h5>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
const DPD_API_URL = `${process.env.VUE_APP_API_URL}/calon/jabatan/524bcc45-92d1-487d-b3da-d51b2ac770dd`
const FOLLOWED_CALON_API_URL = `${process.env.VUE_APP_API_URL}/user/followed`


export default {
    name: 'All_dpr_ri',
    data : () => ({
        no_data: false,
        calons: [],
        followed_calon: [],
        partai: [],
        provinsi: [],
        checkPartai: []
    }),
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null},
        filteredCalons(){
            let calons = this.calons
            const checkPartai = this.checkPartai

            if(checkPartai.length){
                return calons.filter((calon) => {
                    let selectedPartai = calon.partai.findIndex((prt) => {
                        return checkPartai.includes(prt.nama_partai)
                    }, this)
                    return selectedPartai !== -1
                })
            }

            else{
                console.log('gaada hasil')
            }

            return calons
        }
    },
    created(){
        this.fetchDPRRICalons(),
        this.fetchPartai()    },
    methods : {
        fetchDPRRICalons(){
            fetch(DPD_API_URL)
            .then(response => response.json())
            .then(result => {
                this.calons = result
                if(localStorage.getItem("token") != null){
                    this.fetchFollowedCalon()
                }
            })
        },

        fetchFollowedCalon(){
            const headers = { token: localStorage.token }
            fetch(FOLLOWED_CALON_API_URL, { headers })
                .then(response => response.json())
                .then(result => {
                    this.followed_calon = result
                    this.checkFollowedCalon()
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
        },

        checkFollowedCalon(){
            console.log(this.calons.length)
            this.calons.forEach((value, i) => {
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

        goToDetail(calon){
            localStorage.setItem('id_calon', calon.id_calon)
            this.$router.push({ name: 'Detail_calon', params: { id_admin: calon.id_admin}})
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

        unfollowCalon(id_calon){
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
.btn-outline-orange, .btn-outline-blue{
    padding: 0.3rem;
    min-width: 5rem;
    font-size: 80%;
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
.btn-outline-orange2{
    min-height: 3rem;
    padding: 0.5rem;
    border-color: #DDA18C;
}
p{
    font-size: 95%;
}
</style>