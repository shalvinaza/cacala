<template>
  <div class="container">
        <div class="row d-flex m-1">
            <div class="flex-row justify-content-center text-center">
                <h5 class="bold justify-content-start mb-4 mt-4">Edit Profil Calon</h5>
            </div>
            <div class="flex-row d-block flex-wrap">
                <div class="form-data mb-3">
                    <form @submit.prevent="updateCalon" enctype="multipart/form-data">              
                        <div class="d-flex flex-column">
                            <h6 class="bold mb-3">Ubah foto calon</h6>
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
                    <form @submit.prevent="addPekerjaan" class="mt-4" v-show="!changePekerjaan">              
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
                            <input id="nama_pekerjaan" autocomplete="off" type="number" min="1970" max="2022" v-model="pekerjaan.tahun_mulai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pekerjaan.tahun_mulai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun mulai pekerjaan disini">
                            <div class="invalid-feedback">Tahun mulai pekerjaan tidak boleh kosong</div>
                        </div>
                        <div class="forms-inputs mb-4">  
                            <span>Tahun selesai pekerjaan</span> 
                            <input id="nama_pekerjaan" autocomplete="off" type="number" min="1970" max="2022" v-model="pekerjaan.tahun_selesai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(pekerjaan.tahun_selesai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun selesai pekerjaan disini">
                            <div class="invalid-feedback">Tahun selesai tidak boleh kosong</div>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Unggah riwayat pekerjaan</button>
                        </div>
                    </form>
                    <table class="table" v-show="changePekerjaan">
                        <thead>
                            <tr>
                            <th scope="col">Nama pekerjaan</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Tahun mulai</th>
                            <th scope="col">Tahun selesai</th>
                            <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody v-for="calon in calon" :key="calon.id_calon">
                            <tr v-for="pkr in calon.riwayat_pekerjaan" :key="pkr.id_pekerjaan">
                                <td>{{pkr.nama_pekerjaan}}</td>
                                <td>{{pkr.detail_pekerjaan}}</td>
                                <td>{{pkr.tahun_mulai_pekerjaan}}</td>
                                <td>{{pkr.tahun_selesai_pekerjaan}}</td>
                                <td>                                        
                                    <span class="card-text icons me-2" @click="editPek(pkr)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                    <span class="card-text icons" @click="toggleDelPek(pkr.id_pekerjaan)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                                </td>
                                <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Riwayat pekerjaan yang akan dihapus tidak dapat dikembalikan"> 
                                    <div class="d-flex justify-content-end">
                                        <button class="bg-light-orange2 me-2 br-10" @click="toggleDelPek(pkr.id_pekerjaan)">Tidak</button>
                                        <button class="btn-outline-orange2" @click="delPekerjaan()">Iya</button>
                                    </div>
                                </Popup2>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-data mb-4 mt-5">
                    <h6 class="bold mb-3">Riwayat pendidikan calon</h6>
                    <button class="btn bg-light-orange br-10" @click="changePendidikan = false"><font-awesome-icon icon="fa-solid fa-plus" class="me-2" />Tambah Data</button>
                    <button class="btn bg-light-orange br-10 ms-3" @click="changePendidikan = true"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-2"/>Ubah Data</button>
                    <form @submit.prevent="addPendidikan" class="mt-4" v-show="!changePendidikan">              
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
                            <th scope="col">Nama pekerjaan</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Tahun mulai</th>
                            <th scope   ="col">Tahun selesai</th>
                            <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody v-for="calon in calon" :key="calon.nama">
                            <tr v-for="pen in calon.riwayat_pendidikan" :key="pen.id_pendidikan">
                                <td>{{pen.nama_institusi}}</td>
                                <td>{{pen.detail_pendidikan}}</td>
                                <td>{{pen.tahun_mulai_pendidikan}}</td>
                                <td>{{pen.tahun_selesai_pendidikan}}</td>
                                <td>                                        
                                    <span class="card-text icons me-2" @click="editPen(pen)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                    <span class="card-text icons" @click="toggleDelPen(pen.id_pendidikan)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                                </td>
                                <Popup2 v-if="popupDel2" title="Apakah Anda yakin?" pesanPopup="Riwayat pendidikan yang akan dihapus tidak dapat dikembalikan"> 
                                    <div class="d-flex justify-content-end">
                                        <button class="bg-light-orange2 me-2 br-10" @click="toggleDelPen(pen.id_pendidikan)">Tidak</button>
                                        <button class="btn-outline-orange2" @click="delPendidikan()">Iya</button>
                                    </div>
                                </Popup2>
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

            <Popup v-if="pekUpdate" title="Edit Postingan" @toggle-modal="toggleModal">
                <form @submit.prevent="updateRiwPekerjaan" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama pekerjaan</span> 
                        <input id="nama_pekerjaan" autocomplete="off" type="text" v-model="updatePekerjaan.nama_pekerjaan" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(updatePekerjaan.nama_pekerjaan) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama pekerjaan disini">
                        <div class="invalid-feedback">Nama pekerjaan tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-4">  
                        <span>Detail pekerjaan</span> 
                        <input id="nama_pekerjaan" autocomplete="off" type="text" v-model="updatePekerjaan.detail" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(updatePekerjaan.detail) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik detail pekerjaan disini">
                        <div class="invalid-feedback">Detail pekerjaan tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-4">  
                        <span>Tahun mulai pekerjaan</span> 
                        <input id="nama_pekerjaan" autocomplete="off" type="number" min="1970" max="2022" v-model="updatePekerjaan.tahun_mulai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(updatePekerjaan.tahun_mulai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun mulai pekerjaan disini">
                        <div class="invalid-feedback">Tahun mulai pekerjaan tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-4">  
                        <span>Tahun selesai pekerjaan</span> 
                        <input id="nama_pekerjaan" autocomplete="off" type="number" min="1970" max="2022" v-model="updatePekerjaan.tahun_selesai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(updatePekerjaan.tahun_selesai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun selesai pekerjaan disini">
                        <div class="invalid-feedback">Tahun selesai tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah riwayat pekerjaan</button>
                    </div>
                </form>
            </Popup>

            <Popup v-if="penUpdate" title="Edit Postingan" @toggle-modal="toggleModal2">
                <form @submit.prevent="updateRiwPendidikan" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama institusi</span> 
                        <input id="nama_institusi" autocomplete="off" type="text" v-model="updatePendidikan.nama_institusi" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(updatePendidikan.nama_institusi) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama institusi disini">
                        <div class="invalid-feedback">Nama institusi tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-4">  
                        <span>Detail pendidikan</span> 
                        <input id="detail_pendidikan" autocomplete="off" type="text" v-model="updatePendidikan.detail" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(updatePendidikan.detail) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik detail pendidikan disini">
                        <div class="invalid-feedback">Detail pendidikan tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-4">  
                        <span>Tahun mulai pendidikan</span> 
                        <input id="mulai_pendidikan" autocomplete="off" type="text" v-model="updatePendidikan.tahun_mulai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(updatePendidikan.tahun_mulai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun mulai pendidikan disini">
                        <div class="invalid-feedback">Tahun mulai pendidikan tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-4">  
                        <span>Tahun selesai pendidikan</span> 
                        <input id="selesai_pendidikan" autocomplete="off" type="text" v-model="updatePendidikan.tahun_selesai" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(updatePendidikan.tahun_selesai) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik tahun selesai pendidikan disini">
                        <div class="invalid-feedback">Tahun selesai pendidikan boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah riwayat pendidikan</button>
                    </div>
                </form>
            </Popup>

            <Alert v-if="updated" :variantName="variant" :messageProps="pesanUpdate"/>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import Popup from './Popup.vue'
