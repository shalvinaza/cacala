<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 left-col d-flex justify-content-center">
                <div class="p-4 br-15" style="background: #EDEDE9; max-height:1430px">
                    <img :src=calon.foto class="profil-calon-detail mb-4" alt="dpr 2">
                    <h5 class="text-center">{{calon.nama}}</h5>
                    <p class="mb-5 text-center">Calon {{calon.jabatan_tujuan}}</p>
                    <div class="row align-items-start">
                        <h6 class="col">Partai</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <img v-for="(partai) in calon.partai" :key="partai.nama_partai" :src=partai.logo_partai class="img-partai m-1">
                        </div>
                    </div>
                    <div class="row align-items-start">
                        <h6 class="col">Daerah Pilih</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <p>{{calon.kota}}</p>
                        </div>
                    </div>
                    <div class="row align-items-start end-row-section">
                        <h6 class="col">Nomor Urut</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <p>1</p>
                        </div>
                    </div>
                    <div class="mt-4 pb-3 end-row-section">
                        <h5 class="mb-3">Riwayat Pendidikan</h5>
                        <div class="mb-3" v-for="(pendidikan) in calon.riwayat_pendidikan" :key="pendidikan.id_pendidikan">
                            <h6>{{pendidikan.nama_institusi}}</h6>
                            <p class="mb-2">{{pendidikan.detail_pendidikan}}</p>
                            <i class="far fa-calendar-alt"></i> <span>{{pendidikan.tahun_mulai_pendidikan}}</span> - <span>{{pendidikan.tahun_selesai_pendidikan}}</span>
                        </div>
                    </div>
                    <div class="mt-4 pb-3">
                        <h5 class="mb-3">Riwayat Pekerjaan</h5>
                        <div v-for="(pekerjaan) in calon.riwayat_pekerjaan" :key="pekerjaan.id_pekerjaan">
                            <h6>{{pekerjaan.nama_pekerjaan}}</h6>
                            <p class="mb-2">{{pekerjaan.detail_pekerjaan}}</p>
                            <i class="far fa-calendar-alt"></i> <span>{{pekerjaan.tahun_mulai_pekerjaan}}</span> - <span>{{pekerjaan.tahun_selesai_pekerjaan}}</span>
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
                        <p class="card-text me-3 w-100">{{calon.slogan}}</p>
                            <span class="card-text icons"><i class="fas fa-edit"></i></span>
                        </div>
                    </div>
                    <div class="p-4">
                        <!-- part create post -->
                        <!-- <button type="button" class="btn bg-light-orange br-10 mb-3 d-md-block">Mulai siaran langsung</button> -->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center mb-4">Apa kabar tebaru dari Anda?</h5>
                                <form @submit.prevent="addPost" enctype="multipart/form-data">
                                    <div class="forms-inputs mb-4"> 
                                        <span>Judul unggahan</span> 
                                        <input class="w-100 p-3" autocomplete="off" type="text" v-model="form.judul" placeholder="Ketik judul di sini">
                                    </div>
                                    <div class="forms-inputs mb-3"> 
                                        <span>Teks unggahan</span>
                                        <textarea class="w-100 p-3" autocomplete="off" v-model="form.teks" placeholder="Ketik teks di sini"></textarea>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span class="card-text icons me-3">
                                            <input multiple type="file" id="inputFoto" style="display:none" ref="foto" @change="selectImage()"/><font-awesome-icon icon="fa-solid fa-images" @click="addFoto()"/>
                                        </span>
                                        <span class="card-text icons flex-grow-2 w-100">
                                            <input type="file" id="inputVideo" style="display:none" ref="video" @change="selectVideo()"/><font-awesome-icon icon="fa-solid fa-video" @click="addVideo()"/>
                                        </span>

                                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button> 
                                    </div>
                                    <div class="d-flex flex-column field">
                                        <div v-for="(file,index) in files" :key="index" :class="`level ${file.invalidMessage && 'has-text-danger'}`">
                                            <div class="level-left">
                                                <div class="level-item">
                                                    {{file.name}}
                                                    <span v-if="file.invalidMessage">&nbsp;- {{file.invalidMessage}}</span>
                                                </div>
                                            </div>
                                            <div class="level-right">
                                                <div class="level-item">
                                                    <font-awesome-icon icon="fa-solid fa-xmark" class="delete" @click.prevent="files.splice(index,1);form.foto.splice(index,1)"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
      
                                </form>                      
                            </div>
                        </div> 

                        <div
                            v-if="message"
                            :class="`message ${error ? 'is-danger' : 'is-success'}`"
                        >
                            <div class="message-body mb-3">{{message}}</div>
                        </div> 

                        <Popup v-if="updateSubmit" title="Edit Postingan" @toggle-modal="toggleModal">
                                <form>
                                    <div class="forms-inputs mb-4"> 
                                        <span>Judul unggahan</span> 
                                        <input class="w-100 p-3" autocomplete="off" type="text" v-model="formUpdate.judul" placeholder="Ketik judul di sini">
                                    </div>
                                    <div class="forms-inputs mb-3"> 
                                        <span>Teks unggahan</span>
                                        <textarea class="w-100 p-3" autocomplete="off" v-model="formUpdate.teks" placeholder="Ketik teks di sini"></textarea>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span class="card-text icons me-3"><font-awesome-icon icon="fa-solid fa-images" /></span>
                                        <span class="card-text icons flex-grow-2 w-100"><font-awesome-icon icon="fa-solid fa-video" /></span>
                                        <button type="submit" class="btn bg-light-orange br-10" @click="update(formUpdate)">Perbarui</button>
                                    </div>
                                </form>  
                        </Popup>
                        <!-- posts just text-->
                        <span v-for="post in posts"  :key="post.id_post">
                            <div class="card w-100 postingan p-3 mb-3">
                                <div class="card-body p-0">
                                    <h5 class="card-title text-center">{{post.judul}}</h5>
                                    <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                        <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>{{post.waktu}}</small></p>
                                        <span class="card-text icons me-2" @click="edit(post)" ><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                        <span class="card-text icons" @click="toggleShow(post.id_post)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                                        <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Unggahan yang akan dihapus tidak dapat dikembalikan"> 
                                            <div class="d-flex justify-content-end">
                                                <button class="bg-light-orange2 me-2 br-10" @click="toggleShow(post.id_post)">Tidak</button>
                                                <button class="btn-outline-orange2" @click="del()">Iya</button>
                                            </div>
                                        </Popup2>
                                    </div>
                                    <!-- <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="..."> -->
                                    <p class="card-text">{{post.teks}}</p>
                                </div>
                            </div>
                        </span>
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                    <span class="card-text icons"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                </div>
                                <!-- <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="..."> -->
                                <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                        <!-- post with just image or video-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                    <span class="card-text icons"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                </div>
                                <img src="../assets/images/poster_post2.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                <!-- <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p> -->
                            </div>
                        </div>                        
                        <!-- post with image and text -->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                    <span class="card-text icons"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                </div>
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
import Popup from './Popup.vue'
import Popup2 from './Berhasil.vue'
import axios from 'axios'
import _ from 'lodash'

