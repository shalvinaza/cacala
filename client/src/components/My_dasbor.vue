<template>
  <div class="container">
      <h1 class="text-center pb-4 mb-4">Calon yang Diikuti</h1>
        <div class="row row-cols-1 row-cols-md-2">
            <div class="col-md-2">
                <h5 class="mt-3"><font-awesome-icon icon="fa-solid fa-filter" /> Filter</h5>
                <div class="form-check mt-3">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked v-model="checkedJabatan" value="semua">
                    <label class="form-check-label" for="flexRadioDefault1">
                        Semua
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-model="checkedJabatan" value="Presiden">
                    <label class="form-check-label" for="flexRadioDefault1">
                        Presiden
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="checkedJabatan" value="DPR RI">
                    <label class="form-check-label" for="flexRadioDefault2">
                        DPR RI
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="checkedJabatan" value="DPD RI">
                    <label class="form-check-label" for="flexRadioDefault2">
                        DPD RI
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="checkedJabatan" value="DPRD Provinsi">
                    <label class="form-check-label" for="flexRadioDefault2">
                        DPRD provinsi
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="checkedJabatan" value="DPRD Kabupaten/Kota">
                    <label class="form-check-label" for="flexRadioDefault2">
                        DPRD Kabupaten/Kota
                    </label>
                </div>
            </div>
            <div class="col-md-10">
                <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
                    <div class="col" v-for="calon in followedJabatan" :key="calon.id_calon">
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
                                        <div class="col d-flex flex-wrap justify-content-end">
                                            <img v-for="(partai,index) in calon.partai" :key="index" :src=partai.logo_partai class="img-partai m-1">
                                        </div>
                                    </div>
                                </div>
                                <div class="row align-items-start">
                                    <p class="col d-flex flex-wrap card-title">Daerah Pilih</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <p v-for="kota in calon.kota" :key="kota.id_kota">{{kota.kota}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer mb-2">
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-outline-orange" @click="goToDetail(calon)">Detail</button>
                                    <button class="btn btn-outline-blue" @click="unfollowCalon(calon.id_calon)">Berhenti ikuti</button>                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="!followedJabatan.length" class="d-flex justify-content-center mt-3">
                    <img src='../assets/images/no_follow.png' class="d-flex" style="width:40%" alt="Not Found">
                </div>

            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
const FOLLOWED_CALON_API_URL = `${process.env.VUE_APP_API_URL}/user/followed`

export default {
    name:'My_dasbor',
    data : () => ({
        no_data: false,
        calons: [],
        checkedJabatan: 'semua'
    }),
    computed:{
        followedJabatan:function(){
            let calons = this.calons
            if(this.checkedJabatan && this.checkedJabatan !== 'semua'){
                calons = calons.filter((calon)=>{
                    return calon.jabatan_tujuan.match(this.checkedJabatan)
                })
            }
            return calons
        }
    },
    created(){
        this.fetchFollowedCalon()
    },
    methods : {
        fetchFollowedCalon(){
            const headers = { token: localStorage.token }
            fetch(FOLLOWED_CALON_API_URL, { headers })
                .then(response => response.json())
                .then(result => {
                    this.calons = result
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
            })
        },

        goToDetail(calon){
            localStorage.setItem('id_calon', calon.id_calon)
            this.$router.push({ name: 'Detail_calon', params: { id_admin: calon.id_admin}})
        },

        unfollowCalon(id_calon){
            const UNFOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/unfollow/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token

            axios.delete(UNFOLLOW_API_URL)
                .then(() => {
                    this.$router.go()
                })
                .catch((error) => {
                    console.error(error)
                })

            
        }
    }
}
</script>

<style scoped>
a{
    color: black;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
}
a:hover,a:active{
    color: #D65A40;
}
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
.img-partai{
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
.card-subtitle{
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #C2A49D;
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
.btn-outline-orange, .btn-outline-blue{
    padding: 0.3rem;
    min-width: 5rem;
    font-size: 80%;
}
p{
    font-size: 95%;
}
</style>