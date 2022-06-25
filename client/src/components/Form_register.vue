<template>
  <div class="container">
        <div class="row m-3 p-2">
            <div class="col-md p-4 left flex-row flex-wrap justify-content-center align-items-center text-center d-none d-sm-none d-md-block">
                <img src="../assets/images/add.png" alt="Daftar" class="mt-5 img-ben">
                <p class="mt-5 txt-ben p-2">Daftar dan ikuti akun calon yang Anda inginkan untuk membuat pintasan akses akun Calon ke halaman dasbormu </p>
            </div>
            <div class="col-md right flex-row d-block flex-wrap p-4">
                <h4 class="bold text-center mb-5 mt-3">Daftar</h4>
                <form @submit.prevent="registerUser">
                    <div class="forms-inputs mb-4">  
                        <span>Nama</span> 
                        <input id="email_user" autocomplete="off" type="text" v-model="register.username" v-bind:class="{'form-control':true, 'is-invalid' : !validUname(register.username) && unameBlured}" v-on:blur="unameBlured = true" placeholder="Ketik nama di sini">
                        <div class="invalid-feedback">Nama tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Email</span> 
                        <input id="email_user" @focus="error=false" autocomplete="off" type="text" v-model="register.email" v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(register.email) && emailBlured || error===true}" v-on:blur="emailBlured = true" placeholder="Ketik email di sini">
                        <div class="invalid-feedback">Email harus valid</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword" autocomplete="off" minlength="8" type="text" v-model="register.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(register.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="register.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(register.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <a class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </a>
                            <div class="invalid-feedback">Password minimal 8 karakter</div>
                        </div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Konfirmasi Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword2" autocomplete="off" type="text" v-model="confirmPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(confirmPassword) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="confirmPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(confirmPassword) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <a class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow2"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword2" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </a>
                            <div class="invalid-feedback">Password harus sama</div>
                        </div>
                    </div>                    
                    <div class="mb-3"> 
                        <button type="submit" @click="error=false" class="btn bg-light-orange w-100 br-10">Daftar</button> 
                    </div>
                </form>
                <!-- </div> -->
                <div class="mb-4">
                    <span>Sudah punya akun?</span> <a style="color:#D65A40;cursor:pointer" @click="goToLogin()">Masuk Sekarang</a>
                </div>
            </div>
        </div>

        <!-- popup -->
        <Popup v-if="openPopup" title="Registrasi berhasil" pesanPopup="Silahkan masuk ke dalam sistem">
            <div class="d-flex justify-content-end">
                <button class="bg-light-orange-pop br-10" @click="goToLogin()">Oke</button>
            </div>
        </Popup>

        <Alert v-if="error" variantName="danger" :messageProps="'Registrasi gagal, ' + message"/>
        <Alert2 class="d-block d-sm-none d-flex justify-content-center" style="background-color-transparent">
            <div class="row text-center ps-3 pe-3" style="--bs-gutter-x:0">
                <img src="../assets/images/add.png" class="mt-5 d-flex justify-content-center m-auto" style="width:50%" alt="Masuk">
                <p class="mt-3" style="font-size:100%">Daftar dan ikuti akun calon yang Anda inginkan untuk membuat pintasan akses akun Calon ke halaman dasbormu </p>    
            </div>       
        </Alert2>
  </div>
</template>

<script>
import axios from 'axios'
import Popup from './Berhasil.vue'
import Alert from './Pop_sukses.vue'
import Alert2 from './Pop_small.vue'
const REGISTER_API_URL = `${process.env.VUE_APP_API_URL}/auth/users/register`
const USERS_API_URL = `${process.env.VUE_APP_API_URL}/auth/users`

export default {
    name:'Form_login',
    components:{
        Popup,
        Alert,
        Alert2
    },
    data: function () {
        return {
            unameBlured : false,
            emailBlured : false,
            valid : false,
            passwordBlured:false,
            register: {
                username: "",
                email: "",
                password: ""
            },
            showPassword:false,
            showPassword2:false,
            confirmPassword: "",
            openPopup: false,
            users: [],
            message: "",
            error: false,
        }
    },
    mounted(){
        this.fetchUsers()
    },
    methods:{
        validate : function(){
            this.unameBlured = true;
            this.emailBlured = true;
            this.passwordBlured = true;
            if( this.validUname(this.register.username) && this.validEmail(this.register.email) && this.validPassword(this.register.password) && this.validConfirm(this.confirmPassword)){
                this.valid = true;
                }
        },
        validUname : function(uname) {
            if(uname.length > 0){
                return true;
            }
        },
        validEmail : function(email) {
            var re = /(.+)@(.+){2,}\.(.+){2,}/;
            if(re.test(email.toLowerCase())){
                return true;
            }
            else{
                return false;
            }
        },
        validPassword : function(password) {
            if (password.length > 7) {
                return true;
                }
        },
        validConfirm :function(confirm){
            if(confirm === this.register.password){
                return true;
            }else{
                return false;
            }
        },
        goToLogin(){
            this.$router.push('/login')
        },
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        toggleShow2() {
            this.showPassword2 = !this.showPassword2;
        },
        fetchUsers(){
            fetch(USERS_API_URL)
            .then(response => response.json())
            .then(result => {
                this.users = result
            })
        },
        async registerUser(e) {
            e.preventDefault()
            this.validate()
            if (this.valid){
                try{
                    await axios.post(REGISTER_API_URL, this.register)
                    .then(() => {
                        this.error = false;
                        this.openPopup = true;
                    })
                } catch(err) {
                    this.error = true;
                    this.message = err.response.data;
                    console.log(this.message)
                }
            } 
        }
    }
}
</script>

<style scoped>
p{
    font-size: 20px;
}
.col-md{
    display: flex;
    border: 4px solid #DDA18C;
    justify-content: center;
    /* padding: 3rem; */
    color: white;
}
.left{
    border-radius: 15px 0 0 15px;
    background-color:#DDA18C;
}
.right{
    color: black;
    border-radius: 0 15px 15px 0;
}
.forms-inputs {
    position: relative
}

.forms-inputs span {
    position: absolute;
    top: -18px;
    left: 10px;
    background-color: #fff;
    padding: 5px;
    z-index: 10;
}

.forms-inputs input {
    height: 60px;
    border: 2px solid #9D9493;
    border-radius:10px;
}

.forms-inputs input:focus, .showPass:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #D65A40;
}
.showPass:hover {
    color: #D65A40;
}
.btn {
    height: 50px;
}

.success-data {
    display: flex;
    flex-direction: column;
}

.bxs-badge-check {
    font-size: 90px
}
.btn-outline-orange{
    color:#DDA18C;
    font-weight:400;
    border: 2px solid #DDA18C ;
    min-width: 4rem;
    background: white;
}
.bg-light-orange-pop:hover,.btn-outline-orange:hover {
    color:white;
    background-color: #D65A40;
    border-color: #D65A40;
}
.bg-light-orange-pop{
    font-weight:400;
    border: 1px solid;
    min-width: 4rem;
    color: white;
    background-color: #DDA18C;
}
.showPass{
    /* height: 50px; */
    width: 45px;
    background: none;
    border: 2px solid #9D9493;
    border-left: 0px;
    border-radius:10px;
}
@media (max-width: 767.98px) {
    .right{
        color: black;
        border-radius: 15px;
    }
}
@media (max-width: 991.98px) {
    .txt-ben{
        font-size: 95%;
    }
    .img-ben{
        width: 85%;
    }
}
</style>