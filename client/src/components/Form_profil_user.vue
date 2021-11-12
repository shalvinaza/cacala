<template>
  <div class="container">
          <div class="row br-15">
            <div class="col-md flex-row d-md-block flex-wrap justify-content-center text-center">
                <h4 class="bold justify-content-start mb-5">Edit Profil</h4>
                <img src="../assets/images/profil.png" alt="Masuk">
            </div>
            <div class="col-md flex-row d-md-block flex-wrap">
                <!-- <div class="form-data" v-if="!submitted" id="form1"> -->
                <!-- <div class="form-data" @submit.prevent="loginUser" id="form1"> -->
                <form @submit.prevent="registerUser">
                    <div class="forms-inputs mb-4">  
                        <span>Nama</span> 
                        <input id="name_user" autocomplete="off" type="text" v-model="register.name" v-bind:class="{'form-control':true, 'is-invalid' : !validUname(uname) && unameBlured}" v-on:blur="unameBlured = true" placeholder="Shalvina">
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Email</span> 
                        <input id="email_user" autocomplete="off" type="text" v-model="register.email" v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(email) && emailBlured}" v-on:blur="emailBlured = true" placeholder="shalvina@gmail.com">
                        <div class="invalid-feedback">Email harus valid!</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi Sekarang</span>
                        <input id="pass_user" autocomplete="off" type="password" v-model="register.password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi sekarang">
                        <div class="invalid-feedback">Password harus benar!</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi Baru</span>
                        <input id="new_user" autocomplete="off" type="password" v-model="register.newpassword" v-bind:class="{'form-control':true, 'is-invalid' : !validNewPassword(newpassword) && newpasswordBlured}" v-on:blur="newpasswordBlured = true" placeholder="Ketik kata sandi baru">
                        <div class="invalid-feedback">Password minimal 8 karakter!</div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <!-- <button v-on:click.stop.prevent="submit" type="submit" class="btn bg-light-orange w-100 br-10">Daftar</button>  -->
                        <button type="button" class="btn bg-light-orange me-3 br-10" style="background-color:#D65A40">Hapus Akun</button> 
                        <button type="submit" class="btn bg-light-orange br-10">Simpan</button>
                    </div> 
                </form>
                <!-- </div> -->
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
            uname :"",
            unameBlured : false,
            email : "",
            emailBlured : false,
            valid : false,
            submitted : false,
            password:"",
            passwordBlured:false,
            newpassword:"",
            newpasswordBlured:false,
            register: {
                username: "",
                email: "",
                password: "",
                newpassword: ""
            },
        }
    },
    methods:{
        validate : function(){
            this.unameBlured = true;
            this.emailBlured = true;
            this.passwordBlured = true;
            this.newpasswordBlured = true;
            if( this.validUname(this.uname) && this.validEmail(this.email) && this.validPassword(this.password) && this.validNewPassword(this.newpassword)){
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
        validNewPassword : function(newpassword) {
            if (newpassword.length > 7) {
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
    color: white;
}
.br-15{
    border: 4px solid #DDA18C;
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
</style>