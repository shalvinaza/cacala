<template>
  <div class="container">
        <div class="row d-flex m-1">
            <div class="flex-row justify-content-center text-center">
                <h5 class="bold justify-content-start mb-4 mt-4">Daftar Admin</h5>
            </div>
            <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Admin</h6>
                <form @submit.prevent="addAdmin" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama Admin</span> 
                        <input id="jabatan" autocomplete="off" type="text" v-model="admin.username" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(admin.username) && unameBlured}" v-on:blur="unameBlured = true" @keydown.enter.prevent placeholder="Ketik nama admin disini" @keydown.prevent.space>
                        <div class="invalid-feedback">Nama admin tidak boleh kosong</div>
                    </div>
                    <div class="dropdown mb-4">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Pilih peran admin
                        </button>
                        <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li @click="admin.role = 'admin'"><button class="dropdown-item" type="button">Admin calon</button></li>
                            <li @click="admin.role = 'super'"><button class="dropdown-item" type="button">Super admin</button></li>
                        </ul>
                    </div>
                    <!-- <div class="forms-inputs mb-4">  
                        <span>Peran Admin</span> 
                        <input id="jabatan" autocomplete="off" type="text" v-model="jabatan_tujuan" v-bind:class="{'form-control':true, 'is-invalid' : !validIsi(jabatan_tujuan) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama jabatan disini">
                        <div class="invalid-feedback">Peran admin tidak boleh kosong</div>
                    </div> -->
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword" autocomplete="off" minlength="8" type="text" v-model="admin.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(admin.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="admin.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(admin.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <a class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="togglePassword"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </a>
                            <div class="invalid-feedback">Password minimal 8 karakter</div>
                        </div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Konfirmasi Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword2" autocomplete="off" type="text" v-model="confirmPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(confirmPassword) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="confirmPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(confirmPassword) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <a class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="togglePassword2"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword2" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </a>
                            <div class="invalid-feedback">Password harus sama</div>
                        </div>
                    </div> 
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
                <table class="table mt-4">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nama Admin</th>
                        <th scope="col">Peran</th>
                        <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="admin in admins" :key="admin.id_admin">
                            <td>{{admin.id_admin}}</td>
                            <td>{{admin.username}}</td>
                            <td>{{admin.role}}</td>
                            <td>                                        
                                <span class="card-text icons me-2" @click="editAdmin(admin)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                                <span class="card-text icons" @click="toggleDelAdmin(admin.id_admin)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                            </td>
                            <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Jabatan yang akan dihapus tidak dapat dikembalikan"> 
                                <div class="d-flex justify-content-end">
                                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDelAdmin(admin.id_admin)">Tidak</button>
                                    <button class="btn-outline-orange2" @click="delAdmin()">Iya</button>
                                </div>
                            </Popup2>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Popup v-if="adminUpdate" title="Edit Admin" @toggle-modal="toggleModal">
                <form @submit.prevent="updateAdmin" class="mt-4">              
                    <div class="forms-inputs mb-4">  
                        <span>Nama Admin</span> 
                        <input id="jabatan" autocomplete="off" type="text" v-model="update.username" v-bind:class="{'form-control':true, 'is-invalid' : !validasiUpdate(update.username) && unameBlured}" v-on:blur="unameBlured = true" @keydown.enter.prevent @keydown.prevent.space placeholder="Ketik nama admin disini">
                        <div class="invalid-feedback">Nama admin tidak boleh kosong</div>
                    </div>
                    <div class="dropdown mb-4">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Pilih peran admin
                        </button>
                        <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li @click="update.role = 'admin'"><button class="dropdown-item" type="button">Admin calon</button></li>
                            <li @click="update.role = 'super'"><button class="dropdown-item" type="button">Super admin</button></li>
                        </ul>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword3" autocomplete="off" minlength="8" type="text" v-model="update.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword2(update.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="update.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword2(update.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <a class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="togglePassword3"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword3" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </a>
                            <div class="invalid-feedback">Password minimal 8 karakter</div>
                        </div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Konfirmasi Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword4" autocomplete="off" type="text" v-model="confirmPasswordUp" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm2(confirmPasswordUp) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="confirmPasswordUp" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm2(confirmPasswordUp) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <a class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="togglePassword4"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword4" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </a>
                            <div class="invalid-feedback">Password harus sama</div>
                        </div>
                    </div> 
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
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
            admins: [],
            unameBlured: false,
            admin:{
                username: '',
                role: '',
                password:''
            },
            confirmPassword: '',
            confirmPasswordUp:'',
            update:{
                id: '',
                username: '',
                role: '',
                password: ''
            },  
            variant:'',
            updated: false,
            pesanUpdate: '',
            adminUpdate: false,
            popupDel: false,
            valid: false,
            validUpdate: false,
            updateBlured: false,
            passwordBlured: false,
            showPassword: false,
            showPassword2: false,
            showPassword3: false,
            showPassword4: false,
            id_admin: ''
        }
    },
    created(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
        this.loadAdmin()
    },
    methods:{
        loadAdmin(){
            const ADMIN_API_URL = `${process.env.VUE_APP_API_URL}/auth/admins`
            try {
                axios.get(ADMIN_API_URL)
                .then(result => {
                    this.admins = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        toggleModal(){
            this.adminUpdate = !this.adminUpdate;  
        },
        togglePassword(){
            this.showPassword = !this.showPassword
        },
        togglePassword2(){
            this.showPassword2 = !this.showPassword2
        },
        togglePassword3(){
            this.showPassword3 = !this.showPassword3
        },
        togglePassword4(){
            this.showPassword4 = !this.showPassword4
        },

        validate : function(){
            this.unameBlured = true;
            this.passwordBlured = true
            if(this.validIsi(this.admin.username) && this.validRole(this.admin.role) && this.validPassword(this.admin.password) && this.validConfirm(this.confirmPassword)){
                this.valid = true;
            }
        },
        validIsi : function(uname) {
            if(uname.length > 0){
                return true;
            }
        },
        validRole : function(role) {
            if(role != ''){
                return true;
            }
        },
        validPassword : function(password) {
            if (password.length > 7) {
                return true;
                }
        },
        validConfirm :function(confirm){
            if(confirm === this.admin.password){
                return true;
            }else{
                return false;
            }
        },
        validateUpdate : function(){
            if(this.update.password === '' && this.confirmPassword === ''){
                this.unameBlured = true;
                if(this.validasiUpdate(this.update.username) && this.validRole2(this.update.role)){
                    this.validUpdate = true;
                }
            }
            else{
                this.unameBlured = true;
                this.passwordBlured = true
                if(this.validasiUpdate(this.update.username) && this.validRole2(this.update.role) && this.validPassword2(this.update.password) && this.validConfirm2(this.confirmPasswordUp)){
                    this.validUpdate = true
                }
            }

        },
        validasiUpdate : function(uname) {
            if(uname.length > 0){
                return true;
            }
        },
        validRole2 : function(role) {
            if(role != ''){
                return true;
            }
        },
        validPassword2 : function(password) {
            if (password.length > 7) {
                return true;
                }
        },
        validConfirm2 :function(confirm){
            if(confirm === this.update.password){
                return true;
            }else{
                return false;
            }
        },

        async addAdmin(e) {
            const REGISTER_API_URL = `${process.env.VUE_APP_API_URL}/auth/admins/register`
            e.preventDefault()
            this.validate()
            if (this.valid){
                try{
                    await axios.post(REGISTER_API_URL, this.admin)
                    .then((response) => {
                        this.loadAdmin()
                        this.updated = false;
                        this.variant = 'success'
                        this.pesanUpdate = response.data
                        this.admin.username = ''
                        this.admin.role = ''
                        this.admin.password = ''
                        this.confirmPassword = ''
                        this.unameBlured = false
                        this.passwordBlured = false
                    })
                } catch(err) {
                    this.updated = true;
                    this.variant = 'danger'
                    this.pesanUpdate = err.response.data;
                    console.log(this.message)
                }
            } 
        },        

        toggleDelAdmin(id){
            this.id_admin = id;
            this.popupDel = !this.popupDel;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delAdmin(){
            const id_admin = this.id_admin;
            axios.delete(`${process.env.VUE_APP_API_URL}/auth/admins/`+ id_admin).then(() =>{
                this.popupDel = false
                this.loadAdmin()
                this.updated = true
                this.pesanUpdate = 'Admin berhasil dihapus'
                this.variant = 'success'
            })            
        },

        editAdmin(admin){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            this.adminUpdate = true
            this.update.id = admin.id_admin
            this.update.username = admin.username    
            this.update.role = admin.role
        },

        updateAdmin(e){
            const id_admin = this.update.id
            const UPDATE_ADMIN_API = `${process.env.VUE_APP_API_URL}/admin/` + id_admin
            e.preventDefault()
            this.validateUpdate()
            if(this.validUpdate){
                try{
                    axios.put(UPDATE_ADMIN_API, {
                        username: this.update.username,
                        role: this.update.role,
                        password: this. update.password
                    })
                    .then((response)=>{
                        this.adminUpdate = false
                        this.loadAdmin()
                        this.updated = true
                        this.pesanUpdate = response.data
                        this.variant = 'success'
                        this.update.id = ''
                        this.update.username = ''
                        this.update.password = ''
                        this.validUpdate = false
                        this.unameBlured = false
                        this.passwordBlured = false    
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