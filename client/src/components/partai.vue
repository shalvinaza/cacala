<template>
  <div class="container">
        <div class="row d-flex m-1">
            <div class="flex-row justify-content-center text-center">
                <h5 class="bold justify-content-start mb-4 mt-4">Daftar Partai</h5>
            </div>
            <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Partai</h6>
                <div class="form-data mb-3 mt-5">
                    <form @submit.prevent="addPartai" enctype="multipart/form-data">              
                        <div class="d-flex flex-column">
                            <div class="forms-inputs mb-4">  
                                <span>Nama Partai</span> 
                                <input id="partai" autocomplete="off" type="text" v-model="partaii" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(partaii) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama partai disini">
                                <div class="invalid-feedback">Nama partai tidak boleh kosong</div>
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <div class="d-flex flex-column mb-3">
                                <div>
                                    <input type="file" id="inputLogo" style="display:none" ref="logo_partai" @change="selectLogo()"/>
                                    <button class="btn bg-light-orange br-10" @click="addLogo()">Pilih poster</button>
                                    <span class="ms-2" v-if="file">{{file.name}}</span>
                                    <span class="ms-2" v-if="errorImg" style="color:red">- {{message}}</span>
                                </div>
                                <div v-if="file" class="mt-3 d-flex flex-wrap">
                                    <div class="fotoBorder d-flex flex-row">
                                        <img :src="urlLogo" alt="preview foto" style="width:250px; height:250px">
                                        <span @click="file=''; errorImg = false"><font-awesome-icon icon="fa-solid fa-xmark" class="ms-2"/></span>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                        </div>
                    </form>
                </div>
                <table class="table mt-4">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama Partai</th>
                        <th scope="col">Logo Partai</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="par in partai" :key="par.id_partai">
                            <td>{{par.id_partai}}</td>
                            <td>{{par.nama_partai}}</td>
                            <td><img :src="par.logo_partai" alt="" style="width:30px; height: 30px"></td>
                            <td>                                        
                                <span class="card-text icons me-2" @click="editPar(par)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                <span class="card-text icons" @click="toggleDelPar(par.id_partai)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                            </td>
                            <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Partai yang akan dihapus tidak dapat dikembalikan"> 
                                <div class="d-flex justify-content-end">
                                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDelPar(par.id_partai)">Tidak</button>
                                    <button class="btn-outline-orange2" @click="delPartai()">Iya</button>
                                </div>
                            </Popup2>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Popup v-if="parUpdate" title="Edit Partai" @toggle-modal="toggleModal">
                    <form @submit.prevent="updatePartai" enctype="multipart/form-data">              
                        <div class="d-flex flex-column">
                            <div class="forms-inputs mb-4">  
                                <span>Nama Partai</span> 
                                <input id="partai" autocomplete="off" type="text" v-model="updatePartaii" v-bind:class="{'form-control':true, 'is-invalid' : !validasiUpdate(updatePartaii) && updateBlured}" v-on:blur="updateBlured = true" @keydown.enter.prevent placeholder="Ketik nama partai disini">
                                <div class="invalid-feedback">Nama partai tidak boleh kosong</div>
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <div class="d-flex flex-column mb-3">
                                <div>
                                    <input type="file" id="inputLogoUpdate" style="display:none" ref="logoUpdate" @change="selectLogoUpdate()"/>
                                    <button class="btn bg-light-orange br-10" @click="addLogoUpdate()" type="button">Pilih poster</button>
                                    <span class="ms-2" v-if="fileUpdate">{{fileUpdate.name}}</span>
                                    <span class="ms-2" v-if="errorImg" style="color:red">- {{message}}</span>
                                </div>
                                <div v-if="fileUpdate" class="mt-3 d-flex flex-wrap">
                                    <div class="fotoBorder d-flex flex-row">
                                        <img :src="urlLogoUp" alt="preview foto" style="width:250px; height:250px">
                                        <span @click="fileUpdate=''; errorImg = false"><font-awesome-icon icon="fa-solid fa-xmark" class="ms-2"/></span>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Perbarui</button>
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
            partai: [],
            isiBlured: false,
            partaii: '',
            logo_partai:'',
            id_logo:'',
            file:'',
            updatePartaii: '',
            updateLogo: '',
            updateIdLogo: '',
            idUpdatePartai: '',
            fileUpdate:'',
            variant:'',
            updated: false,
            pesanUpdate: '',
            parUpdate: false,
            popupDel: false,
            id_partai:'',
            validUpdate: false,
            updateBlured: false,
            urlLogo: '',
            urlLogoUp:'',
            
        }
    },
    created(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
        this.loadPartai()
    },
    methods:{
        loadPartai(){
            const JABATAN_API_URL = `${process.env.VUE_APP_API_URL}/partai`
            try {
                axios.get(JABATAN_API_URL)
                .then(result => {
                    this.partai = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        toggleModal(){
            this.parUpdate = !this.parUpdate;  
        },
        validate : function(){
            this.isiBlured = true;
            if(this.validIsi(this.partaii) && this.validLogo(this.file)){
                this.valid = true;
            }
        },
        validIsi : function(par) {
            if(par.length > 0){
                return true;
            }
        },

        validLogo(logo){
            if(logo != ''){
                return true
            }
        },

        validateUpdate : function(){
            this.updateBlured = true;
            if(this.validasiUpdate(this.updatePartaii)){
                this.validUpdate = true;
            }
        },

        validasiUpdate : function(par) {
            if(par.length > 0){
                return true;
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

        addLogo(){
            document.getElementById('inputLogo').click();
            this.errorImg = false
            this.message = ''
            this.messageImg = ''
        },

        selectLogo(){
            this.file = this.$refs.logo_partai.files[0]
            this.urlLogo = URL.createObjectURL(this.file)
            this.validateImage(this.file)

            if(this.message !== ''){
                this.errorImg = true
                // this.form.foto = ''
                   console.log(this.message)
            }
        },  

        addLogoUpdate(){
            document.getElementById('inputLogoUpdate').click();
            this.errorImg = false
            this.message = ''
            this.messageImg = ''
        },

        selectLogoUpdate(){
            this.fileUpdate = this.$refs.logoUpdate.files[0]
            this.urlLogoUp = URL.createObjectURL(this.fileUpdate)
            this.validateImage(this.fileUpdate)

            if(this.message !== ''){
                this.errorImg = true
                // this.form.foto = ''
                   console.log(this.message)
            }
        },        
        
        async addPartai(e){
            const VUE_APP_API_URL = `${process.env.VUE_APP_API_URL}/partai`
            e.preventDefault()
            this.validate()
            if(this.valid){

                const formData = new FormData();

                formData.append('nama_partai', this.partaii);
                formData.append('imgPartai', this.file);
                try {
                    await axios.post(VUE_APP_API_URL, formData);
                    this.loadPartai()
                    this.partaii = ''
                    this.file = ''
                    this.updated = true
                    this.variant = 'success'
                    this.pesanUpdate = 'Berhasil membuat unggahan baru'
                    this.isiBlured = false
                    this.valid = false
                }catch(err){
                    console.log(err)
                }
            }
        },

        toggleDelPar(id){
            this.id_partai = id;
            this.popupDel = !this.popupDel;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delPartai(){
            const id_partai = this.id_partai;
            axios.delete(`${process.env.VUE_APP_API_URL}/partai/`+ id_partai).then(() =>{
                this.popupDel = false
                this.loadPartai()
                this.updated = true
                this.pesanUpdate = 'Partai berhasil dihapus'
                this.variant = 'success'
            })            
        },

        editPar(par){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            this.parUpdate = true
            this.idUpdatePartai= par.id_partai
            this.updatePartaii = par.nama_partai
            this.updateLogo = par.logo_partai
            this.updateIdLogo = par.id_logo    
        },

        updatePartai(e){
            const id_partai = this.idUpdatePartai
            e.preventDefault()
            const newLogo = this.fileUpdate
            const oldLogo = this.updateLogo
            this.validateUpdate()

            if(this.validUpdate){
                const formData = new FormData();

                formData.append('nama_partai', this.updatePartaii);
                
                if(newLogo == ''){
                    if(oldLogo != null) {
                        formData.append('logo_partai', this.updateLogo);
                        formData.append('id_logo', this.updateIdLogo);
                    }
                    else{
                        formData.append('logo_partai', null);
                        formData.append('id_logo', null);
                    }
                }
                else{
                    formData.append('imgPartai', this.fileUpdate);
                }

                try {
                    return axios.put(`${process.env.VUE_APP_API_URL}/partai/` + id_partai, formData)
                    .then(() =>{
                        this.loadPartai()
                        this.parUpdate = false
                        this.fileUpdate = ''
                        this.updatePartaii = ''
                        this.idUpdatePartai = ''
                        this.updateLogo = ''
                        this.updateIdLogo = ''
                        this.updated = true
                        this.pesanUpdate = 'Partai berhasil diubah'
                        this.variant = 'success'
                    })
                } catch(err){
                    console.log(err)
                    this.updated = false
                    this.pesanUpdate = 'Partai gagal diubah'
                    this.variant = 'danger'
                    this.message = err.response.data

                    // this.error = true;
                }
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