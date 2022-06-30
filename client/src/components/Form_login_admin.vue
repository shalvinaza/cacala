<template>
  <div class="container">
          <div class="row m-3 p-2">
            <div class="col-md p-4 left flex-row flex-wrap justify-content-center text-center align-items-center text-center d-none d-sm-none d-md-block">
                <img src="../assets/images/add.png" alt="Masuk" class="mt-5 img-ben">
                <p class="mt-5 txt-ben p-2">Masuk dan buat informasi kampanye kreatif yang akan disajikan kepada pengguna</p>
            </div>
            <div class="col-md right flex-row d-block flex-wrap p-4">
                <h4 class="bold text-center mb-5 mt-3">Masuk sebagai admin</h4>
                <form class="form-data" @submit.prevent="loginAdmin">
                    <div class="forms-inputs mb-4"> 
                        <span>Nama</span> 
                        <input autocomplete="off" @focus="error=false" @change="lowerCase" @keydown.space.prevent type="text" v-model="login.username" v-bind:class="{'form-control':true, 'is-invalid' : !validUsername(login.username) && usernameBlured || error===true}" v-on:blur="usernameBlured = true" placeholder="Ketik nama di sini">
                        <div class="invalid-feedback">Nama harus sesuai dengan database</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword" @focus="error=false" autocomplete="off" minlength="8" type="text" v-model="login.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(login.password) && passwordBlured || error===true}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <input v-else @focus="error=false" autocomplete="off" minlength="8" type="password" v-model="login.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(login.password) && passwordBlured || error===true}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <a class=" button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </a>
                            <div class="invalid-feedback">Password minimal 8 karakter</div>
                        </div>
                    </div>
                    <div class="mb-3"> 
                        <button type="submit" @click="error=false" class="btn bg-light-orange w-100 br-10">Masuk</button>
                    </div>
                </form>
                <button type="button" @click="goToLoginUser()" class="btn btn-outline-orange2 w-100 br-10">Masuk sebagai pengguna</button> 
            </div>
          </div>

          <Alert v-if="error" variantName="danger" :messageProps="message"/>
        <Alert2 class="d-block d-sm-none d-flex justify-content-center" style="background-color-transparent">
            <div class="row text-center ps-3 pe-3" style="--bs-gutter-x:0">
                <img src="../assets/images/add.png" class="mt-5 d-flex justify-content-center m-auto" style="width:50%" alt="Masuk">
                <p class="mt-3" style="font-size:100%">Masuk dan buat informasi kampanye kreatif yang akan disajikan kepada pengguna </p>    
            </div>       
        </Alert2>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from './Pop_sukses.vue'
import Alert2 from './Pop_small.vue'
const LOGIN_API_URL = `${process.env.VUE_APP_API_URL}/auth/admins/login`

export default {
    name:'Form_login',
    components: {
        Alert,
        Alert2
    },
    data: function () {
        return {
            usernameBlured : false,
            valid : false,
            passwordBlured:false,
            login: {
                username : "",
                password : ""
            },
            showPassword:false,
            error: false,
            message: ''
            }
    },
    methods:{
        validate : function(){
            this.usernameBlured = true;
            this.passwordBlured = true;
            if( this.validUsername(this.login.username) && this.validPassword(this.login.password)){
                this.valid = true;
            }
        },
        validUsername : function(username) {
            if(username.length > 0){
                return true;
            }
        },
        validPassword : function(password) {
            if (password.length > 7) {
                return true;
            }
        },
        goToLoginUser(){
            this.$router.push('/login');
        },
        lowerCase(){
            this.login.username = this.login.username.toLowerCase()
        },
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        async loginAdmin(e){
            e.preventDefault()
            this.validate()
            if (this.valid) {
                try{
                    await axios.post(LOGIN_API_URL, this.login)
                    .then(response => {
                        localStorage.setItem('token',response.data.token)
                        localStorage.setItem('sukses', this.showAlert)

                    if (localStorage.getItem('token') != null){
                        this.error = false
                        this.$emit('loggedIn')
                        this.$router.push('/detail_admin_calon')
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

.forms-inputs input:focus, .showPass:focus{
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
.showPass{
    background: none;
    width: 45px;
    border: 2px solid #9D9493;
    border-left: 0px;
    border-radius:10px;
}
.showPass:hover {
    color: #D65A40;
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