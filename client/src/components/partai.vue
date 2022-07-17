<template>
  <div class="container">
        <div class="row d-flex m-1">
            <div class="flex-row justify-content-center text-center">
                <h5 class="bold justify-content-start mb-4 mt-4">Partai</h5>
            </div>
            <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Partai</h6>
                <form @submit.prevent="addJabatan" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama Partai</span> 
                        <input id="partai" autocomplete="off" type="text" v-model="jabatan_tujuan" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(jabatan_tujuan) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama jabatan disini">
                        <div class="invalid-feedback">Nama jabatan tidak boleh kosong</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama Jabatan</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="jab in jabatan" :key="jab.id_jabatan">
                            <td>{{jab.id_jabatan}}</td>
                            <td>{{jab.jabatan_tujuan}}</td>
                            <td>                                        
                                <span class="card-text icons me-2" @click="editJab(jab)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                <span class="card-text icons" @click="toggleDelJab(jab.id_jabatan)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                            </td>
                            <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Jabatan yang akan dihapus tidak dapat dikembalikan"> 
                                <div class="d-flex justify-content-end">
                                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDelJab(jab.id_jabatan)">Tidak</button>
                                    <button class="btn-outline-orange2" @click="delJabatan()">Iya</button>
                                </div>
                            </Popup2>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Popup v-if="jabUpdate" title="Edit Jabatan" @toggle-modal="toggleModal">
                <form @submit.prevent="updateJabatan" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama jabatan</span> 
                        <input id="upJabatan" autocomplete="off" type="text" v-model="updateJabatann" v-bind:class="{'form-control':true, 'is-invalid' : !validasiUpdate(updateJabatann) && updateBlured}" v-on:blur="updateBlured = true" @keydown.enter.prevent placeholder="Ketik nama jabatan disini">
                        <div class="invalid-feedback">Nama jabatan tidak boleh kosong</div>
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
            jabatan: [],
            isiBlured: false,
            jabatan_tujuan: '',
            updateJabatann: '',
            variant:'',
            updated: false,
            pesanUpdate: '',
            jabUpdate: false,
            popupDel: false,
            id_jab:'',
            idUpdate: '',
            validUpdate: false,
            updateBlured: false
        }
    },
    created(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
        this.loadJabatan()
    },
    mounted(){
        this.edit
    },
    computed:{
        idd: function () {
            const jabatan = this.jabatan
            let idyes = ''
            for(var i = 0; i < jabatan.length; i++){
                idyes = this.jabatan[i].id_jabatan
            }
            return idyes
        }
    },
    methods:{
        loadJabatan(){
            const JABATAN_API_URL = `${process.env.VUE_APP_API_URL}/jabatan`
            try {
                axios.get(JABATAN_API_URL)
                .then(result => {
                    this.jabatan = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        toggleModal(){
            this.jabUpdate = !this.jabUpdate;  
        },
        toggleModal2(){
            this.penUpdate = !this.penUpdate;  
        },
        validate : function(){
            this.isiBlured = true;
            if(this.validIsi(this.jabatan_tujuan)){
                this.valid = true;
            }
        },
        validIsi : function(jab) {
            if(jab.length > 0){
                return true;
            }
        },
        validateUpdate : function(){
            this.updateBlured = true;
            if(this.validasiUpdate(this.updateJabatann)){
                this.validUpdate = true;
            }
        },
        validasiUpdate : function(jab) {
            if(jab.length > 0){
                return true;
            }
        },
        addJabatan(e){
            e.preventDefault()
            const ADD_JAB_API = `${process.env.VUE_APP_API_URL}/jabatan`
            this.validate()
            if(this.valid){
                try{
                    axios.post(ADD_JAB_API, {
                        jabatan_tujuan: this.jabatan_tujuan
                    })
                    .then(()=>{
                        this.loadJabatan()
                        this.jabatan_tujuan = ''
                        this.updated = true
                        this.valid = false
                        this.isiBlured = false
                        this.variant = 'success'
                        this.pesanUpdate = 'Jabatan berhasil ditambah'
                    })
                } catch(err){
                    console.log(err)
                    this.updated = false
                    this.pesanUpdate = 'Jabatan gagal diubah'
                    this.variant = 'danger'
                }
            }
        },

        toggleDelJab(id){
            this.id_jab = id;
            this.popupDel = !this.popupDel;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delJabatan(){
            const id_jabatan = this.id_jab;
            axios.delete(`${process.env.VUE_APP_API_URL}/jabatan/`+ id_jabatan).then(() =>{
                this.popupDel = false
                this.loadJabatan()
                this.updated = true
                this.pesanUpdate = 'Jabatan berhasil dihapus'
                this.variant = 'success'
            })            
        },

        editJab(jab){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            this.jabUpdate = true
            this.idUpdate= jab.id_jabatan
            this.updateJabatann = jab.jabatan_tujuan    
        },

        updateJabatan(e){
            const id_jab = this.idUpdate
            const UPDATE_JABATAN_API = `${process.env.VUE_APP_API_URL}/jabatan/` + id_jab
            e.preventDefault()
            this.validateUpdate()
            if(this.validUpdate){
                try{
                    axios.put(UPDATE_JABATAN_API, {
                        id_jabatan: this.idUpdate,
                        jabatan_tujuan: this.updateJabatann
                    })
                    .then(()=>{
                        this.jabUpdate = false
                        this.loadJabatan()
                        this.updated = true
                        this.pesanUpdate = 'Jabatan berhasil diubah'
                        this.variant = 'success'
                        this.idUpdate = ''
                        this.updateJabatann = ''
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