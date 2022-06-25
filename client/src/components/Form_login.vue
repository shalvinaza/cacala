<template>
  <div class="container">
          <div class="row m-3 p-2">
            <div class="col-md p-4 left flex-row flex-wrap justify-content-center text-center d-none d-sm-none d-md-block">
                <img src="../assets/images/add.png" class="mt-5 img-ben" alt="Masuk">
                <p class="mt-3 txt-ben">Masuk dan ikuti akun calon yang Anda inginkan untuk membuat pintasan akses akun Calon ke halaman dasbormu</p>
            </div>
              <div class="col-md d-block right flex-row flex-wrap p-4">
                <h4 class="bold text-center mb-5 mt-3">Masuk</h4>
                <form @submit.prevent="loginUser">
                    <div class="forms-inputs mb-4"> 
                        <span>Email</span> 
                        <input id="email_user" @focus="error=false" autocomplete="off" type="email" v-model="login.email" v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(login.email) && emailBlured || error===true}" v-on:blur="emailBlured = true" placeholder="Ketik email di sini">
                        <div class="invalid-feedback">Email harus valid</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword" @focus="error=false" autocomplete="off" minlength="8" type="text" v-model="login.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(login.password) && passwordBlured || error===true}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <input v-else @focus="error=false" autocomplete="off" minlength="8" type="password" v-model="login.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(login.password) && passwordBlured || error===true}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <a class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </a>
                            <div class="invalid-feedback">Kata sandi minimal 8 karakter</div>
                        </div>
                    </div>
                    <div class="mb-3"> 
                        <!-- <button v-on:click.stop.prevent="submit" type="submit" class="btn bg-light-orange w-100 br-10">Masuk</button>  -->
                        <button type="submit" @click="error=false" class="btn bg-light-orange w-100 br-10">Masuk</button> 
                    </div>
                </form>
                <!-- </div> -->
                <div class="mb-4">
                    <span>Belum punya akun?</span> <a class="buttonDaftar" style="color:#D65A40; cursor:pointer; text-decoration: none" @click="goToRegister()">Daftar Sekarang</a>
                </div>
                <button type="button" @click="goToLoginAdmin()" class="btn btn-outline-orange2 w-100 br-10 mb-3">Masuk sebagai admin</button> 
            </div>
          </div>

        <Alert v-if="error" variantName="danger" :messageProps="message"/>
        <Alert2 class="d-block d-sm-none d-flex justify-content-center" style="background-color-transparent">
            <div class="row text-center ps-3 pe-3" style="--bs-gutter-x:0">
                <img src="../assets/images/add.png" class="mt-5 d-flex justify-content-center m-auto" style="width:50%" alt="Masuk">
                <p class="mt-3" style="font-size:100%">Masuk dan ikuti akun calon yang Anda inginkan untuk membuat pintasan akses akun Calon ke halaman dasbormu </p>    
            </div>       
        </Alert2>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from './Pop_sukses.vue'
import Alert2 from './Pop_small.vue'

const LOGIN_API_URL = `${process.env.VUE_APP_API_URL}/auth/users/login`

export default {
    name:'Form_login',
    components:{
        Alert,
        Alert2
    },
    data: function () {
        return {
            emailBlured : false,
            valid : false,
            passwordBlured:false,
            login: {
                email: "",
                password: ""
            },
            showPassword: false,
            error: false,
            message:'',
            showAlert: false
        }   
    },
    computed:{
        buttonLabel() {
            return (this.showPassword) ? "Hide" : "Show";
        }
    },
    methods:{
        validate : function(){
            this.emailBlured = true;
            this.passwordBlured = true;
            if( this.validEmail(this.login.email) && this.validPassword(this.login.password)){
                this.valid = true;
            }
        },
        validEmail : function(email) {
            var re = /(.+)@(.+){2,}\.(.+){2,}/;
            if(re.test(email.toLowerCase())){
                return true;
            }
        },
        validPassword : function(password) {
            if (password.length > 7) {
                return true;
            }
        },
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        goToLoginAdmin(){
            this.$router.push('/login_admin');
        },
        goToRegister(){
            this.$router.push('/register');
        },
        async loginUser(e){
            e.preventDefault()
            this.validate()
            if (this.valid) {
                try{
                    await axios.post(LOGIN_API_URL, this.login)
                    .then(response => {
                        this.showAlert = true
                        localStorage.setItem('token',response.data.token)
                        localStorage.setItem('sukses', this.showAlert)

                        if (localStorage.getItem('token') != null){
                            this.error = false
                            this.$emit('loggedIn')
                            this.$router.push('/')
                        }
                    })   
                }catch(err) {
                    this.error = true
                    this.message = err.response.data
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
    /* padding: 3rem; */
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
    /* padding-top: 0.75rem; */
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
.showPass{
    background: none;
    width: 45px;
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