const CALON_API_URL = `${process.env.VUE_APP_API_URL}/calon/admin`

export default {
    name :'Post_detail_calon',
    components:{
        Popup,
        Popup2
    },
    data: function () {
        return {
             calon: "",
             posts: [],
             form : {
                 judul:'',
                 waktu:'',
                 teks:'',
                 foto: [],
                 video:''
             },
             files:[],
            formUpdate : {
                 judul:'',
                 waktu:'',
                 teks:'',
                 foto: [],
                 video:''
             },
             updateSubmit: false,
             popupDel: false,
             delPost: '',
             message: '',
             error: false
        }   
    },
    mounted(){
        const headers = { token: localStorage.token }
        fetch(CALON_API_URL, { headers })
            .then(response => response.json())
            .then(result => {
                this.calon = result
                var parsedobj = JSON.parse(JSON.stringify(result))
                console.log(parsedobj)
            })
        this.load()
    },
    methods: {
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
        addFoto(){
            document.getElementById('inputFoto').click();
        },
        addVideo(){
            document.getElementById('inputVideo').click();
        },
        selectImage(){
            try{
                const fotos = this.$refs.foto.files;
                this.form.foto = [ ...this.form.foto, ...fotos];

                this.files = [
                    ...this.files,
                    ..._.map(fotos, file => ({
                        name: file.name,
                        size:file.size,
                        type: file.type,
                        invalidMessage: this.validateImage(file)
                    }))
                ]
            }catch(err){
                console.log(err)
            }
        },

        validateImage(file){
            const MAX_SIZE = 200000;
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

            if(file.size > MAX_SIZE){
                return `File terlalu besar. Besar file maksimal ${MAX_SIZE / 1000}Kb`;
            }
            if(!allowedTypes.includes(file.type)){
                return "Hanya boleh memilih gambar";
            }

            return "";
        },
        selectVideo(){
            this.form.video = this.$refs.video.files[0];
            this.error = false;
            this.message = '';
        },
        async addPost(){
            const POST_POSTS_API_URL = `${process.env.VUE_APP_API_URL}/post/`
            const formData = new FormData();

            formData.append('judul', this.form.judul);
            formData.append('teks', this.form.teks);
            formData.append('waktu', this.form.waktu);

            _.forEach(this.form.foto, file => {
                if(this.validateImage(file) === ""){
                    formData.append('foto', file);
                }
            });
            try {
                axios.defaults.headers.common["token"] = localStorage.token
                await axios.post(POST_POSTS_API_URL, formData);
                this.message = "Berhasil diunggah";
                this.load()
                this.files = [];
                this.form.judul =''
                this.form.waktu = ''
                this.form.teks = ''
                this.form.foto = []
                this.form.video = ''
                this.error = false
            }catch(err){
                this.message = err.response.data.error;
                this.error = true;
            }
            // try{
            //     axios.post(POST_POSTS_API_URL,this.form)
            //         this.load()
            //         this.message = "Unggahan berhasil dikirim"
            //         this.form.judul =''
            //         this.form.waktu = ''
            //         this.form.teks = ''
            //         this.form.foto = []
            //         this.form.video = ''
            //         this.error = false
            // } catch(err) {
            //     this.message = err.response.data.error
            //     this.error = true
            //     // console.log(err)
            // }
        },
        del(form){
            const post_id = this.delPost;
            axios.delete(`${process.env.VUE_APP_API_URL}/post/`+ post_id).then(() =>{
                this.popupDel = false
                this.load()
                let index = this.posts.indexOf(form.name)
                this.posts.splice(index,1)
            })            
        },
        edit(post){
            this.updateSubmit = true
            axios.get(`${process.env.VUE_APP_API_URL}/post/`+ post.id_post).then(() =>{
                this.formUpdate.id = post.id_post
                this.formUpdate.judul = post.judul
                this.formUpdate.teks = post.teks
                this.formUpdate.foto = post.foto
                this.formUpdate.video = post.video
                
            })  
        },
        update(formUpdate){
            axios.defaults.headers.common["token"] = localStorage.token
            return axios.put(`${process.env.VUE_APP_API_URL}/post/` + formUpdate.id, {
                judul : this.formUpdate.judul,
                waktu : this.formUpdate.waktu,
                teks : this.formUpdate.teks,
                foto : this.formUpdate.foto,
                video : this.formUpdate.video
            })
            .then(() =>{
                this.updateSubmit = false
                this.load()
                this.formUpdate.judul =''
                this.formUpdate.waktu = ''
                this.formUpdate.teks = ''
                this.formUpdate.foto = []
                this.formUpdate.video = ''
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        toggleModal(){
            this.updateSubmit = !this.updateSubmit;  
        },
        toggleShow(id){
            this.delPost = id;
            this.popupDel = !this.popupDel;
        },
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
    max-width: 22px;
    max-height: 22px;
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
    max-height: 800px;
}
.icons{
    color: #DDA18C;
}
.icons:hover,.icons:active{
    color: #D65A40;
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
</style>