<template>
  <div class="container">
          <div class="row">
            <div class="col-md left flex-row flex-wrap justify-content-center text-center">
                <img src="../assets/images/add.png" alt="Daftar">
                <p class="mt-3">Daftar  dan ikuti akun-akun calon yang Anda inginkan untuk membuat pintasan akses akun-aun Calon ke halaman dashbormu </p>
            </div>
            <!-- <div v-for="user in users" :key="user.id_user">
                {{user.email}}
            </div> -->
            <div class="col-md right flex-row d-md-block flex-wrap">
                <h4 class="bold text-center mb-5">Daftar</h4>
                <!-- <div class="form-data" v-if="!submitted" id="form1"> -->
                <form @submit.prevent="registerUser">
                    <div class="forms-inputs mb-4">  
                        <span>Nama</span> 
                        <input id="email_user" autocomplete="off" type="text" v-model="register.username" v-bind:class="{'form-control':true, 'is-invalid' : !validUname(register.username) && unameBlured}" v-on:blur="unameBlured = true" placeholder="Ketik nama di sini">
                        <div class="invalid-feedback">Nama tidak boleh kosong!</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Email</span> 
                        <input id="email_user" autocomplete="off" type="text" v-model="register.email" v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(register.email) && emailBlured}" v-on:blur="emailBlured = true" placeholder="Ketik email di sini">
                        <div class="invalid-feedback">Email harus valid!</div>
                        <!-- <div v-if="signed" class="invalid-feedback">Email sudah terdaftar!</div> -->
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword" autocomplete="off" minlength="8" type="text" v-model="register.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(register.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="register.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(register.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <button class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow"><i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i> </button>
                            <div class="invalid-feedback">Password minimal 8 karakter!</div>
                        </div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Konfirmasi Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword2" autocomplete="off" type="text" v-model="confirmPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(confirmPassword) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="confirmPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(confirmPassword) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <button class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow2"><i class="fas" :class="{ 'fa-eye-slash': showPassword2, 'fa-eye': !showPassword2 }"></i> </button>
                            <div class="invalid-feedback">Password harus sama!</div>
                        </div>
                    </div>                    
                    <div class="mb-3"> 
                        <button type="submit" class="btn bg-light-orange w-100 br-10">Daftar</button> 
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
  </div>
</template>

<script>
import axios from 'axios'
import Popup from './Berhasil.vue'
const REGISTER_API_URL = `${process.env.VUE_APP_API_URL}/auth/users/register`
const USERS_API_URL = `${process.env.VUE_APP_API_URL}/auth/users`

export default {
    name:'Form_login',
    components:{
        Popup
    },
    data: function () {
        return {
            unameBlured : false,
            emailBlured : false,
            valid : false,
            submitted : false,
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
            signed: false
        }
    },
    mounted(){
        this.fetchUsers();
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
            // this.fetchUsers();
            // var countSame = 0;
            var re = /(.+)@(.+){2,}\.(.+){2,}/;
            if(re.test(email.toLowerCase())){
                return true;
                // this.users.filter((user) => {
                //     if(user.email.match(email)){
                //         countSame += 1;
                //         break;
                //     }
                // });
                // if(countSame = 0){
                //     return true;
                // }
                // else{
                //     this.signed = !this.signed;
                //     countSame = 0;
                // }
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
        submit : function(){
            this.validate();
            if(this.valid){
                this.submitted = true;
            }
        },
        fetchUsers(){
            fetch(USERS_API_URL)
            .then(response => response.json())
            .then(result => {
                this.users = result
            })
        },
        registerUser(e) {
            e.preventDefault()
            this.validate();
            if (this.valid){
                    axios.post(REGISTER_API_URL, this.register)
                    .then(() => {
                    //   localStorage.setItem('token',response.data.token);
                    // alert("Registrasi berhasil\n\n Silahkan masuk ke dalam sistem");
                    // this.$router.push('/login');
                    this.openPopup = true;

                    //   if (localStorage.getItem('token') != null){
                    //     this.$emit('loggedIn')
                    //     this.$router.push('/')    
                    //   }
                })
                .catch(error => {
                    console.error(error)
                })
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
    padding: 3rem;
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
    padding: 5px 10px;
    z-index: 10;
}

.forms-inputs input {
    height: 50px;
    border: 2px solid #9D9493;
    border-radius:10px;
}

.forms-inputs input:focus, .showPass:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #D65A40;
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
/* .btn-outline-orange{
    color:#DDA18C;
    border-color: #DDA18C;
    min-width: 4rem;
    background: white;
}
.btn-outline-orange:hover{
    color:white;
    background-color: #D65A40;
    border-color: #D65A40;
} */
.bg-light-orange-pop:hover{
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
    height: 50px;
    background: none;
    border: 2px solid #9D9493;
    border-left: 0px;
    border-radius:10px;
}
</style>