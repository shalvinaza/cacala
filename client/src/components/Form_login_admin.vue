<template>
  <div class="container">
          <div class="row">
            <div class="col-md left flex-row flex-wrap justify-content-center text-center">
                <img src="../assets/images/add.png" alt="Masuk">
                <p class="mt-3">Masuk  dan buat informasi kampanye kreatif yang akan disajikan kepada pengguna</p>
            </div>
            <div class="col-md right flex-row d-md-block flex-wrap">
                <h4 class="bold text-center mb-5">Masuk sebagai admin</h4>
                <form class="form-data" @submit.prevent="loginAdmin">
                    <div class="forms-inputs mb-4"> 
                        <span>Nama</span> 
                        <input autocomplete="off" type="text" v-model="login.username" v-bind:class="{'form-control':true, 'is-invalid' : !validUsername(login.username) && usernameBlured}" v-on:blur="usernameBlured = true" placeholder="Ketik nama di sini">
                        <div class="invalid-feedback">Nama tidak boleh kosong!</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <div class="input-group">
                            <input v-if="showPassword" autocomplete="off" minlength="8" type="text" v-model="login.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(login.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="login.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(login.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <button class=" button input-group-text showPass" @click="toggleShow"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /> </button>
                        </div>
                        <div class="invalid-feedback">Password minimal 8 karakter!</div>
                    </div>
                    <div class="mb-3"> 
                        <button type="submit" class="btn bg-light-orange w-100 br-10">Masuk</button>
                    </div>
                </form>
                <button type="button" @click="goToLoginUser()" class="btn btn-outline-orange2 w-100 br-10">Masuk sebagai pengguna</button> 
            </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
const LOGIN_API_URL = `${process.env.VUE_APP_API_URL}/auth/admins/login`

export default {
    name:'Form_login',
    data: function () {
        return {
            usernameBlured : false,
            valid : false,
            submitted : false,
            passwordBlured:false,
            login: {
                username : "",
                password : ""
            },
            showPassword:false
            }
    },
    methods:{
        validate : function(){
            this.usernameBlured = true;
            this.passwordBlured = true;
            if( this.validusername(this.username) && this.validPassword(this.password)){
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
        submit : function(){
            this.validate();
            if(this.valid){
                this.submitted = true;
            }
        },
        goToLoginUser(){
            this.$router.push('/login');
        },
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        loginAdmin(e){
            e.preventDefault()
            if (this.login.password.length > 0) {
                axios.post(LOGIN_API_URL, this.login)
                .then(response => {
                    localStorage.setItem('token',response.data.token)

                if (localStorage.getItem('token') != null){
                    this.$emit('loggedIn')
                    this.$router.push('/detail_admin_calon')
                }
                })
                .catch(function (error) {
                    console.error(error.response);
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
    z-index: 1000;
}

.forms-inputs input {
    height: 50px;
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
    height: 50px;
    background: none;
    border: 2px solid #9D9493;
    border-left: 0px;
    border-radius:10px;
}
</style>