<template>
    <div class="container">
        <h1 class="text-center pb-4 mb-5">Pasangan Presiden dan Wakil Presiden</h1>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <!-- <section v-if="no_data">
                <div class="d-flex justify-content-center">
                    <img src="../assets/images/no_data.jpg" style="max-width:100%;min-width:100%" alt="no data">
                </div>
            </section> -->
                <div class="col" v-for="(calon,index) in calons" :key="calon.id_calon">
                    <div class="card h-100">
                    <img :src=calon.foto class="card-img-top" alt="dpr 2">
                        <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                            <h5>{{index + 1}}</h5>
                        </div>
                        <div class="card-body p-4">
                            <h5 class="card-title text-center mb-3">{{calon.nama}}</h5>
                            <div class="row align-items-start mb-4">
                                <p class="col-md-5 d-flex flex-wrap card-title">Partai Koalisi</p>
                                <div class="col-md-7 d-flex flex-wrap justify-content-end">
                                    <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                    <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                    <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                    <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                    <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                </div>
                            </div>
                            <div class="d-flex justify-content-center justify-content-between">
                                <router-link :to="{ name: 'Detail_calon', params: { id_admin: calon.id_admin}}" class="btn btn-outline-orange">Detail</router-link>
                                <span v-if="isLoggedIn">
                                    <span v-if="calon.status">
                                        <button class="btn btn-outline-blue" @click="unfollowCalon(calon.id_calon, calon.status)">Berhenti</button>  
                                    </span>
                                    <span v-else>
                                        <button class="btn btn-outline-blue" @click="followCalon(calon.id_calon, calon.status)">Ikuti</button> 
                                        <!-- <button @click="followedCalon(calon.id_calon)">Show if followed</button>  -->
                                    </span> 
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
const PRESIDEN_API_URL = `http://localhost:3000/calon/jabatan/4afc1348-c4a3-4c3c-a355-dcd938614b13`
const FOLLOWED_CALON_API_URL = `http://localhost:3000/user/followed`

export default {
    name: 'All_capres',
    data : () => ({
        no_data: false,
        calons: [],
        followed_calon: []
    }),
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null}
    },
    mounted(){
        this.fetchCapresCalons()
        this.fetchFollowedCalon()
    },
    methods : {
        fetchCapresCalons(){
            fetch(PRESIDEN_API_URL)
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
                this.calons[i].status = false
                // console.log(`${this.calons[i].nama} => status: ${this.calons[i].status}`)

                for(let j=0; j<this.followed_calon.length; j++){
                    if(this.calons[i].id_calon == this.followed_calon[j].id_calon){
                        this.calons[i].status = true
                        console.log(`${this.calons[i].nama} => status: ${this.calons[i].status}`)
                    }
                }
            })
        },

        goToLogin(){
            this.$router.push('/login');
        },

        followCalon(id_calon, status){
            const FOLLOW_API_URL = `http://localhost:3000/user/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token
            
            axios.post(FOLLOW_API_URL)
                .then(() => {
                    //this.$router.push("/dasbor_saya")
                    status = true
                })
                .catch((error) => {
                    console.error(error)
                })

            console.log(localStorage.token)
        },

        unfollowCalon(id_calon, status){
            const UNFOLLOW_API_URL = `http://localhost:3000/user/unfollow/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token

            axios.delete(UNFOLLOW_API_URL)
                .then(() => {
                    // window.location = "/dasbor_saya"
                    status = false
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