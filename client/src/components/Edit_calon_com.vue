<template>
  <div class="container">
        <div class="row d-flex m-1">
            <div class="flex-row justify-content-center text-center">
                <h5 class="bold justify-content-start mb-4 mt-4">Edit Profil Calon</h5>
            </div>
            <div class="flex-row d-block flex-wrap">
                <div class="form-data mb-3">
                    <form @submit.prevent="updateCalon">              
                        <div class="d-flex flex-column">
                            <h6 class="bold mb-3">Ubah foto calon</h6>
                            <img :src="calon.foto" alt="">
                            <div class="d-flex flex-column mb-3">
                                <div>
                                    <input type="file" id="inputFoto" style="display:none" ref="updateFoto" @change="selectImage()"/>
                                    <button class="btn bg-light-orange br-10" @click="addFoto()">Pilih foto</button>
                                    <span class="ms-2" v-if="file">{{file.name}}</span>
                                    <span class="ms-2" v-if="errorImg" style="color:red">- {{message}}</span>
                                </div>
                                <div v-if="file" class="mt-3 d-flex flex-wrap">
                                    <div class="fotoBorder d-flex flex-row">
                                        <img :src="urlFile" alt="preview foto" style="width:250px; height:250px">
                                        <span @click="file=''; errorImg = false"><font-awesome-icon icon="fa-solid fa-xmark" class="ms-2"/></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Simpan perubahan foto</button>
                        </div>
                    </form>
                </div>
                <div class="form-data mb-4 mt-5">
                    <h6 class="bold mb-3">Riwayat pekerjaan calon</h6>
                    <button class="btn bg-light-orange br-10" @click="changePekerjaan = false"><font-awesome-icon icon="fa-solid fa-plus" class="me-2" />Tambah Data</button>
                    <button class="btn bg-light-orange br-10 ms-3" @click="changePekerjaan = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-2"/>Ubah Data</button>
                    <form @submit.prevent="updatePekerjaan" class="mt-4" v-show="!changePekerjaan">              
                        <div class="forms-inputs mb-4">  
                            <span>Nama pekerjaan</span> 
                            <input id="nama_pekerjaan" autocomplete="off" type="text" v-model="pekerjaan.nama_pekerjaan" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pekerjaan.nama_pekerjaan) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama pekerjaan disini">
                            <div class="invalid-feedback">Nama pekerjaan tidak boleh kosong</div>
                        </div>
                        <div class="forms-inputs mb-4">  
                            <span>Detail pekerjaan</span> 
                            <input id="nama_pekerjaan" autocomplete="off" type="text" v-model="pekerjaan.detail" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pekerjaan.detail) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik detail pekerjaan disini">
                            <div class="invalid-feedback">Detail pekerjaan tidak boleh kosong</div>
                        </div>
                        <div class="forms-inputs mb-4">  
                            <span>Tahun mulai pekerjaan</span> 
                            <input id="nama_pekerjaan" autocomplete="off" type="text" v-model="pekerjaan.tahun_mulai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pekerjaan.tahun_mulai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun mulai pekerjaan disini">
                            <div class="invalid-feedback">Tahun mulai pekerjaan tidak boleh kosong</div>
                        </div>
                        <div class="forms-inputs mb-4">  
                            <span>Tahun selesai pekerjaan</span> 
                            <input id="nama_pekerjaan" autocomplete="off" type="text" v-model="pekerjaan.tahun_selesai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pekerjaan.tahun_selesai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun selesai pekerjaan disini">
                            <div class="invalid-feedback">Tahun selesai tidak boleh kosong</div>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Unggah riwayat pekerjaan</button>
                        </div>
                    </form>
                    <table class="table" v-show="changePekerjaan">
                        <thead>
                            <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nama pekerjaan</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Tahun mulai</th>
                            <th scope   ="col">Tahun selesai</th>
                            <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-data mb-4 mt-5">
                    <h6 class="bold mb-3">Riwayat pendidikan calon</h6>
                    <button class="btn bg-light-orange br-10" @click="changePendidikan = false"><font-awesome-icon icon="fa-solid fa-plus" class="me-2" />Tambah Data</button>
                    <button class="btn bg-light-orange br-10 ms-3" @click="changePendidikan = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-2"/>Ubah Data</button>
                    <form @submit.prevent="updatePendidikan" class="mt-4" v-show="!changePendidikan">              
                        <div class="forms-inputs mb-4">  
                            <span>Nama institusi</span> 
                            <input id="nama_institusi" autocomplete="off" type="text" v-model="pendidikan.nama_institusi" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pendidikan.nama_institusi) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama institusi disini">
                            <div class="invalid-feedback">Nama institusi tidak boleh kosong</div>
                        </div>
                        <div class="forms-inputs mb-4">  
                            <span>Detail pendidikan</span> 
                            <input id="detail_pendidikan" autocomplete="off" type="text" v-model="pendidikan.detail" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pendidikan.detail) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik detail pendidikan disini">
                            <div class="invalid-feedback">Detail pendidikan tidak boleh kosong</div>
                        </div>
                        <div class="forms-inputs mb-4">  
                            <span>Tahun mulai pendidikan</span> 
                            <input id="mulai_pendidikan" autocomplete="off" type="text" v-model="pendidikan.tahun_mulai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pendidikan.tahun_mulai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun mulai pendidikan disini">
                            <div class="invalid-feedback">Tahun mulai pendidikan tidak boleh kosong</div>
                        </div>
                        <div class="forms-inputs mb-4">  
                            <span>Tahun selesai pendidikan</span> 
                            <input id="selesai_pendidikan" autocomplete="off" type="text" v-model="pendidikan.tahun_selesai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pendidikan.tahun_selesai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun selesai pendidikan disini">
                            <div class="invalid-feedback">Tahun selesai pendidikan boleh kosong</div>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Unggah riwayat pendidikan</button>
                        </div>
                    </form>
                    <table class="table" v-show="changePendidikan">
                        <thead>
                            <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nama pekerjaan</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Tahun mulai</th>
                            <th scope   ="col">Tahun selesai</th>
                            <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-data mb-3 mt-5">
                    <form @submit.prevent="updatePoster">              
                        <div class="d-flex flex-column">
                            <h6 class="bold mb-3">Ubah poster calon</h6>
                            <div class="d-flex align-items-center mb-3">
                                <input type="file" id="inputPoster" style="display:none" ref="updatePoster" @change="selectPoster()"/>
                                <button class="btn bg-light-orange br-10" @click="addPoster()">Pilih poster</button>
                                <span class="ms-2">Nama file</span>
                                <span class="ms-2" style="color:red">- error message</span>
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Simpan perubahan poster</button>
                        </div>
                    </form>
                </div>


            </div>
            <!-- <div class="mb-4">
                <span>Ingin menghapus akun?</span> <a style="color:#D65A40;cursor:pointer" @click="toggleDel()">Hapus akun</a>
            </div>
            <Popup v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Akun yang sudah dihapus tidak dapat dikembalikan tanpa registasi ulang"> 
                <div class="d-flex justify-content-end">
                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDel()">Tidak</button>
                    <button class="btn-outline-orange2" @click="del()">Iya</button>
                </div>
            </Popup> -->
            <Alert v-if="updated" :variantName="variant" :messageProps="pesanUpdate"/>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Popup from './Berhasil.vue'