import Popup2 from './Berhasil.vue'
import Alert from './Pop_sukses.vue'

export default {
    name:'Edit_calon_com',
    components: {
        Popup,
        Popup2,
        Alert
    },
    data: function () {
        return {
            calon: {},
            file: '',
            isiBlured: false,
            pekerjaan: {
                id_calon: '',
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
                id_pekerjaan: '',
                nama_pekerjaan:'',
                detail: '',
                tahun_mulai: '',
                tahun_selesai: ''
            },
            updatePendidikan: {
                id_pendidikan:'',
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
            pesanUpdate: '',
            pekUpdate: false,
            penUpdate: false,
            id_pek: '',
            id_pen:'',
            popupDel: false,
            popupDel2: false
        }
    },
    created(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
        this.loadCalon()
    },
    mounted(){
        this.edit
    },
    computed:{
        idd: function () {
            const calon = this.calon
            let idyes = ''
            for(var i = 0; i < calon.length; i++){
                idyes = this.calon[i].id_calon
            }
            return idyes
        },
        updateFoto: function () {
            const calon = this.calon
            let foto = ''
            for(var i = 0; i < calon.length; i++){
                foto = this.calon[i].foto
            }
            return foto
        },
        updateIdFoto: function () {
            const calon = this.calon
            let id_foto = ''
            for(var i = 0; i < calon.length; i++){
                id_foto = this.calon[i].id_foto
            }
            return id_foto
        }
    },
    methods:{
        loadCalon(){
            const CALON_API_URL = `${process.env.VUE_APP_API_URL}/calon/admin`
            axios.defaults.headers.common["token"] = localStorage.token
            try {
                axios.get(CALON_API_URL)
                .then(result => {
                    this.calon = result.data
                    localStorage.setItem('id_calon', result.data.id_calon)
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        toggleModal(){
            this.pekUpdate = !this.pekUpdate;  
        },
        toggleModal2(){
            this.penUpdate = !this.penUpdate;  
        },
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
            this.file = this.$refs.updateFoto.files[0]
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
            const id_calon = this.idd
            const imgCalon = this.file
            const foto = this.updateFoto

            const formData = new FormData();
            
            if(imgCalon == ''){
                if(foto != null) {
                    formData.append('foto', this.updateFoto);
                    formData.append('id_foto', this.updateIdFoto);
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
                    this.updateFoto = ''
                    this.updateIdFoto = ''
                    this.updated = true
                    this.pesanUpdate = 'Foto berhasil diubah'
                    this.variant = 'success'
                })
            } catch(err){
                console.log(err)
                this.updated = false
                this.pesanUpdate = 'Foto gagal diubah'
                this.variant = 'danger'
                this.message = err.response.data

                // this.error = true;
            }
        },
        
        addPekerjaan(e){
            e.preventDefault()
            const ADD_JOB_API = `${process.env.VUE_APP_API_URL}/calon/riwayat-pekerjaan`
            try{
                axios.post(ADD_JOB_API, {
                    id_calon: this.idd,
                    nama_pekerjaan: this.pekerjaan.nama_pekerjaan,
                    detail: this.pekerjaan.detail,
                    tahun_mulai: this.pekerjaan.tahun_mulai,
                    tahun_selesai: this.pekerjaan.tahun_selesai
                })
                .then(()=>{
                    this.loadCalon()
                    this.changePekerjaan =  true
                    this.pekerjaan.nama_pekerjaan = ''
                    this.pekerjaan.detail = ''
                    this.pekerjaan.tahun_mulai = ''
                    this.pekerjaan.tahun_selesai = ''
                    this.updated = true
                    this.variant = 'success'
                    this.pesanUpdate = 'Riwayat pekerjaan berhasil ditambah'
                })
            } catch(err){
                console.log(err)
                this.updated = false
                this.pesanUpdate = 'Riwayat pekerjaan gagal diubah'
                this.variant = 'danger'
            }
        },

        toggleDelPek(id){
            this.id_pek = id;
            this.popupDel = !this.popupDel;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delPekerjaan(){
            const id_pekerjaan = this.id_pek;
            axios.delete(`${process.env.VUE_APP_API_URL}/calon/pek/`+ id_pekerjaan).then(() =>{
                this.popupDel = false
                this.loadCalon()
                this.changePekerjaan = true
                this.updated = true
                this.pesanUpdate = 'Riwayat pekerjaan berhasil dihapus'
                this.variant = 'success'
            })            
        },

        editPek(pek){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            // this.id_pekerjaan = pek.id_pekerjaan
            this.pekUpdate = true
            this.updatePekerjaan.id_pekerjaan = pek.id_pekerjaan
            this.updatePekerjaan.nama_pekerjaan = pek.nama_pekerjaan
            this.updatePekerjaan.detail = pek.detail_pekerjaan  
            this.updatePekerjaan.tahun_mulai = pek.tahun_mulai_pekerjaan
            this.updatePekerjaan.tahun_selesai = pek.tahun_selesai_pekerjaan           
        },

        updateRiwPekerjaan(e){
            const id_pek = this.updatePekerjaan.id_pekerjaan
            const UPDATE_PEKERJAAN_API = `${process.env.VUE_APP_API_URL}/calon/update-pek/` + id_pek
            e.preventDefault()
            try{
                axios.put(UPDATE_PEKERJAAN_API, {
                    id_pekerjaan: this.updatePekerjaan.id_pekerjaan,
                    nama_pekerjaan: this.updatePekerjaan.nama_pekerjaan,
                    detail: this.updatePekerjaan.detail,
                    tahun_mulai: this.updatePekerjaan.tahun_mulai,
                    tahun_selesai: this.updatePekerjaan.tahun_selesai
                })
                .then(()=>{
                    this.pekUpdate = false
                    this.loadCalon()
                    this.changePekerjaan = true
                    this.updated = true
                    this.pesanUpdate = 'Riwayat pekerjaan berhasil diubah'
                    this.variant = 'success'
                    this.updatePekerjaan.id_pekerjaan = ''
                    this.updatePekerjaan.nama_pekerjaan = ''
                    this.updatePekerjaan.detail = ''
                    this.updatePekerjaan.tahun_mulai = ''
                    this.updatePekerjaan.tahun_selesai = ''
                })
            }catch(err){
                console.log(err)
            }
        },

        addPendidikan(e){
            e.preventDefault()
            const ADD_JOB_API = `${process.env.VUE_APP_API_URL}/calon/riwayat-pendidikan`
            try{
                axios.post(ADD_JOB_API, {
                    id_calon: this.idd,
                    nama_institusi: this.pendidikan.nama_institusi,
                    detail: this.pendidikan.detail,
                    tahun_mulai: this.pendidikan.tahun_mulai,
                    tahun_selesai: this.pendidikan.tahun_selesai
                })
                .then(()=>{
                    this.loadCalon()
                    this.changePendidikan =  true
                    this.pendidikan.nama_pekerjaan = ''
                    this.pendidikan.detail = ''
                    this.pendidikan.tahun_mulai = ''
                    this.pendidikan.tahun_selesai = ''
                    this.updated = true
                    this.variant = 'success'
                    this.pesanUpdate = 'Riwayat pendidikan berhasil ditambah'
                })
            } catch(err){
                console.log(err)
                this.updated = false
                this.pesanUpdate = 'Riwayat pendidikan gagal diubah'
                this.variant = 'danger'
            }
        },

        toggleDelPen(id){
            this.id_pen = id;
            this.popupDel2 = !this.popupDel2;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delPendidikan(){
            const id_pendidikan = this.id_pen;
            axios.delete(`${process.env.VUE_APP_API_URL}/calon/pen/`+ id_pendidikan).then(() =>{
                this.popupDel = false
                this.loadCalon()
                this.changePendidikan = true
                this.updated = true
                this.pesanUpdate = 'Riwayat pendidikan berhasil dihapus'
                this.variant = 'success'
            })            
        },

        editPen(pen){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            // this.id_pekerjaan = pek.id_pekerjaan
            this.penUpdate = true
            this.updatePendidikan.id_pendidikan = pen.id_pendidikan
            this.updatePendidikan.nama_institusi = pen.nama_institusi
            this.updatePendidikan.detail = pen.detail_pendidikan  
            this.updatePendidikan.tahun_mulai = pen.tahun_mulai_pendidikan
            this.updatePendidikan.tahun_selesai = pen.tahun_selesai_pendidikan           
        },

        updateRiwPendidikan(e){
            const id_pen = this.updatePendidikan.id_pendidikan
            const UPDATE_PENDIDIKAN_API = `${process.env.VUE_APP_API_URL}/calon/update-pen/` + id_pen
            e.preventDefault()
            try{
                axios.put(UPDATE_PENDIDIKAN_API, {
                    id_pendidikan: this.updatePendidikan.id_pendidikan,
                    nama_institusi: this.updatePendidikan.nama_institusi,
                    detail: this.updatePendidikan.detail,
                    tahun_mulai: this.updatePendidikan.tahun_mulai,
                    tahun_selesai: this.updatePendidikan.tahun_selesai
                })
                .then(()=>{
                    this.penUpdate = false
                    this.loadCalon()
                    this.changePendidikan = true
                    this.updated = true
                    this.pesanUpdate = 'Riwayat pendidikan berhasil diubah'
                    this.variant = 'success'
                    this.updatePendidikan.id_pendidikan = ''
                    this.updatePendidikan.nama_institusi = ''
                    this.updatePendidikan.detail = ''
                    this.updatePendidikan.tahun_mulai = ''
                    this.updatePendidikan.tahun_selesai = ''
                })
            }catch(err){
                console.log(err)
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