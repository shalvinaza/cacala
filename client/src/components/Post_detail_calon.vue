<template>
    <div class="container">
        <div class="row row-cols-3 row-cols-md-3">
            <div class="col-md-3">
            <div class="row row-cols-1 row-cols-md-1">
            <div class="col left-col d-flex justify-content-center mb-4" v-for="(calon) in calons" :key="calon.id_admin">
                <div class="p-4 br-15" style="background: #EDEDE9; max-height:1430px">
                    <img :src=calon.foto class="profil-calon-detail mb-4" alt="dpr 2">
                    <h5 class="text-center">{{calon.nama}}</h5>
                    <p class="mb-5 text-center">Calon {{calon.jabatan_tujuan}}</p>
                    <div class="row align-items-start">
                        <h6 class="col">Partai</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <img v-for="partai in calon.partai" :key="partai.nama_partai" :src="partai.logo_partai" class="img-partai me-2">
                        </div>
                    </div>
                    <div class="row align-items-start mt-2">
                        <h6 class="col">Daerah Pilih</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <p v-for="kota in calon.kota" :key="kota.id_post">{{kota.kota}}</p>
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
            </div>

            </div>

            </div>
            <!-- this is just for divider -->
            <div class="col-md-1">
            </div>
            <!-- end of divider -->
            <div class="col-md-8 right-col">
                <div class="row">
                <!-- poster dan slogan -->
                    <div class="card text-white poster-calon mb-2 text-center">
                        <img src="../assets/images/poster.jpg" class="poster-calon" alt="dpr 2">
                        <div class="card-img-overlay d-flex justify-content-start poster-caption">
                            <p class="card-text w-100" v-for="(calon) in calons" :key="calon.id_admin">{{calon.slogan}}</p>
                        </div>
                    </div>
                
                    <div class="p-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
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
                                <button class="btn btn-outline-blue" @click="goToLogin()">Ikuti</button> 
                            </span> 
                        </div>
                        <span v-for="post in posts" :key="post.id_foto">
                            <div class="card w-100 postingan p-3 mb-3">
                                <div class="card-body p-0">
                                    <h5 class="card-title text-center">{{post.judul}}</h5>
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
                                <h5 class="card-title text-center">Judul Post</h5>
                                <p class="card-text text-muted end-row-section pb-2" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                <!-- <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="..."> -->
                                <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                        <!-- post with just image or video-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <p class="card-text text-muted end-row-section pb-2" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                <img src="../assets/images/poster_post2.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                <!-- <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p> -->
                            </div>
                        </div>                        
                        <!-- post with image and text -->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <p class="card-text text-muted end-row-section pb-2" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

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
        intervalPost: null
    }),
    created(){
        this.calonDetail()
        this.fetchFollowedCalon()
        // this.calonPosts()
        this.interval = setInterval(this.totalFollowers, 1000)
        this.interval = setInterval(this.calonPosts, 10000)
        this.idd = localStorage.getItem('id_calon')
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
    min-height: 100vh;
}
.right-col{
    background: #EDEDE9;
    border-radius: 15px;
    min-height: 100vh;
    padding: 0;
}
.profil-calon-detail{
    border-radius: 50%;
    max-width: 210px;
    max-height: 210px;
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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
</style>