import Alert from './Pop_sukses.vue'

export default {
    name:'Edit_calon_com',
    components: {
        // Popup,
        Alert
    },
    data: function () {
        return {
            calon: {
                id_calon: '',
                foto: '',
                id_foto: '',
            },
            file: '',
            isiBlured: false,
            pekerjaan: {
                nama_pekerjaan:'',
                detail: '',
                tahun_mulai: '',
                tahun_selesai: ''
            },
            pendidikan: {
                nama_institusi:'',
                detail: '',
                tahun_mulai: '',
                tahun_selesai: ''
            },
            updatePekerjaan: {
                nama_pekerjaan:'',
                detail: '',
                tahun_mulai: '',
                tahun_selesai: ''
            },
            updatePendidikan: {
                nama_institusi:'',
                detail: '',
                tahun_mulai: '',
                tahun_selesai: ''
            },
            posters: {
                poster: null,
                id_poster: null,
                slogan:''
            },
            filePoster: '',
            admin:{
                username:'',
                password:'',
            },
            confirmPassword: '',
            passwordBlured: false,
            changePekerjaan: false,
            changePendidikan: false,
            urlFile: null,
            urlPoster: null,
            errorImg: false,
            message:'',
            variant:'',
            updated: false,
            pesanUpdate: ''
        }
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
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
    },
    methods:{
        validate : function(){
            this.isiBlured = true;
            if(this.validIsi(this.user.username)){
                this.valid = true;
            }
        },
        validIsi : function(uname) {
            if(uname.length > 0){
                return true;
            }
        },
        addFoto(){
            document.getElementById('inputFoto').click();
            this.errorImg = false
            this.message = ''
            this.messageImg = ''
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
        selectImage(){
            this.file = this.$refs.updateFoto.files[0];
            this.urlFile = URL.createObjectURL(this.file)
            this.validateImage(this.file)

            if(this.message !== ''){
                this.errorImg = true
                // this.form.foto = ''
                   console.log(this.message)
            }
        },

        updateCalon(e){
            e.preventDefault()
            const id_calon = this.calon.id_calon
            const imgCalon = this.file
            const foto = this.calon.foto

            const formData = new FormData();
            
            if(imgCalon == ''){
                if(foto != null) {
                    formData.append('foto', this.calon.foto);
                    formData.append('id_foto', this.calon.id_foto);
                }
                else{
                    formData.append('foto', null);
                    formData.append('id_foto', null);
                }
            }
            else{
                formData.append('imgCalon', this.file);
            }

            try {
                return axios.put(`${process.env.VUE_APP_API_URL}/calon/` + id_calon, formData)
                .then(() =>{
                    this.file = ''
                    this.calon.foto = ''
                    this.calon.id_foto = ''
                    this.updated = true
                    this.pesanUpdate = 'Unggahan berhasil diubah'
                    this.variant = 'success'
                })
            } catch(err){
                console.log(err)
                this.updated = false
                this.pesanUpdate = 'Unggahan gagal diubah'
                this.variant = 'danger'

                // this.error = true;
            }
        },
        

    }
}
</script>

<style scoped>
.fotoBorder{
    border: 1px solid #282626;
    border-radius: 15px;
    padding: 1%;
}
h4,p,a{
    color: black;
}
p{
    color: black;
    font-size: 20px;
}
.col-md{
    color: black;
    display: flex;
    justify-content: center;
    padding: 3rem;
}
.br-15{
    border: 2px solid #DDA18C;
}
.forms-inputs {
    color: black;
    position: relative
}
.forms-inputs span {
    position: absolute;
    top: -18px;
    left: 10px;
    background-color: #fff;
    padding: 5px 10px;
    z-index: 10;
}
.forms-inputs input {
    height: 50px;
    border: 2px solid #9D9493;
    border-radius:10px;
}
.forms-inputs input:focus,.showPass:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #D65A40;
}
.btn {
    height: 40px;
}
.success-data {
    display: flex;
    flex-direction: column;
}
.bxs-badge-check {
    font-size: 90px
}
.showPass{
    height: 50px;
    background: none;
    border: 2px solid #9D9493;
    border-left: 0px;
    border-radius:10px;
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