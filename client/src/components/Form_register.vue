<template>
  <div class="container">
          <div class="row">
            <div class="col-md left flex-row flex-wrap justify-content-center text-center">
                <img src="../assets/images/add.png" alt="Daftar">
                <p class="mt-3">Daftar  dan ikuti akun-akun calon yang Anda inginkan untuk membuat pintasan akses akun-aun Calon ke halaman dashbormu </p>
            </div>
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
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <input id="pass_user" autocomplete="off" type="password" v-model="register.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(register.password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                        <div class="invalid-feedback">Password minimal 8 karakter!</div>
                    </div>
                    <!-- <div class="forms-inputs mb-4"> 
                        <span>Konfirmasi Kata Sandi</span>
                        <input id="konfirmasi_pass_user" autocomplete="off" type="password" v-model="password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                        <div class="invalid-feedback">Password minimal 8 karakter!</div>
                    </div>                     -->
                    <div class="mb-3"> 
                        <!-- <button v-on:click.stop.prevent="submit" type="submit" class="btn bg-light-orange w-100 br-10">Daftar</button>  -->
                        <button type="submit" class="btn bg-light-orange w-100 br-10">Daftar</button> 
                    </div>
                </form>
                <!-- </div> -->
                <div class="mb-4">
                    <span>Sudah punya akun?</span> <a style="color:#D65A40" href="/login">Masuk Sekarang</a>
                </div>
            </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
const REGISTER_API_URL = `http://localhost:3000/auth/users/register`

export default {
    name:'Form_login',
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
        }
    },
    methods:{
        validate : function(){
            this.unameBlured = true;
            this.emailBlured = true;
            this.passwordBlured = true;
            if( this.validUname(this.uname) && this.validEmail(this.email) && this.validPassword(this.password)){
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
        registerUser(e) {
      e.preventDefault()
      if (this.register.password.length > 0){
        axios.post(REGISTER_API_URL, this.register)
        .then(response => {
          localStorage.setItem('token',response.data.token)

          if (localStorage.getItem('token') != null){
            this.$emit('loggedIn')
            this.$router.push('/')    
          }
        })
        .catch(error => {
            console.error(error)
        })
      } 
    },
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
}

.forms-inputs input {
    height: 50px;
    border: 2px solid #9D9493;
    border-radius:10px;
}

.forms-inputs input:focus {
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
.btn-outline-orange{
    color:#DDA18C;
    border-color: #DDA18C;
}
.btn-outline-orange:hover{
    color:white;
    background-color: #D65A40;
}
</style>