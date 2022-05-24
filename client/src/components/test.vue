<template>
    <div class="container">
        <h1 class="text-center pb-4 mb-4">Calon DPD Republik Indonesia</h1>
        <select class="btn-outline-orange2 me-3" name="dapil" id="dapil" v-model="selectedKota">
            <option class="dropdown-item" value="dapil">Daerah Pilih</option>
            <option class="dropdown-item" v-for="(prov) in provinsi" :key="prov.id_provinsi">
            {{ prov.provinsi }}
            </option>
        </select> 
        <select class="btn-outline-orange2" name="partai" id="partai" v-model="selectedPartai">
            <option class="dropdown-item" value="partai">Partai</option>
            <option class="dropdown-item" v-for="prt in partai" v-bind:key="prt.id_partai">
            {{ prt.nama_partai }}
            </option>
        </select> 
        <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
            <div class="col" v-for="(calon,index) in filteredKota" :key="calon.id_calon">
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
                                <img v-for="(partai) in calon.partai" :key="partai.nama_partai" :src=partai.logo_partai class="img-partai m-1" alt="{{partai.nama_partai}}">
                            </div>
                        </div>
                        <div class="row align-items-start mb-2">
                            <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p>{{calon.kota}}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <router-link :to="{ name: 'Detail_calon', params: { id_admin: calon.id_admin}}" class="btn btn-outline-orange">Detail</router-link>
                            <span v-if="isLoggedIn">
                                <button class="btn btn-outline-blue" @click="followCalon(calon.id_calon), calon.status = !calon.status" v-show="!calon.status">Ikuti</button>
                                <button class="btn btn-outline-blue" @click="unfollowCalon(calon.id_calon), calon.status = !calon.status" v-show="calon.status">Berhenti</button>
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

const DPD_API_URL = `${process.env.VUE_APP_API_URL}/calon/jabatan/51978294-1f8a-4c8c-acbf-f3cc013c16d3`
const FOLLOWED_CALON_API_URL = `${process.env.VUE_APP_API_URL}/user/followed`

export default {
    name: 'All_dpd_ri',
    data : () => ({
        no_data: false,
        calons: [],
        followed_calon: [],
        partai: [],
        provinsi: [],
        // selectedKota: '',
        // selectedPartai: ''
    }),
    computed: {
        isLoggedIn: function() {return localStorage.getItem("token") != null},
        filteredKota : function(){
            var hasil;
            // if(this.selectedKota && this.selectedKota !== 'dapil'){
            //     if(this.selectedPartai && this.selectedPartai){
            //         return this.calons.filter((calon) => {
            //             let foundPartai = calon.partai.findIndex((prt) => {
            //                 return prt.nama_partai.match(this.selectedPartai)
            //             })
            //             return foundPartai !== -1
            //         });
            //     }
            //     return this.calons.filter((calon) => {
            //         return calon.provinsi.match(this.selectedKota);
            //     })
            // }
            // if(this.selectedKota && this.selectedPartai){
            //     return this.calons.filter((calon) => {
            //         let dapil = calon.provinsi.match(this.selectedKota)
            //         let foundPartai = calon.partai.findIndex((prt) => {
            //             let part = prt.nama_partai.match(this.selectedPartai)
            //         })
            //         return foundPartai !== -1
            //     })
            // }
            if(this.selectedKota && this.selectedKota != 'dapil'){
                return this.calons.filter((calon) => {
                    // return calon.provinsi.match(this.selectedKota);
                    return hasil = calon.provinsi.match(this.selectedKota)
                })
            }
            if(this.selectedPartai && this.selectedPartai != 'partai'){
                return this.calons.filter((calon) => {
                    let foundPartai = calon.partai.findIndex((prt) => {
                        return hasil = prt.nama_partai.match(this.selectedPartai)
                    })
                    return foundPartai !== -1
                })
            }

            return hasil;
            // if(this.filterCategory && this.filterCategory !== 'all') {
            //     posts = posts.filter((p) => {
            //     let foundCategory = p.category_array.findIndex((c) => {
            //         return c.slug === this.filterCategory
            //     })
            //     return foundCategory !== -1
            //     })
            // }
        }
    },
    created(){
        this.fetchDPDCalons(),
        this.fetchPartai(),
        this.fetchProvinsi()
    },
    methods : {
        fetchProvinsi(){
            const PROV_API_URL = `${process.env.VUE_APP_API_URL}/dapil/provinsi`
            fetch(PROV_API_URL)
                .then(response => response.json())
                .then(result => {
                    this.provinsi = result
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

        fetchDPDCalons(){
            fetch(DPD_API_URL)
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
.btn-outline-orange2{
    min-height: 3rem;
    padding: 0.5rem;
    border-color: #DDA18C;
}
.dropdown-item{
    background-color: white;
    border-color: white;
}
</style>