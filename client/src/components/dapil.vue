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
            <Popup v-if="provUpdate" title="Edit Provinsi" @toggle-modal="toggleModal">
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
                <h6 class="bold mb-3">Tambah Kota</h6>
                <form @submit.prevent="addKota" class="mt-4">   
                    <div class="dropdown mb-4">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Pilih provinsi
                        </button>
                        <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li v-for="prov in provinsi" :key="prov.provinsi" @click="id_provinsii = prov.id_provinsi"><button class="dropdown-item" type="button">{{prov.provinsi}}</button></li>
                        </ul>
                    </div>

                    <div class="forms-inputs mb-4">  
                        <span>Nama Kota</span> 
                        <input id="kota" autocomplete="off" type="text" v-model="kotaa" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi2(kotaa) && kotaBlured}" v-on:blur="kotaBlured = true" @keydown.enter.prevent placeholder="Ketik nama kota disini">
                        <div class="invalid-feedback">Nama kota tidak boleh kosong</div>
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
                        <th scope="col">Nama Kota</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="kot in kota" :key="kot.id_kota">
                            <td>{{kot.id_kota}}</td>
                            <td>{{kot.provinsi}}</td>
                            <td>{{kot.kota}}</td>
                            <td>                                        
                                <span class="card-text icons me-2" @click="editKota(kot)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                <span class="card-text icons" @click="toggleDelKota(kot.id_kota)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                            </td>
                            <Popup2 v-if="popupDel2" title="Apakah Anda yakin?" pesanPopup="Kota yang akan dihapus tidak dapat dikembalikan"> 
                                <div class="d-flex justify-content-end">
                                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDelKota(kot.id_kota)">Tidak</button>
                                    <button class="btn-outline-orange2" @click="delKota()">Iya</button>
                                </div>
                            </Popup2>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Popup v-if="kotaUpdate" title="Edit Provinsi" @toggle-modal="toggleModal2">
                <form @submit.prevent="updateKota" class="mt-4">              
                    <div class="dropdown mb-4">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Pilih provinsi
                        </button>
                        <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li v-for="prov in provinsi" :key="prov.provinsi" @click="id_provinsii_up = prov.id_provinsi"><button class="dropdown-item" type="button">{{prov.provinsi}}</button></li>
                        </ul>
                    </div>

                    <div class="forms-inputs mb-4">  
                        <span>Nama Kota</span> 
                        <input id="upKot" autocomplete="off" type="text" v-model="updateKotaa" v-bind:class="{'form-control':true, 'is-invalid' : !validasiUpdate2(updateKotaa) && updateKotaBlured}" v-on:blur="updateKotaBlured = true" @keydown.enter.prevent placeholder="Ketik nama kota disini">
                        <div class="invalid-feedback">Nama kota tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Perbarui</button>
                    </div>
                </form>
            </Popup>

             <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Kecamatan</h6>
                <form @submit.prevent="addKecamatan" class="mt-4">  
                    <div class="d-flex flex-row">
                        <div class="dropdown mb-4 me-2">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih provinsi
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="prov in provinsi" :key="prov.id_provinsi" @click="curProv = prov.provinsi; filterKota"><button class="dropdown-item" type="button">{{prov.provinsi}}</button></li>
                            </ul>
                        </div>

                        <div class="dropdown mb-4">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih kota
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="kot in filterKota" :key="kot.id_kota" @click="id_kotaa = kot.id_kota"><button class="dropdown-item" type="button">{{kot.kota}}</button></li>
                            </ul>
                        </div>     
                    </div>                    

                    <div class="forms-inputs mb-4">  
                        <span>Nama Kecamatan</span> 
                        <input id="kecamatan" autocomplete="off" type="text" v-model="kecamatann" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi3(kecamatann) && kecamatanBlured}" v-on:blur="kecamatanBlured = true" @keydown.enter.prevent placeholder="Ketik nama kecamatn disini">
                        <div class="invalid-feedback">Nama kecamatan tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama Kota</th>
                        <th scope="col">Nama Kecamatan</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="kec in kecamatan" :key="kec.id_kecamatan">
                            <td>{{kec.id_kecamatan}}</td>
                            <td>{{kec.kota}}</td>
                            <td>{{kec.kecamatan}}</td>
                            <td>                                        
                                <span class="card-text icons me-2" @click="editKecamatan(kec)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                <span class="card-text icons" @click="toggleDelKec(kec.id_kecamatan)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                            </td>
                            <Popup2 v-if="popupDel3" title="Apakah Anda yakin?" pesanPopup="Kecamatan yang akan dihapus tidak dapat dikembalikan"> 
                                <div class="d-flex justify-content-end">
                                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDelKec(kec.id_kecamatan)">Tidak</button>
                                    <button class="btn-outline-orange2" @click="delKecamatan()">Iya</button>
                                </div>
                            </Popup2>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Popup v-if="kecamatanUpdate" title="Edit Jabatan" @toggle-modal="toggleModal3">
                <form @submit.prevent="updateKecamatan" class="mt-4">              
                    <div class="d-flex flex-row">
                        <div class="dropdown mb-4 me-2">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih provinsi
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="prov in provinsi" :key="prov.id_provinsi" @click="curProv = prov.provinsi; filterKota"><button class="dropdown-item" type="button">{{prov.provinsi}}</button></li>
                            </ul>
                        </div>

                        <div class="dropdown mb-4">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih kota
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="kot in filterKota" :key="kot.id_kota" @click="id_kotaa_up = kot.id_kota"><button class="dropdown-item" type="button">{{kot.kota}}</button></li>
                            </ul>
                        </div>     
                    </div>  

                    <div class="forms-inputs mb-4">  
                        <span>Nama kecamatan</span> 
                        <input id="upKec" autocomplete="off" type="text" v-model="updateKecamatann" v-bind:class="{'form-control':true, 'is-invalid' : !validasiUpdate3(updateKecamatann) && updateKecamatanBlured}" v-on:blur="updateKecamatanBlured = true" @keydown.enter.prevent placeholder="Ketik nama kecamatan disini">
                        <div class="invalid-feedback">Nama kecamatan tidak boleh kosong</div>
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
    name:'dapil_com',
    components: {
        Popup,
        Popup2,
        Alert
    },
    data: function () {
        return {
            provinsi: [],
            kota: [],
            kecamatan: [],
            isiBlured: false,
            kotaBlured: false,
            kecamatanBlured: false,
            provinsii: '',
            id_provinsii: '',
            id_provinsii_up:'',
            kotaa: '',
            id_kotaa: '',
            id_kotaa_up:'',
            kecamatann: '',
            updateProvinsin: '',
            updateKotaa:'',
            updateKecamatann:'',
            variant:'',
            updated: false,
            pesanUpdate: '',
            provUpdate: false,
            kotaUpdate: false,
            kecamatanUpdate:false,
            popupDel: false,
            popupDel2: false,
            popupDel3: false,
            id_prov:'',
            idUpdateProv: '',
            id_kot:'',
            idUpdateKot: '',
            id_kec:'',
            idUpdateKec: '',
            valid: false,
            valid2: false,
            valid3: false,
            validUpdate: false,
            validUpdate2: false,
            validUpdate3: false,
            updateBlured: false,
            updateKotaBlured: false,
            updateKecamatanBlured: false,
            messageErr: '',
            curProv: '',
            curKot:''
        }
    },
    created(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
        this.loadProvinsi()
        this.loadKota()
        this.loadKecamatan()
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
        },
        idkot:function (){
            const kot = this.kota
            let idyes = ''
            for(var i = 0; i < kot.length; i++){
                idyes = this.kota[i].id_kota
            }
            return idyes
        },
        idKec:function (){
            const kec = this.kecamatan
            let idyes = ''
            for(var i = 0; i < kec.length; i++){
                idyes = this.kecamatan[i].id_kecamatan
            }
            return idyes
        },
        filterKota:function(){
            return this.kota.filter((kta)=>{
                return kta.provinsi.match(this.curProv)
            })
        }
    },
    methods:{
        loadProvinsi(){
            const PROVINSI_API_URL = `${process.env.VUE_APP_API_URL}/dapil/provinsi`
            try {
                axios.get(PROVINSI_API_URL)
                .then(result => {
                    this.provinsi = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        loadKota(){
            const KOTA_API_URL = `${process.env.VUE_APP_API_URL}/dapil/kota`
            try {
                axios.get(KOTA_API_URL)
                .then(result => {
                    this.kota = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        loadKecamatan(){
            const KECAMATAN_API_URL = `${process.env.VUE_APP_API_URL}/dapil/kecamatan`
            try {
                axios.get(KECAMATAN_API_URL)
                .then(result => {
                    this.kecamatan = result.data
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
            this.kotaUpdate = !this.kotaUpdate;  
        },
        toggleModal3(){
            this.kecamatanUpdate = !this.kecamatanUpdate;  
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
        validateKota : function(){
            this.kotaBlured = true;
            if(this.validIsi2(this.kotaa) && this.validIdProv(this.id_provinsii)){
                this.valid2 = true;
            }
        },
        validIsi2 : function(kot) {
            if(kot.length > 0){
                return true;
            }
        },
        validateKecamatan : function(){
            this.kecamatanBlured = true;
            if(this.validIsi3(this.kecamatann) && this.validIdKot(this.id_kotaa)){
                this.valid3 = true;
            }
        },
        validIsi3 : function(kec) {
            if(kec.length > 0){
                return true;
            }
        },
        validIdProv : function(prov) {
            if(prov !== ''){
                return true;
            }
            else{
                this.messageErr = 'Provinsi harus dipilih untuk menambahkan kota'
                return false
            }
        },
        validIdKot : function(kot) {
            if(kot !== ''){
                return true;
            }
            else{
                this.messageErr = 'Kota harus dipilih untuk menambahkan kecamatan'
                return false
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
        validateUpdateKota : function(){
            this.updateKotaBlured = true;
            if(this.validasiUpdate2(this.updateKotaa)){
                this.validUpdate2 = true;
            }
        },
        validasiUpdate2 : function(kot) {
            if(kot.length > 0){
                return true;
            }
        },
        validateUpdateKecamatan : function(){
            this.updateKecamatanBlured = true;
            if(this.validasiUpdate3(this.updateKecamatann)){
                this.validUpdate3 = true;
            }
        },
        validasiUpdate3 : function(kec) {
            if(kec.length > 0){
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

        addKota(e){
            e.preventDefault()
            const ADD_KOT_API = `${process.env.VUE_APP_API_URL}/dapil/kota`
            this.validateKota()
            if(this.valid2){
                try{
                    axios.post(ADD_KOT_API, {
                        id_provinsi: this.id_provinsii,
                        kota: this.kotaa
                    })
                    .then(()=>{
                        this.loadKota()
                        this.id_provinsii = ''
                        this.kotaa = ''
                        this.updated = true
                        this.valid2 = false
                        this.kotaBlured = false
                        this.variant = 'success'
                        this.pesanUpdate = 'Kota berhasil ditambah'
                    })
                } catch(err){
                    console.log(err)
                    this.updated = false
                    this.pesanUpdate = 'Kota gagal diunggah'
                    this.variant = 'danger'
                }
            }
        },        

        addKecamatan(e){
            e.preventDefault()
            const ADD_KEC_API = `${process.env.VUE_APP_API_URL}/dapil/kecamatan`
            this.validateKecamatan()
            if(this.valid3){
                try{
                    axios.post(ADD_KEC_API, {
                        id_kota: this.id_kotaa,
                        kecamatan: this.kecamatann
                    })
                    .then(()=>{
                        this.loadKecamatan()
                        this.kecamatann = ''
                        this.id_kotaa = ''
                        this.updated = true
                        this.valid3 = false
                        this.kecamatanBlured = false
                        this.variant = 'success'
                        this.pesanUpdate = 'Kecamatan berhasil ditambah'
                    })
                } catch(err){
                    console.log(err)
                    this.updated = false
                    this.pesanUpdate = 'Kecamatan gagal diunggah'
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

        toggleDelKota(id){
            this.id_kot = id;
            this.popupDel2 = !this.popupDel2;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delKota(){
            const id_kota = this.id_kot;
            axios.delete(`${process.env.VUE_APP_API_URL}/dapil/kota/`+ id_kota).then(() =>{
                this.popupDel2 = false
                this.loadKota()
                this.updated = true
                this.pesanUpdate = 'Kota berhasil dihapus'
                this.variant = 'success'
            })            
        },

        toggleDelKec(id){
            this.id_kec = id;
            this.popupDel3 = !this.popupDel3;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delKecamatan(){
            const id_kecamatan = this.id_kec;
            axios.delete(`${process.env.VUE_APP_API_URL}/dapil/kecamatan/`+ id_kecamatan).then(() =>{
                this.popupDel3 = false
                this.loadKecamatan()
                this.updated = true
                this.pesanUpdate = 'Kecamatan berhasil dihapus'
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

        editKota(kot){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            this.kotaUpdate = true
            this.idUpdateKot= kot.id_kota
            this.updateKotaa = kot.kota    
            this.id_provinsii_up = kot.id_provinsi
            this.curProv = kot.provinsi
        },

        updateKota(e){
            const id_kota = this.idUpdateKot
            const UPDATE_KOTA_API = `${process.env.VUE_APP_API_URL}/dapil/kota/` + id_kota
            e.preventDefault()
            this.validateUpdateKota()
            if(this.validUpdate2){
                try{
                    axios.put(UPDATE_KOTA_API, {
                        id_provinsi: this.id_provinsii_up,
                        kota: this.updateKotaa
                    })
                    .then(()=>{
                        this.kotaUpdate = false
                        this.loadKota()
                        this.updated = true
                        this.pesanUpdate = 'Kota berhasil diubah'
                        this.variant = 'success'
                        this.idUpdateKot = ''
                        this.updateKotaa = ''
                        this.id_provinsii_up = ''
                        this.validUpdate2 = false
                        this.updateKotaBlured = false
                        this.valid2 = false
                        this.kotaBlured = false
                    })
                }catch(err){
                    console.log(err)
                }
            }
        },

        editKecamatan(kec){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            this.kecamatanUpdate = true
            this.idUpdateKec= kec.id_kecamatan
            this.updateKecamatann = kec.kecamatan    
            this.id_kotaa_up = kec.id_kota
        },

        updateKecamatan(e){
            const id_kecamatan = this.idUpdateKec
            const UPDATE_KECAMATAN_API = `${process.env.VUE_APP_API_URL}/dapil/kecamatan/` + id_kecamatan
            e.preventDefault()
            this.validateUpdateKecamatan()
            if(this.validUpdate3){
                try{
                    axios.put(UPDATE_KECAMATAN_API, {
                        id_kota: this.id_kotaa_up,
                        kecamatan: this.updateKecamatann
                    })
                    .then(()=>{
                        this.kecamatanUpdate = false
                        this.loadKecamatan()
                        this.updated = true
                        this.pesanUpdate = 'Kecamatan berhasil diubah'
                        this.variant = 'success'
                        this.idUpdateKec = ''
                        this.updateKecamatann = ''
                        this.id_kotaa_up = ''
                        this.validUpdate3 = false
                        this.updateKecamatanBlured = false
                        this.valid3 = false
                        this.kecamatanBlured = false
                    })
                }catch(err){
                    console.log(err)
                }
            }
        }

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