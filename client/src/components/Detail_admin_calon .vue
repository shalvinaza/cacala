<template>
    <div class="container">
        <div class="d-flex row row-cols-1 row-cols-md-3">
            <div class="flex-shrink-1 d-none d-md-block">
                <div class="left-col d-flex justify-content-center" v-for="(calon) in calon" :key="calon.id_admin">
                    <div :class="{'p-4 br-15' : deviceWidth >  991.98, 'p-0 br-15' : deviceWidth<  991.98 }" style="background: #EDEDE9;">
                        <img :src="calon.foto" class="profil-calon-detail mb-4" alt="dpr 2">
                        <button class="d-flex align-items-center btn bg-light-orange br-10 mb-4" style="margin:auto"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-2"/>edit profil</button>
                        <!-- <div class="card" style="background-color:transparent; border:none">
                            <img :src="calon.foto" class="profil-calon-detail mb-4" alt="dpr 2">
                            <form class="card-img-overlay edit-foto me-2">
                                <input type="file" id="inputFoto" style="display:none" ref="fotoCalon" @change="selectFotoCalon()"/>
                                <font-awesome-icon icon="fa-solid fa-pen-to-square" @click="addFotoCalon()"/>
                            </form>
                        </div> -->
                        <h5 class="text-center">{{calon.nama}}</h5>
                        <p class="mb-4 text-center">Calon {{calon.jabatan_tujuan}}</p>
                        <div class="row align-items-start">
                            <h6 class="col">Partai</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <img v-for="(partai) in calon.partai" :key="partai.nama_partai" :src=partai.logo_partai class="img-partai m-1">
                            </div>
                        </div>
                        <div class="row align-items-start">
                            <h6 class="col">Daerah Pilih</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p v-for="(kta,index) in calon.kota" :key="index">{{kta.kota}}</p>
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
                                <h6>{{pendidikan.nama_institusi}}</h6>
                                <p class="mb-2">{{pendidikan.detail_pendidikan}}</p>
                                <i class="far fa-calendar-alt"></i> <span>{{pendidikan.tahun_mulai_pendidikan}}</span> - <span>{{pendidikan.tahun_selesai_pendidikan}}</span>
                            </div>
                        </div>
                        <div class="mt-4 pb-3">
                            <h6 class="mb-3">Riwayat Pekerjaan</h6>
                            <div v-for="(pekerjaan) in calon.riwayat_pekerjaan" :key="pekerjaan.id_pekerjaan">
                                <h6>{{pekerjaan.nama_pekerjaan}}</h6>
                                <p class="mb-2">{{pekerjaan.detail_pekerjaan}}</p>
                                <i class="far fa-calendar-alt"></i> <span>{{pekerjaan.tahun_mulai_pekerjaan}}</span> - <span>{{pekerjaan.tahun_selesai_pekerjaan}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- riwayat on smaller devices -->
            <div class="flex-grow-1 d-sm-block d-md-none mb-4">
                <button class="btn btn-primary d-block d-xl-none btn-filter w-100 p-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <!-- <div v-for="calon in calon" :key="calon.id_admin"> -->
                        <div class="d-flex flex-row" v-for="calon in calon" :key="calon.id_admin">
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
                    <!-- </div> -->
                </button>

                <div class="offcanvas offcanvas-end" style="width:80%" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header mt-3 pb-0">
                        <h6 id="offcanvasRightLabel">Biodata calon</h6>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body pt-0">
                        <div v-for="calon in calon" :key="calon.id_admin">
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
                    </div>
                </div>
            </div>

            <div class="flex-grow-1 right-col">
                <div class="row">
                <!-- poster dan slogan -->
                    <div class="card text-white poster-calon mb-2 text-center">
                        <img src="../assets/images/poster.jpg" class="poster-calon" alt="dpr 2">
                        <div class="card-img-overlay d-flex justify-content-start poster-caption">
                            <p class="card-text w-100" v-for="calon in calon" :key="calon.id_calon">{{calon.slogan}}</p>
                        </div>
                    </div>
                    <div :class="{'p-4' : deviceWidth >  991.98, 'p-2' : deviceWidth<  991.98 }">

                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="d-flex">
                                <h6 class="me-2">Total pengikut :</h6> <h6>{{showTotal}}</h6>
                            </span>
                        </div>

                        <!-- part create post -->
                        <!-- <button type="button" class="btn bg-light-orange br-10 mb-3 d-md-block">Mulai siaran langsung</button> -->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center mb-4">Apa kabar tebaru dari Anda?</h6>
                                <form @submit.prevent="addPost" enctype="multipart/form-data" @change="toggleAlert">
                                    <div class="forms-inputs mb-4"> 
                                        <span>Judul unggahan</span> 
                                        <input v-bind:class="{'form-control w-100 p-3':true, 'is-invalid' : !validJudul(form.judul) && judulBlured}" autocomplete="off" type="text" v-model="form.judul" v-on:blur="judulBlured = true" placeholder="Ketik judul di sini">
                                        <div class="invalid-feedback">Judul tidak boleh kosong</div>
                                    </div>
                                    <div class="forms-inputs mb-3"> 
                                        <span>Teks unggahan</span>
                                        <textarea v-bind:class="{'form-control w-100 p-3':true, 'is-invalid' : !validTeks(form.teks) && teksBlured}" autocomplete="off" v-model="form.teks" v-on:blur="teksBlured = true" placeholder="Ketik teks di sini"></textarea>
                                        <div class="invalid-feedback">Teks tidak boleh kosong</div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span class="card-text flex-shrink-1 icons me-3">
                                            <input type="file" id="inputFoto" style="display:none" ref="foto" @change="selectImage()"/><font-awesome-icon icon="fa-solid fa-images" @click="addFoto()"/>
                                        </span>
                                        <div class="d-flex flex-grow-1 justify-content-end">
                                            <button type="submit" class="btn bg-light-orange br-10">Unggah</button> 
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row field mt-3" v-if="form.foto">
                                        <span class="file-name">{{form.foto.name}}</span>
                                        <span v-if="errorImg" style="color:red" class="m-0">- {{messageImg}}</span>
                                        <span class="d-flex justify-content-end flex-grow-1" @click="destroyImg()"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></span>
                                    </div>
                                </form>                      
                            </div>
                        </div> 

                        <!-- <div
                            v-if="message"
                            :class="`message ${error ? 'is-danger' : 'is-success'}`"
                        >
                            <div class="message-body mb-3">{{message}}</div>
                        </div>  -->

                        <!-- edit post -->
                        <Popup v-if="updateSubmit" title="Edit Postingan" @toggle-modal="toggleModal">
                                <form @submit.prevent="update" enctype="multipart/form-data">
                                    <div class="forms-inputs mb-4"> 
                                        <span>Judul unggahan</span> 
                                        <input v-bind:class="{'form-control w-100 p-3':true, 'is-invalid' : !judulUpdate(formUpdate.judul) && judulUpdateBlured}" autocomplete="off" type="text" v-on:blur="judulUpdateBlured = true" v-model="formUpdate.judul" placeholder="Ketik judul di sini">
                                        <div class="invalid-feedback">Judul tidak boleh kosong</div>
                                    </div>
                                    <div class="forms-inputs mb-3"> 
                                        <span>Teks unggahan</span>
                                        <textarea v-bind:class="{'form-control w-100 p-3':true, 'is-invalid' : !teksUpdate(formUpdate.teks) && teksUpdateBlured}" autocomplete="off" v-on:blur="teksUpdateBlured = true" v-model="formUpdate.teks" placeholder="Ketik teks di sini"></textarea>
                                        <div class="invalid-feedback">Teks tidak boleh kosong</div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span class="card-text icons me-3">
                                            <input type="file" id="inputFoto2" style="display:none" ref="foto2" @change="selectImageUpdate()"/><font-awesome-icon icon="fa-solid fa-images" @click="addFotoUpdate()"/>
                                        </span>
                                        <div class="d-flex flex-grow-1 justify-content-end">
                                            <button type="submit" class="btn bg-light-orange br-10">Unggah</button> 
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row field mt-3" v-if="formUpdate.file">
                                        <span class="file-name">{{formUpdate.file.name}}</span>
                                        <span v-if="errorImg" style="color:red" class="m-0">- {{messageImg}}</span>
                                        <span class="d-flex justify-content-end flex-grow-1" @click="destroyImg2()"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></span>
                                    </div>
                                </form>  
                        </Popup>

                        <!-- posts just text-->
                        <span v-for="post in posts"  :key="post.id_post">
                            <div :class="{'card w-100 postingan p-3 mb-3': deviceWidth > 991.98, 'card w-100 postingan p-3' : deviceWidth < 991.98 }">
                                <div class="card-body p-0">
                                    <h6 class="card-title text-center">{{post.judul}}</h6>
                                    <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                        <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>{{formatDate(post.waktu)}}</small></p>
                                        <span class="card-text icons me-2" @click="edit(post)" ><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                        <span class="card-text icons" @click="toggleShow(post.id_post)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                                        <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Unggahan yang akan dihapus tidak dapat dikembalikan"> 
                                            <div class="d-flex justify-content-end">
                                                <button class="bg-light-orange2 me-2 br-10" @click="toggleShow(post.id_post)">Tidak</button>
                                                <button class="btn-outline-orange2" @click="del()">Iya</button>
                                            </div>
                                        </Popup2>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <img v-if="post.foto" :src="post.foto" class="img-poster-post mb-3" alt="...">     
                                    </div>
                                    <p class="card-text p-3">{{post.teks}}</p>
                                </div>
                            </div>
                        </span>
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center  card-text-dum-tit">Judul Post</h6>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text-dum text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                    <span class="card-text icons"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                                </div>
                                <!-- <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="..."> -->
                                <p class="card-text-dum">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                        <!-- post with just image or video-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center  card-text-dum-tit">Judul Post</h6>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text-dum text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                    <span class="card-text icons"><font-awesome-icon icon="fa-solid fa-trash" /></span>
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
                                <h6 class="card-title text-center  card-text-dum-tit">Judul Post</h6>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text-dum text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                    <span class="card-text icons"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                </div>
                                <p class="card-text-dum">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>

        </div>

        <Alert v-if="updated" :variantName="variant" :messageProps="pesanUpdate" style="overflow-y: auto"/>
    </div>
</template>

<script>
import Popup from './Popup.vue'
import Popup2 from './Berhasil.vue'
import axios from 'axios'
import Alert from './Pop_sukses.vue'
import moment from 'moment'


export default {
    name :'Post_detail_calon',
    components:{
        Popup,
        Popup2,
        Alert
    },
    data: function () {
        return {
             calon: [],
             posts: [],
             form : {
                 judul:'',
                 teks:'',
                 foto: ''
             },
            files:[],
            formUpdate : {
                 judul:'',
                 teks:'',
                 file: '',
                 foto:null,
                 id_foto:null
             },
             calonUpdate : {
                file: '',
                foto: null,
                id_foto: null
             },
             updateSubmit: false,
             popupDel: false,
             delPost: '',
             message: '',
             id_post:'',
             deviceWidth: window.innerWidth,
             interval: null,
             followers: {},
             pesanUpdate: '',
             updated: false,
             variant: '',
             errorImg: false,
             messageImg: '',
             valid: false,
             validUpdate: false,
             judulBlured: false,
             teksBlured: false,
             judulUpdateBlured: false,
             teksUpdateBlured: false
        }   
    },
    created(){
        this.interval = setInterval(this.totalFollowers, 1000)
    },
    mounted(){
        const headers = { token: localStorage.token }
        const CALON_API_URL = `${process.env.VUE_APP_API_URL}/calon/admin`
        fetch(CALON_API_URL, { headers })
            .then(response => response.json())
            .then(result => {
                this.calon = result
                var parsedobj = JSON.parse(JSON.stringify(result))
                console.log(parsedobj)
            })
        this.load()
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
    },
    computed:{
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
    },
    beforeDestroy(){
        clearInterval(this.interval)
    },
    methods: {
        validate : function(){
            this.judulBlured = true
            this.teksBlured = true
            if( this.validJudul(this.form.judul) && this.validTeks(this.form.teks)){
                this.valid = true;
                }
        },
        validJudul : function(judul) {
            if(judul.length > 0){
                return true;
            }
        },
        validTeks : function(teks) {
            if(teks.length > 0){
                return true;
            }
        },
        validateUpdate : function(){
            this.judulUpdateBlured = true
            this.teksUpdateBlured = true
            if( this.judulUpdate(this.formUpdate.judul) && this.teksUpdate(this.formUpdate.teks)){
                this.validUpdate = true;
                }
        },
        judulUpdate : function(judul) {
            if(judul.length > 0){
                return true;
            }
        },
        teksUpdate : function(teks) {
            if(teks.length > 0){
                return true;
            }
        },
        destroyImg(){
            this.form.foto = ''
        },
        destroyImg2(){
            this.formUpdate.file = ''
        },
        formatDate(date){
            let tanggal = moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY hh:mm:ss');
            return tanggal;
        },
        load(){
            const GET_POST_API_URL = `${process.env.VUE_APP_API_URL}/post/`
            axios.defaults.headers.common["token"] = localStorage.token
            axios.get(GET_POST_API_URL)
                .then(result => {
                    this.posts = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
                .catch((err) =>
                {
                    console.log(err);
                })
        },
        totalFollowers(){
            axios.defaults.headers.common["token"] = localStorage.token
            try{
                axios.get(`${process.env.VUE_APP_API_URL}/admin/totalFollowers/`)
                .then(result => {
                    this.followers = result.data
                })
            }catch(err){
                console.log(err)
            }
        },

        toggleAlert(){
            this.uploaded = false
            this.message = ''
            this.variant = ''
        },

        addFoto(){
            document.getElementById('inputFoto').click();
            this.errorImg = false
            this.message = ''
            this.messageImg = ''
        },
        selectImage(){
            this.form.foto = this.$refs.foto.files[0];
            this.validateImage(this.form.foto)

            if(this.message !== ''){
                this.errorImg = true
                this.messageImg = this.message
                // this.form.foto = ''
                   console.log(this.message)
            }
        },
        addFotoUpdate(){
            document.getElementById('inputFoto2').click();
            this.errorImg = false
            this.message = ''
            this.messageImg = ''
          },
        selectImageUpdate(){
            this.formUpdate.file = this.$refs.foto2.files[0];
            this.validateImage(this.formUpdate.file)

            if(this.message !== ''){
                this.errorImg = true
                this.messageImg = this.message
                // this.form.foto = ''
                   console.log(this.message)
            }
        },
        validateImage:function(file){
            const MAX_SIZE = 200000;
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

            if(file.size > MAX_SIZE){
                this.message = `File terlalu besar. Besar file maksimal ${MAX_SIZE / 1000}Kb`;
            }
            if(!allowedTypes.includes(file.type)){
                this.message = "Hanya boleh memilih gambar";
            }

            return this.message;
        },
        async addPost(e){
            const POST_POSTS_API_URL = `${process.env.VUE_APP_API_URL}/post/`
            axios.defaults.headers.common["token"] = localStorage.token
            e.preventDefault()
            this.validate()
            if(this.valid){

                const formData = new FormData();

                formData.append('judul', this.form.judul);
                formData.append('teks', this.form.teks);
                formData.append('image', this.form.foto);
                // _.forEach(this.form.foto, file => {
                //     if(this.validateImage(file) === ""){
                //         formData.append('foto', file);
                //     }
                // });
                try {
                    await axios.post(POST_POSTS_API_URL, formData);
                    this.load()
                    this.form.judul =''
                    this.form.teks = ''
                    this.form.foto = ''
                    this.updated = true
                    this.variant = 'success'
                    this.pesanUpdate = 'Berhasil membuat unggahan baru'
                    this.judulBlured = false
                    this.teksBlured = false
                    this.valid = false
                }catch(err){
                    console.log(err)
                }
            }
        },
        del(){
            const post_id = this.delPost;
            axios.delete(`${process.env.VUE_APP_API_URL}/post/`+ post_id).then(() =>{
                this.popupDel = false
                this.load()
                let index = this.posts.indexOf(post_id)
                this.posts.splice(index,1)
                this.updated = true
                this.pesanUpdate = 'Unggahan berhasil dihapus'
                this.variant = 'success'
            })            
        },
        edit(post){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            this.id_post = post.id_post
            this.updateSubmit = true
            axios.get(`${process.env.VUE_APP_API_URL}/post/`+ post.id_post).then(() =>{
                this.formUpdate.judul = post.judul
                this.formUpdate.teks = post.teks  
                this.formUpdate.foto = post.foto
                this.formUpdate.id_foto = post.id_foto           
            })  
        },
        async update(e){
            e.preventDefault()
            this.validateUpdate()
            if(this.validUpdate){
                const post_id = this.id_post
                const formFile = this.formUpdate.file
                const id_foto = this.formUpdate.id_foto

                const formData = new FormData();

                formData.append('judul', this.formUpdate.judul);
                formData.append('teks', this.formUpdate.teks);
                
                // if(formFile !== ''){
                //     formData.append('image', this.formUpdate.file);
                // }
                if(formFile == ''){
                    if(id_foto != null) {
                        formData.append('foto', this.formUpdate.foto);
                        formData.append('id_foto', this.formUpdate.id_foto);
                    }
                    else{
                        formData.append('foto', null);
                        formData.append('id_foto', null);
                    // }
                    // formData.append('foto', this.formUpdate.foto);
                    // formData.append('id_foto', this.formUpdate.id_foto);
                    }
                }
                else{
                    formData.append('image', this.formUpdate.file);
                }

                try {
                    return axios.put(`${process.env.VUE_APP_API_URL}/post/` + post_id, formData)
                    .then(() =>{
                        this.updateSubmit = false
                        this.load()
                        this.formUpdate.judul =''
                        this.formUpdate.teks = ''
                        this.formUpdate.file = ''
                        this.formUpdate.foto = null
                        this.formUpdate.id_foto = null
                        this.updated = true
                        this.pesanUpdate = 'Unggahan berhasil diubah'
                        this.variant = 'success'
                        this.judulUpdateBlured = false
                        this.teksUpdateBlured = false
                        this.validUpdate = false
                    })
                } catch(err){
                    console.log(err)
                    this.updated = false
                    this.pesanUpdate = 'Unggahan gagal diubah'
                    this.variant = 'danger'

                    // this.error = true;
                }
            }
        },
        toggleModal(){
            this.updateSubmit = !this.updateSubmit;  
        },
        toggleShow(id){
            this.delPost = id;
            this.popupDel = !this.popupDel;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },
    }
}
</script>

<style scoped>
.left-col{
    border-radius: 15px;
    max-height: 70%;
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
.edit-foto{
    top: unset;
    left: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 30px;
    height: 30px;
    z-index: 10;
    background-color: grey;
    color: white;
    border-radius: 50%;
    margin-bottom: 20%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.edit-foto:hover{
    background-color: #D65A40;
    color: white; 
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
    max-width: 500px;
}
.icons{
    color: grey;
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
.forms-inputs, .forms-textarea {
    position: relative;
}
.forms-inputs span {
    position: absolute;
    top: -18px;
    left: 10px;
    background-color: #fff;
    padding: 5px 10px;
}
.forms-inputs input, textarea {
    border: 2px solid #9D9493;
    border-radius:10px;
}
.forms-inputs input:focus, textarea:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #D65A40;
}
.btn-outline-orange2{
    color:#DDA18C;
    font-weight:400;
    border: 1px solid #DDA18C ;
    min-width: 4rem;
    background: white;
}
.bg-light-orange{
    background-color: grey;
}
.bg-light-orange:hover, .bg-light-orange:focus{
    background-color: #D65A40;
}
.bg-light-orange2:hover,.btn-outline-orange2:hover{
    color:white;
    background-color: #D65A40;
    border-color: #D65A40;
}
.bg-light-orange2{
    color: white;
     background-color: #DDA18C;
    font-weight:400;
    border: 1px solid #DDA18C;
    min-width: 4rem;
}
@media (max-width: 991.98px) {
    .bg-light-orange{
        font-size: 70%;
    }
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
        font-size: 90%;
    }
    .img-poster-post{
        display: flex;
        justify-content: center;
        max-height: 600px;
        max-width: 300px;
    }
    .card-text-dum{
        font-size: 70%;
    }
    .card-text-dum-tit{
        font-size: 80%;
    }
    .forms-inputs input {
        padding-top: 5px;
        height: 50px;
        font-size: 90%;
    }
    textarea{
        padding-top: 5px;
        max-height: 70px;
        font-size: 90%;
    }
    .postingan h6{
        font-size: 90%;
    }
} 
@media (max-width: 360px){
    .img-poster-post{
        display: flex;
        justify-content: center;
        max-height: 350px;
        max-width: 200px;
    }
}
</style>