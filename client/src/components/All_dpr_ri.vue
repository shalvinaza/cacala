<template>
    <div class="container">
        <h1 class="text-center pb-4 mb-4">Calon DPR Republik Indonesia</h1>
        <!-- filter on smaller device -->
        <button class="btn btn-primary d-block d-xl-none btn-filter mt-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><font-awesome-icon icon="fa-solid fa-filter" /> Filter</button>

        <div class="offcanvas offcanvas-end" style="width:80%" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header mt-3">
                <h6 id="offcanvasRightLabel"><font-awesome-icon icon="fa-solid fa-filter" /> Filter berdasarkan partai</h6>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body pt-0">
                <div class="form-check" v-for="option in partai" :key="option.nama_partai">
                    <input class="form-check-input" id="semua" type="checkbox" value="semua" v-model="checkPartai">
                    <input class="form-check-input" :id="option" type="checkbox" :value="option.nama_partai" v-model="checkPartai">
                    <label class="form-check-label">{{ option.nama_partai }}</label>
                </div>
            </div>
        </div>

        <div :class="{'d-flex': deviceWidth > 1200, '' : deviceWidth < 1200 }">
            <!-- filter on bigger than lg device -->
            <div class="flex-shrink-1 mt-3 me-5 d-none d-xl-block d-xxl-block">
                <h5 class="mt-3"><font-awesome-icon icon="fa-solid fa-filter" /> Filter</h5>
                <h6 class="mt-3">Partai</h6>
                <div class="form-check" v-for="option in partai" :key="option.nama_partai">
                    <input class="form-check-input" id="semua" type="checkbox" value="semua" v-model="checkPartai">
                    <input class="form-check-input" :id="option" type="checkbox" :value="option.nama_partai" v-model="checkPartai">
                    <label class="form-check-label">{{ option.nama_partai }}</label>
                </div>
            </div>

            <div class="flex-grow-1">
                <div class="row row-cols-2 row-cols-lg-4 row-cols-md-3 g-2 g-md-3 g-lg-3 mt-3">
                    <div class="col" v-for="calon in filteredCalons.slice((currentPage-1)*perPage,(currentPage-1)*perPage+perPage)" :key="calon.id_calon" :per-page="perPage" :current-page="currentPage">
                        <div class="card h-100">
                            <input type="image" :src="calon.foto" class="card-img-top" alt="dpr 2" @click="goToDetail(calon)"/>
                            <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                                <h5>{{calon.no_urut}}</h5>
                            </div>
                            <div class="card-body p-3 pb-0">
                                <h6 class="card-title text-center">{{calon.nama}}</h6>
                                <p class="card-subtitle text-center text-muted">Calon {{calon.jabatan_tujuan}}</p>
                                <div class="row align-items-start mt-2">
                                    <p class="col d-flex flex-wrap card-title">Partai</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <img v-for="partai in calon.partai" :key="partai.nama_partai" :src=partai.logo_partai class="img-partai m-1">
                                    </div>
                                </div>
                                <div class="row align-items-start">
                                    <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <p>Indonesia</p>
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

                    <!-- dummy -->
                    <div class="col" v-for="item in exampleItems.slice((currentPage-1)*perPage,(currentPage-1)*perPage+perPage)" :key="item.index" :per-page="perPage" :current-page="2">
                            <div class="card h-100" v-if="filteredCalons.length">
                            <img type="image" src='../assets/images/pres.png' class="card-img-top" alt="dpr 2" @click="goToDetailDummy()"/>
                            <div class="card-img-overlay m-3 d-flex align-items-center justify-content-center p-0">
                                <h5>{{item.id+filteredCalons.length}}</h5>
                            </div>
                            <div class="card-body pt-3 pb-0">
                                <h6 class="card-title text-center">{{item.name}}</h6>
                                <p class="card-subtitle text-center text-muted">Calon DPD RI</p>
                                <div class="row align-items-start mt-2">
                                    <p class="col d-flex flex-wrap card-title">Partai</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <img src='../assets/images/logo_partai.png' class="img-partai m-1" alt="foto calon">
                                    </div>
                                </div>
                                <div class="row align-items-start">
                                    <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <p>Indonesia</p>
                                    </div>
                                </div>  
                            </div>
                            <div class="card-footer mb-2">
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-outline-orange" @click="goToDetailDummy()">Detail</button>
                                    <span v-if="isLoggedIn">
                                        <button class="btn btn-outline-blue">Ikuti</button>
                                    </span>       
                                    <span v-else>
                                        <button class="btn btn-outline-blue" @click="togglePopup()">Ikuti</button> 
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


                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    align="center"
                    class="mt-5"
                ></b-pagination>
                <Popup v-if="muncul" title="Anda belum masuk ke dalam sistem" pesanPopup="Apakah Anda ingin masuk?">
                    <div class="d-flex justify-content-end">
                    <button class="bg-light-orange-pop me-2 br-10" @click="togglePopup()">Tidak</button>
                    <button class="btn-outline-orange2" @click="goToLogin()">Iya</button>
                    </div>
                </Popup>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Popup from './Berhasil.vue'
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
        checkPartai: [],
        exampleItems : [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Nama ' + (i+1) })) ,
        perPage: 8,
        currentPage: 1,
        deviceWidth: window.innerWidth,
        muncul: false
    }),
    components:{
        Popup
    },
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null},
        rows(){
            let sum1 = this.exampleItems.length
            let sum2 = this.filteredCalons.length

            return sum1 + sum2
        },
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
        this.fetchPartai()    
    },
    mounted(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
    },
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
        togglePopup(){
            this.muncul = !this.muncul
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
        goToDetailDummy(){
            this.$router.push({ name: 'Detail_dummy'})
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
    display: flex;
    align-items: center;
    justify-content: center;
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
/* .btn-outline-orange2{
    min-height: 3rem;
    padding: 0.5rem;
    border-color: #DDA18C;
} */
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
.btn-filter{
    background-color:#9D9493 ;
    border: none;
 }
.btn-filter:focus, .btn-filter:hover {
    background-color:#D65A40;
    border: none;
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