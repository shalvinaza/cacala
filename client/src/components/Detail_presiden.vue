<template>
    <div class="container">
        <div class="d-flex row row-cols-1 row-cols-md-3">
            <div class="flex-shrink-1 d-none d-md-block" style="max-width:300px">
                <div class="left-col d-flex flex-column justify-content-center mb-4" v-for="(calon) in calons" :key="calon.id_admin">
                    <div :class="{'p-4 br-15 mb-4' : deviceWidth >  991.98, 'p-0 br-15 mb-4' : deviceWidth<  991.98 }" style="background: #EDEDE9; max-height:1430px">
                        <img :src="calon.foto" class="profil-calon-detail mb-4" alt="dpr 2">
                        <h5 class="text-center">{{calon.nama}}</h5>
                        <p class="mb-4 text-center">Calon {{calon.jabatan_tujuan}}</p>
                        <div class="row align-items-start">
                            <h6 class="col">Partai</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <img v-for="partai in calon.partai" :key="partai.nama_partai" :src="partai.logo_partai" class="img-partai me-2">
                            </div>
                        </div>
                        <div class="row align-items-start mt-2">
                            <h6 class="col">Daerah Pilih</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p>Indonesia</p>
                            </div>
                        </div>
                        <div class="row align-items-start end-row-section">
                            <h6 class="col">Nomor Urut</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p>{{calon.no_urut}}</p>
                            </div>
                        </div>
                        <div class="mt-4 pb-3 end-row-section">
                            <h6 class="mb-3">Riwayat Pendidikan</h6>
                            <div class="mb-3" v-for="(pendidikan) in calon.riwayat_pendidikan" :key="pendidikan.id_pendidikan">
                                <p>{{pendidikan.nama_institusi}}</p>
                                <p class="mb-2">{{pendidikan.detail_pendidikan}}</p>
                                <i class="far fa-calendar-alt"></i> <span>{{pendidikan.tahun_mulai_pendidikan}}</span> - <span>{{pendidikan.tahun_selesai_pendidikan}}</span>
                            </div>
                        </div>
                        <div class="mt-4 pb-3">
                            <h6 class="mb-3">Riwayat Pekerjaan</h6>
                            <div v-for="(pekerjaan) in calon.riwayat_pekerjaan" :key="pekerjaan.id_pekerjaan">
                                <p>{{pekerjaan.nama_pekerjaan}}</p>
                                <p class="mb-2">{{pekerjaan.detail_pekerjaan}}</p>
                                <i class="far fa-calendar-alt"></i> <span>{{pekerjaan.tahun_mulai_pekerjaan}}</span> - <span>{{pekerjaan.tahun_selesai_pekerjaan}}</span>
                            </div>
                        </div>
                    </div>

                    <!-- dummy -->
                    <div :class="{'p-4 br-15' : deviceWidth >  991.98, 'p-0 br-15' : deviceWidth<  991.98 }" style="background: #EDEDE9; max-height:1430px">
                        <img src='../assets/images/pres.png' class="profil-calon-detail mb-4" alt="dpr 2">
                        <h5 class="text-center" v-for="calon in calons" :key="calon.id_wakil">Nama wakil</h5>
                        <p class="mb-4 text-center">Calon Presiden dan Wakil Presiden</p>
                        <div class="row align-items-start">
                            <h6 class="col">Partai</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <img src='../assets/images/logo_partai.png' class="img-partai me-2">
                            </div>
                        </div>
                        <div class="row align-items-start mt-2">
                            <h6 class="col">Daerah Pilih</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p>Indonesia</p>
                            </div>
                        </div>
                        <div class="row align-items-start end-row-section">
                            <h6 class="col">Nomor Urut</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p  v-for="calon in calons" :key="calon.no_urut">{{calon.no_urut}}</p>
                            </div>
                        </div>
                        <div class="mt-4 pb-3 end-row-section">
                            <h6 class="mb-3">Riwayat Pendidikan</h6>
                            <div class="mb-3">
                                <p>Universitas Padjadjaran</p>
                                <p class="mb-2">Hubungan internasional</p>
                                <i class="far fa-calendar-alt"></i> <span>2018</span> - <span>2019</span>
                            </div>
                        </div>
                        <div class="mt-4 pb-3">
                            <h6 class="mb-3">Riwayat Pekerjaan</h6>
                            <div>
                                <p>Wakil Kepala Bidang</p>
                                <p class="mb-2">Memimpin pengusunan operasional</p>
                                <i class="far fa-calendar-alt"></i> <span>2018</span> - <span>2019</span>
                            </div>
                        </div>
                    </div>
                    <!-- end of dummy -->

                </div>

            </div>

            <!-- riwayat on smaller devices -->
            <div class="flex-grow-1 d-sm-block d-md-none mb-4">
                <button class="btn btn-primary d-block d-xl-none btn-filter w-100 p-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <!-- <div v-for="calon in calons" :key="calon.id_admin"> -->
                        <div class="d-flex flex-row" v-for="calon in calons" :key="calon.id_admin">
                            <img :src="calon.foto" class="profil-calon-small mb-4 align-self-center" alt="dpr 2">
                            <div class="flex-column flex-grow-1 ps-3">
                                <h6 class="">{{calon.nama}}</h6>
                                <p class=" m-0 mb-1 low-font txt-muted">Calon {{calon.jabatan_tujuan}}</p>
                                <div class="row align-items-start m-0 mb-1 ">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Partai</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <img v-for="partai in calon.partai" :key="partai.nama_partai" :src="partai.logo_partai" class="img-low me-1">
                                    </div>
                                </div>
                                <div class="row align-items-start m-0 mb-1">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Daerah Pilih</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <p v-for="kota in calon.kota" :key="kota.id_post" class="d-flex justify-content-end low-font m-0 mb-1">{{kota.kota}}</p>
                                    </div>
                                </div>
                                <div class="row align-items-start m-0 mb-1">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Nomor Urut</p>
                                    <div class="col d-flex flex-wrap justify-content-end low-font">
                                        <p>{{calon.no_urut}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-4">
                            <img src='../assets/images/pres.png' class="profil-calon-small mb-4 align-self-center" alt="dpr 2">
                            <div class="flex-column flex-grow-1 ps-3">
                                <h6 class="" v-for="calon in calons" :key="calon.id_wakil">Nama_wakil</h6>
                                <p class=" m-0 mb-1 low-font txt-muted">Calon Wakil Presiden</p>
                                <div class="row align-items-start m-0 mb-1 ">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Partai</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <img src='../assets/images/logo_partai.png' class="img-low me-1">
                                    </div>
                                </div>
                                <div class="row align-items-start m-0 mb-1">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Daerah Pilih</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <p class="d-flex justify-content-end low-font m-0 mb-1">Indonesia</p>
                                    </div>
                                </div>
                                <div class="row align-items-start m-0 mb-1">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Nomor Urut</p>
                                    <div class="col d-flex flex-wrap justify-content-end low-font">
                                        <p v-for="calon in calons" :key="calon.no_urut">{{calon.no_urut}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p style="font-size:80%">Klik untuk melihat detail riwayat calon</p>
                    <!-- </div> -->
                </button>

                <div class="offcanvas offcanvas-end" style="width:80%" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header mt-3 pb-0">
                        <h5 id="offcanvasRightLabel">Biodata calon presiden</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body pt-0">
                        <div v-for="calon in calons" :key="calon.id_admin">
                            <div class="mt-4 pb-3 end-row-section">
                                <h6 class="mb-3">Riwayat Pendidikan</h6>
                                <div class="mb-3" v-for="(pendidikan) in calon.riwayat_pendidikan" :key="pendidikan.id_pendidikan">
                                    <p>{{pendidikan.nama_institusi}}</p>
                                    <p class="mb-2">{{pendidikan.detail_pendidikan}}</p>
                                    <span>{{pendidikan.tahun_mulai_pendidikan}}</span> - <span>{{pendidikan.tahun_selesai_pendidikan}}</span>
                                </div>
                            </div>
                            <div class="mt-4 pb-3">
                                <h6 class="mb-3">Riwayat Pekerjaan</h6>
                                <div v-for="(pekerjaan) in calon.riwayat_pekerjaan" :key="pekerjaan.id_pekerjaan">
                                    <p>{{pekerjaan.nama_pekerjaan}}</p>
                                    <p class="mb-2">{{pekerjaan.detail_pekerjaan}}</p>
                                    <span>{{pekerjaan.tahun_mulai_pekerjaan}}</span> - <span>{{pekerjaan.tahun_selesai_pekerjaan}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <h5>Biodata wakil calon presiden</h5>
                            <div class="mt-4 pb-3 end-row-section">
                                <h6 class="mb-3">Riwayat Pendidikan</h6>
                                <div class="mb-3">
                                    <p>Universitas Padjadjaran</p>
                                    <p class="mb-2">Hubungan internasional</p>
                                    <span>2018</span> - <span>2019</span>
                                </div>
                            </div>
                            <div class="mt-4 pb-3">
                                <h6 class="mb-3">Riwayat Pekerjaan</h6>
                                <div>
                                    <p>Wakil Kepala Bidang</p>
                                    <p class="mb-2">Memimpin pengusunan operasional</p>
                                    <span>2018</span> - <span>2019</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
            <div :class="{'flex-grow-1 right-col ms-5' : deviceWidth >  991.98, 'flex-grow-1 right-col' : deviceWidth<  991.98 }">
                <div class="row">
                <!-- poster dan slogan -->
                    <div class="card text-white poster-calon mb-2 text-center">
                        <img src="../assets/images/poster.jpg" class="poster-calon" alt="dpr 2">
                        <div class="card-img-overlay d-flex justify-content-start poster-caption">
                            <p class="card-text w-100" v-for="(calon) in calons" :key="calon.id_admin">{{calon.slogan}}</p>
                        </div>
                    </div>
                
                    <div :class="{'p-4' : deviceWidth >  991.98, 'p-2' : deviceWidth<  991.98 }">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="d-flex">
                                <h6 class="me-2">Total pengikut :</h6> <h6>{{showTotal}}</h6>
                            </span>
                            <span v-if="isLoggedin">
                                <span v-for="calon in calons" :key="calon.status">
                                    <button class="btn btn-outline-blue" @click="followCalon(calon.id_calon)" v-show="!isFollowed">Ikuti</button>
                                    <button class="btn btn-outline-blue" @click="unfollowCalon(calon.id_calon)" v-show="isFollowed">Berhenti ikuti</button>
                                </span>       
                            </span>
                            <span v-else>
                                <button class="btn btn-outline-blue" @click="togglePopup()">Ikuti</button> 
                            </span> 
                        </div>
                        <span v-for="post in posts" :key="post.id_foto">
                            <div :class="{'card w-100 postingan p-3 mb-3': deviceWidth > 991.98, 'card w-100 postingan p-3' : deviceWidth < 991.98 }">
                                <div class="card-body p-0">
                                    <h6 class="card-title text-center">{{post.judul}}</h6>
                                    <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                        <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>{{post.waktu}}</small></p>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <img v-if="post.foto" :src="post.foto" class="img-poster-post mb-3" alt="...">     
                                    </div>
                                    <p class="card-text">{{post.teks}}</p>
                                </div>
                            </div>
                        </span>
                        <!-- posts just text-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center card-text-dum-tit">Judul Post</h6>
                                <p class="card-text-dum text-muted end-row-section pb-2" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                <!-- <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="..."> -->
                                <p class="card-text-dum">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                        <!-- post with just image or video-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center card-text-dum-tit">Judul Post</h6>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text-dum text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <img src="../assets/images/poster_post2.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                </div>
                                <!-- <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p> -->
                            </div>
                        </div>                        
                        <!-- post with image and text -->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center card-text-dum-tit">Judul Post</h6>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text-dum text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <img src="../assets/images/poster_post2.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                </div>
                                <p class="card-text-dum">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
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

export default {
    name :'Post_detail_calon',
    data : () => ({
        no_data: false,
        calons: [],
        posts: [],
        followers:{},
        interval: null,
        idd: '',
        followed_calon:[],
        intervalPost: null,
        deviceWidth: window.innerWidth,
        muncul: false
    }),
   components:{
        Popup
    },
    created(){
        this.calonDetail()
        this.fetchFollowedCalon()
        // this.calonPosts()
        this.interval = setInterval(this.totalFollowers, 1000)
        this.interval = setInterval(this.calonPosts, 1000)
        this.idd = localStorage.getItem('id_calon')
    },
    mounted(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
    },
    beforeDestroy(){
        clearInterval(this.interval)
        clearInterval(this.intervalPost)
    },
    destroyed(){
        localStorage.removeItem('id_calon')
    },
    computed:{
        isLoggedin:function(){
            return localStorage.getItem("token") != null
        },

        showTotal:function(){
            let tot = 0
            let followers = this.followers
            if(followers.length){
                tot = Object.keys(this.followers).length
            } else{
                tot = 0
            }
            return tot
        },
        isFollowed(){
            const calFollowed = this.followed_calon
            let stat = false
            if(calFollowed.length){
                stat = true
            }
            return stat
        }
    },
    methods: {
        togglePopup(){
            this.muncul = !this.muncul
        },
        goToLogin(){
            this.$router.push('/login');
        },
        calonDetail(){
            try{
                const id_admin = this.$route.params.id_admin;
                axios.get(`${process.env.VUE_APP_API_URL}/calon/` + id_admin)
                .then(result => {
                    this.calons = result.data

                // if(localStorage.getItem("token") != null){
                //     this.fetchFollowedCalon()
                // }
                })
            }catch(err) {
                console.log(err)
            }
        },

        fetchFollowedCalon() {
            try{
               // const GET_FOLLOWED = `${process.env.VUE_APP_API_URL}/user/getStatusDetail/${this.idd}`
                const id_calon = localStorage.getItem('id_calon')
                axios.defaults.headers.common["token"] = localStorage.token
                axios.get(`${process.env.VUE_APP_API_URL}/user/getStatusDetail/` + id_calon)
                .then(result => {
                    this.followed_calon = result.data
                    // this.checkFollowedCalon()
                })
            }catch(err){
                console.log(err)
            }
        },

        followCalon(id_calon){
            const FOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token
            
            try{
                axios.post(FOLLOW_API_URL)
                .then(() =>{
                    this.fetchFollowedCalon()
                })
            }catch(error){
                    console.error(error)
            }
        },

        unfollowCalon(id_calon){
            const UNFOLLOW_API_URL = `${process.env.VUE_APP_API_URL}/user/unfollow/${id_calon}`
            axios.defaults.headers.common["token"] = localStorage.token

            try{
                axios.delete(UNFOLLOW_API_URL)
                .then(() =>{
                    this.fetchFollowedCalon()
                })
            } catch(error){
                    console.error(error)
            }
        },

        calonPosts(){
            try {
                const id_admin = this.$route.params.id_admin;
                axios.get(`${process.env.VUE_APP_API_URL}/post/user/` + id_admin)
                .then(result => {
                    this.posts = result.data;
                })
            } catch(err){
                console.log(err)
            }
        },
        totalFollowers(){
            try{
                // const id_calon = localStorage.getItem('id_calon')
                // const id_calon = this.$route.params.id_calon
                axios.get(`${process.env.VUE_APP_API_URL}/user/totalFollowers/` + this.idd)
                .then(result => {
                    this.followers = result.data
                })
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style scoped>
.left-col{
    border-radius: 15px;
    max-height: 70%;
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
.right-col{
    background: #EDEDE9;
    border-radius: 15px;
    min-height: 100vh;
    padding: 0;
}
.profil-calon-detail{
    border-radius: 105px;
    width: 210px;
    height: 210px;
    display: flex;
    align-self: center;
    justify-self: center;
    margin: auto;
    margin-top: 20px;
}
.profil-calon-small{
    border-radius: 50%;
    width: 120px;
    height: 120px;
}
.img-partai{
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
.row{
    line-height: 130%;
    --bs-gutter-x:0;
}
.end-row-section{
    border-bottom: 1px solid #000000;
}
.poster-calon{
    border-radius: 15px 15px 0 0;
    height: 200px;
}
.poster-caption{
    top: unset;
    color: white;
    min-height: 50px;
    background: rgba(0, 0, 0, 0.61);
}
.postingan{
    min-height: 200px;
    background: #FFFFFF;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
    border-radius: 15px;
}
.img-poster-post{
    display: flex;
    justify-content: center;
    max-height: 800px;
    max-width: 400px;
}
.icons{
    color: white;
}
.icons:hover,.icons:active{
    color: #D65A40;
}
.btn-filter, .btn-filter:hover, .btn-filter:focus{
    background-color: #EDEDE9;
    color: black;
    border-radius: 15px;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.low-font{
    font-size: 80%;
}
.img-low{
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
@media (max-width: 991.98px) {
    .profil-calon-detail{
        width: 130px;
        height: 130px;
        border-radius: 50%;
        display: flex;
        align-self: center;
        justify-self: center;
        margin: auto;
        margin-top: 20px;
    }
    .left-col h5{
        font-size: 90%;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 0;   
    }
    .left-col h6{
        font-size: 80%;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 0;
    }
    .left-col p{
        font-size: 80%;
        margin-left: 10px;
        margin-right: 10px;
    }
    span{
        font-size: 80%;
        margin-left: 10px;
        margin-right: 10px;
    }
    .img-partai{
        width: 20px;
        height: 20px;
        border-radius: 50%px;
    }
    .btn-outline-blue{
        min-width: 4rem;
        max-width: 6rem;
        min-height: 2rem;
        font-size: 90%;
        padding: 2px 5px 2px 5px;
    }
    h6{
        font-size: 100%;
    }
    p{
        font-size: 100%;
    }
    .img-poster-post{
        display: flex;
        justify-content: center;
        max-height: 700px;
        max-width: 350px;
    }
    .card-text-dum{
        font-size: 70%;
    }
    .card-text-dum-tit{
        font-size: 80%;
    }
} 
@media (max-width: 410px){
    .img-poster-post{
        display: flex;
        justify-content: center;
        max-height: 500px;
        max-width: 250px;
    }
}
</style>