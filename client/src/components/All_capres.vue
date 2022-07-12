<template>
    <div class="container">
        <h1 class="text-center pb-4 mb-5">Pasangan Presiden dan Wakil Presiden</h1>
        <div class="d-flex flex-column">
        <div class="row row-cols-2 row-cols-lg-3 row-cols-md-2 g-2 g-md-3 g-lg-3">
            <div class="col" v-for="calon in calons" :key="calon.id_calon">
                <div class="card h-100">
                <input type="image" :src="calon.foto" class="card-img-top" alt="dpr 2" @click="goToDetailPres(calon)"/>
                    <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                        <h5>{{calon.no_urut}}</h5>
                    </div>
                    <div class="card-body p-4">
                        <h6 class="card-title text-center"><span>{{calon.nama}}</span> & <span>Wakil Calon</span></h6>
                        <p class="card-subtitle text-center text-muted">Calon {{calon.jabatan_tujuan}}</p>
                        <div class="d-flex align-items-start mt-2">
                            <p class="col d-flex flex-shrink-1 flex-wrap flex-wrap card-title">Partai Koalisi</p>
                            <div class="col d-flex flex-grow-1 flex-wrap justify-content-end align-items-start">
                                <img v-for="(partai) in calon.partai" :key="partai.nama_partai" :src=partai.logo_partai class="img-partai m-1">
                            </div>
                        </div>
                        <div class="row align-items-start">
                            <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p class="d-flex flex-wrap justify-content-end">Indonesia</p>
                            </div>
                        </div>    
                    </div>
                    <div class="card-footer mb-2">
                        <div class="d-flex justify-content-center justify-content-between">
                            <button class="btn btn-outline-orange" @click="goToDetailPres(calon)">Detail</button>
                            <span v-if="isLoggedIn">
                                <button class="btn btn-outline-blue" @click="followCalon(calon.id_calon, calon.status), calon.status = !calon.status" v-show="!calon.status">Ikuti</button>
                            <button class="btn btn-outline-blue" @click="unfollowCalon(calon.id_calon, calon.status), calon.status = !calon.status" v-show="calon.status">Berhenti ikuti</button>
                            </span>    
                            <span v-else>
                                <button class="btn btn-outline-blue" @click="togglePopup()">Ikuti</button> 
                            </span>                      
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
        <Popup v-if="muncul" title="Anda belum masuk ke dalam sistem" pesanPopup="Apakah Anda ingin masuk?">
            <div class="d-flex justify-content-end">
            <button class="bg-light-orange-pop me-2 br-10" @click="togglePopup()">Tidak</button>
            <button class="btn-outline-orange2" @click="goToLogin()">Iya</button>
            </div>
        </Popup> 
    </div>
</template>

<script>
import axios from 'axios'
import Popup from './Berhasil.vue'
const PRESIDEN_API_URL = `${process.env.VUE_APP_API_URL}/calon/presiden/1470e05d-6f8d-476f-9d42-09ef4a23e5cc`
const FOLLOWED_CALON_API_URL = `${process.env.VUE_APP_API_URL}/user/followed`

export default {
    name: 'All_capres',
    data : () => ({
        no_data: false,
        calons: [],
        followed_calon: [],
        muncul: false
    }),
    components:{
        Popup
    },
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null}
    },
    mounted(){
        this.fetchCapresCalons()
    },
    methods : {
        togglePopup(){
            this.muncul = !this.muncul
        },

        goToDetailPres(calon){
            localStorage.setItem('id_calon', calon.id_calon)
            this.$router.push({ name: 'Detail_pres', params: { id_admin: calon.id_admin}})
        },
        fetchCapresCalons(){
            fetch(PRESIDEN_API_URL)
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
    height: 350px;   
}
.img-partai{
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
.card-subtitle{
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #C2A49D;
}
.bg-light-orange-pop:hover,.btn-outline-orange2:hover{
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
    height: 1.8rem;
}
.btn-outline-orange2{
    color:#DDA18C;
    font-weight:400;
    border: 1px solid #DDA18C;
    min-width: 4rem;
    background: white;
    height: 1.8rem;
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
@media (max-width: 767.98px) { 
    h5{
        font-size: 90%;
    }
    h6{
        font-size: 80%;
    }
    p{
        font-size: 70%;
    }
    .card-img-overlay{
        min-width: 40px;
        min-height: 40px;
    }
    .card-img-top{ 
        height: 200px;
    }
    .img-partai{
        width: 20px;
        height: 20px;  
    }
    .btn-outline-orange, .btn-outline-blue{
        padding: 0.2rem 0.1rem 0.2rem 0.1rem;
        min-width: 4rem;
        min-height: 1rem;
        font-size: 60%;
            }
    .btn-outline-orange{
        border: 1px solid  #D65A40;
    }
    .btn-outline-blue{
        border: 1px solid  #3E5D7A;
    }
}
@media (max-width: 360px) { 
    .img-partai{
        width: 15px;
        height: 15px;  
    }
    .btn-outline-orange, .btn-outline-blue{
        padding: 0.1rem 0.05rem 0.1rem 0.05rem;
        min-width: 3.5rem;
        min-height: 1rem;
        font-size: 50%;
    }
}
</style>