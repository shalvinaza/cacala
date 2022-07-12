<template>
  <div class="search">
    <Navbar/>
    <div class="content" style="padding:120px 0 70px 0">
        <div class="container">
            <h1 class="text-center mb-5">Siapa Calon Yang Ingin Anda Cari?</h1>
            <form @submit.prevent="searchh" class="w-100">
                <div class="input-group">
                    <input type="search" class="p-3 form-control" placeholder="Ketik nama calon disini" v-model="search">
                    <button type="submit" class="input-group-text"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button> 
                </div>
            </form>

            <!-- search result -->
            <h5 class="mt-3">Hasil pencarian dengan nama "{{search}}"</h5>
            <div class="d-flex flex-column mt-4">
                <div class="row row-cols-2 row-cols-lg-4 row-cols-md-3 g-2 g-md-3 g-lg-3 mt-3">
                    <div class="col" v-for="calon in searchRes.slice((currentPage-1)*perPage,(currentPage-1)*perPage+perPage)" :per-page="perPage" :current-page="currentPage" :key="calon.id_calon">
                        <div class="card h-100">
                            <input type="image" :src="calon.foto" class="card-img-top" alt="dpr 2" @click="goToDetail(calon)"/>
                            <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                                <h5>{{calon.no_urut}}</h5>
                            </div>
                            <div class="card-body pt-3 pb-0">
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
                                    <button class="btn btn-outline-orange" @click="goToDetail(calon)">Detail</button>
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

                <b-pagination
                v-if="searchRes.length"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
                align="center"
                class="mt-5"
                ></b-pagination>

            </div>
            <div v-if="cekRow && !searchRes.length" class="row d-flex justify-content-center mt-3">
                <img src='../assets/images/error.png' class="d-flex" style="width:40%" alt="Not Found">
                <h5 class="d-flex d-flex justify-content-center align-items-center mt-3">Hasil tidak ditemukan</h5>
            </div>
            <Popup v-if="muncul" title="Anda belum masuk ke dalam sistem" pesanPopup="Apakah Anda ingin masuk?">
                <div class="d-flex justify-content-end">
                <button class="bg-light-orange-pop me-2 br-10" @click="togglePopup()">Tidak</button>
                <button class="btn-outline-orange2" @click="goToLogin()">Iya</button>
                </div>
            </Popup>
        </div>
    </div>
    <Footer1/>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import Footer1 from '@/components/Footer.vue'
import Popup from '../components/Berhasil.vue'

const ALL_CALON_API = `${process.env.VUE_APP_API_URL}/calon`
const FOLLOWED_CALON_API_URL = `${process.env.VUE_APP_API_URL}/user/followed`


export default {
    name:'Search',
    data : () => ({
        search: "",
        calons: [],
        searchRes:[],
        cekRow:false,
        exampleItems : [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Nama ' + (i+1) })) ,
        perPage: 8,
        currentPage: 1,
        followed_calon:[],
        muncul: false
    }),
    components:{
      Navbar,
      Footer1,
      Popup
    },
    created(){
        this.getData()
    },
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null},
        rows(){return this.searchRes.length},
        searchedCalons: function(){
            return this.calons.filter((calon) => {
                return calon.nama.toLowerCase().match(this.search.toLowerCase()) 
            })
        }
    },
    methods: {
        searchh:function(){
            this.searchRes = this.searchedCalons
            this.cekRow = true
        },
        togglePopup(){
            this.muncul = !this.muncul
        },
        getData(){
            fetch(ALL_CALON_API)
            .then(response => response.json())
            .then(result => {
                this.calons = result
                if(localStorage.getItem("token") != null){
                    this.fetchFollowedCalon()
                }
            })
        },

        fetchFollowedCalon() {
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
            Array.from(this.calons).forEach((value, i) => {
                Array.from(this.followed_calon).forEach((value, j) => {
                    if(this.calons[i].id_calon == this.followed_calon[j].id_calon){
                        this.calons[i].status = true
                        console.log(`${this.calons[i].nama} => status: ${this.calons[i].status}`)
                    }
                })
            })
        },

        goToDetail(calon){
            localStorage.setItem('id_calon', calon.id_calon)
            this.$router.push({ name: 'Detail_calon', params: { id_admin: calon.id_admin}})
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
    min-width: 5rem;
    font-size: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-item {
  background: tomato;
  width: calc(100% / 3.5);
  padding: 5px;
  height: auto;
  margin-top: 10px;
  color: white;
  font-weight: bold;
  text-align: center;
}
ul.paginate-links.items li {
  display: inline-block;
  margin: 5px;
}
ul.paginate-links.items a {
  cursor: pointer;
}
ul.paginate-links.items li.active a {
  font-weight: bold;
}
ul.paginate-links.items li.next:before {
  content: " | ";
  margin-right: 13px;
  color: #ddd;
}
ul.paginate-links.items li.disabled a {
  color: #ccc;
  cursor: no-drop;
}
p{
    font-size: 90%;
}
.input-group button{
    border-radius: 10px;
}
.input-group button:hover, .input-group:focus{
    border-radius: 10px;
    border: 2px solid #D65A40; 
    background-color: #D65A40;
    color: white;
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
}
.btn-outline-orange2{
    color:#DDA18C;
    font-weight:400;
    border: 1px solid #DDA18C;
    min-width: 4rem;
    background: white;
}
@media (max-width: 575.98px) { 
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