<template>
  <div class="container">
        <div class="row d-flex m-1">
            <div class="flex-row justify-content-center text-center">
                <h5 class="bold justify-content-start mb-4 mt-4">Daftar Daerah Pilih</h5>
            </div>
            <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Provinsi</h6>
                <form @submit.prevent="addProvinsi" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama Provinsi</span> 
                        <input id="provinsi" autocomplete="off" type="text" v-model="provinsii" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(provinsii) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama provinsi disini">
                        <div class="invalid-feedback">Nama provinsi tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama Provinsi</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prov in provinsi" :key="prov.id_provinsi">
                            <td>{{prov.id_provinsi}}</td>
                            <td>{{prov.provinsi}}</td>
                            <td>                                        
                                <span class="card-text icons me-2" @click="editProv(prov)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                <span class="card-text icons" @click="toggleDelProv(prov.id_provinsi)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                            </td>
                            <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Provinsi yang akan dihapus tidak dapat dikembalikan"> 
                                <div class="d-flex justify-content-end">
                                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDelProv(prov.id_provinsi)">Tidak</button>
                                    <button class="btn-outline-orange2" @click="delProvinsi()">Iya</button>
                                </div>
                            </Popup2>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Popup v-if="provUpdate" title="Edit Jabatan" @toggle-modal="toggleModal">
                <form @submit.prevent="updateProvinsi" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama provinsi</span> 
                        <input id="upProv" autocomplete="off" type="text" v-model="updateProvinsin" v-bind:class="{'form-control':true, 'is-invalid' : !validasiUpdate(updateProvinsin) && updateBlured}" v-on:blur="updateBlured = true" @keydown.enter.prevent placeholder="Ketik nama jabatan disini">
                        <div class="invalid-feedback">Nama provinsi tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Perbarui</button>
                    </div>
                </form>
            </Popup>


            <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Provinsi</h6>
                <form @submit.prevent="addProvinsi" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama Provinsi</span> 
                        <input id="provinsi" autocomplete="off" type="text" v-model="provinsii" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(provinsii) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama provinsi disini">
                        <div class="invalid-feedback">Nama provinsi tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama Provinsi</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prov in provinsi" :key="prov.id_provinsi">
                            <td>{{prov.id_provinsi}}</td>
                            <td>{{prov.provinsi}}</td>
                            <td>                                        
                                <span class="card-text icons me-2" @click="editProv(prov)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                <span class="card-text icons" @click="toggleDelProv(prov.id_provinsi)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                            </td>
                            <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Provinsi yang akan dihapus tidak dapat dikembalikan"> 
                                <div class="d-flex justify-content-end">
                                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDelProv(prov.id_provinsi)">Tidak</button>
                                    <button class="btn-outline-orange2" @click="delProvinsi()">Iya</button>
                                </div>
                            </Popup2>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Popup v-if="provUpdate" title="Edit Jabatan" @toggle-modal="toggleModal">
                <form @submit.prevent="updateProvinsi" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama provinsi</span> 
                        <input id="upProv" autocomplete="off" type="text" v-model="updateProvinsin" v-bind:class="{'form-control':true, 'is-invalid' : !validasiUpdate(updateProvinsin) && updateBlured}" v-on:blur="updateBlured = true" @keydown.enter.prevent placeholder="Ketik nama jabatan disini">
                        <div class="invalid-feedback">Nama provinsi tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Perbarui</button>
                    </div>
                </form>
            </Popup>

             <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Provinsi</h6>
                <form @submit.prevent="addProvinsi" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama Provinsi</span> 
                        <input id="provinsi" autocomplete="off" type="text" v-model="provinsii" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(provinsii) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama provinsi disini">
                        <div class="invalid-feedback">Nama provinsi tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama Provinsi</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prov in provinsi" :key="prov.id_provinsi">
                            <td>{{prov.id_provinsi}}</td>
                            <td>{{prov.provinsi}}</td>
                            <td>                                        
                                <span class="card-text icons me-2" @click="editProv(prov)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                <span class="card-text icons" @click="toggleDelProv(prov.id_provinsi)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                            </td>
                            <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Provinsi yang akan dihapus tidak dapat dikembalikan"> 
                                <div class="d-flex justify-content-end">
                                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDelProv(prov.id_provinsi)">Tidak</button>
                                    <button class="btn-outline-orange2" @click="delProvinsi()">Iya</button>
                                </div>
                            </Popup2>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Popup v-if="provUpdate" title="Edit Jabatan" @toggle-modal="toggleModal">
                <form @submit.prevent="updateProvinsi" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama provinsi</span> 
                        <input id="upProv" autocomplete="off" type="text" v-model="updateProvinsin" v-bind:class="{'form-control':true, 'is-invalid' : !validasiUpdate(updateProvinsin) && updateBlured}" v-on:blur="updateBlured = true" @keydown.enter.prevent placeholder="Ketik nama jabatan disini">
                        <div class="invalid-feedback">Nama provinsi tidak boleh kosong</div>
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
            provinsi: [],
            isiBlured: false,
            provinsii: '',
            updateProvinsin: '',
            variant:'',
            updated: false,
            pesanUpdate: '',
            provUpdate: false,
            popupDel: false,
            id_prov:'',
            idUpdateProv: '',
            validUpdate: false,
            updateBlured: false
        }
    },
    created(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
        this.loadProvinsi()
    },
    mounted(){
        this.edit
    },
    computed:{
        idd: function () {
            const prov = this.provinsi
            let idyes = ''
            for(var i = 0; i < prov.length; i++){
                idyes = this.provinsi[i].id_provinsi
            }
            return idyes
        }
    },
    methods:{
        loadProvinsi(){
            const JABATAN_API_URL = `${process.env.VUE_APP_API_URL}/dapil/provinsi`
            try {
                axios.get(JABATAN_API_URL)
                .then(result => {
                    this.provinsi = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        toggleModal(){
            this.provUpdate = !this.provUpdate;  
        },
        toggleModal2(){
            this.penUpdate = !this.penUpdate;  
        },
        validate : function(){
            this.isiBlured = true;
            if(this.validIsi(this.provinsii)){
                this.valid = true;
            }
        },
        validIsi : function(prov) {
            if(prov.length > 0){
                return true;
            }
        },
        validateUpdate : function(){
            this.updateBlured = true;
            if(this.validasiUpdate(this.updateProvinsin)){
                this.validUpdate = true;
            }
        },
        validasiUpdate : function(prov) {
            if(prov.length > 0){
                return true;
            }
        },
        addProvinsi(e){
            e.preventDefault()
            const ADD_JAB_API = `${process.env.VUE_APP_API_URL}/dapil/provinsi`
            this.validate()
            if(this.valid){
                try{
                    axios.post(ADD_JAB_API, {
                        provinsi: this.provinsii
                    })
                    .then(()=>{
                        this.loadProvinsi()
                        this.provinsii = ''
                        this.updated = true
                        this.valid = false
                        this.isiBlured = false
                        this.variant = 'success'
                        this.pesanUpdate = 'Provinsi berhasil ditambah'
                    })
                } catch(err){
                    console.log(err)
                    this.updated = false
                    this.pesanUpdate = 'Provinsi gagal diubah'
                    this.variant = 'danger'
                }
            }
        },

        toggleDelProv(id){
            this.id_prov = id;
            this.popupDel = !this.popupDel;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delProvinsi(){
            const id_provinsi = this.id_prov;
            axios.delete(`${process.env.VUE_APP_API_URL}/dapil/provinsi/`+ id_provinsi).then(() =>{
                this.popupDel = false
                this.loadProvinsi()
                this.updated = true
                this.pesanUpdate = 'Jabatan berhasil dihapus'
                this.variant = 'success'
            })            
        },

        editProv(prov){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            this.provUpdate = true
            this.idUpdateProv= prov.id_provinsi
            this.updateProvinsin = prov.provinsi    
        },

        updateProvinsi(e){
            const id_prov = this.idUpdateProv
            const UPDATE_PROVINSI_API = `${process.env.VUE_APP_API_URL}/dapil/provinsi/` + id_prov
            e.preventDefault()
            this.validateUpdate()
            if(this.validUpdate){
                try{
                    axios.put(UPDATE_PROVINSI_API, {
                        provinsi: this.updateProvinsin
                    })
                    .then(()=>{
                        this.provUpdate = false
                        this.loadProvinsi()
                        this.updated = true
                        this.pesanUpdate = 'Provinsi berhasil diubah'
                        this.variant = 'success'
                        this.idUpdateProv = ''
                        this.updateProvinsin = ''
                        this.validUpdate = false
                        this.updateBlured = false
                        this.valid = false
                        this.isiBlured = false
                    })
                }catch(err){
                    console.log(err)
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