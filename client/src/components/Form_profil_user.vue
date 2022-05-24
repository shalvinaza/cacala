<template>
  <div class="container">
          <div class="row br-15">
            <div class="col-md flex-row d-md-block flex-wrap justify-content-center text-center">
                <h4 class="bold justify-content-start mb-5">Edit Profil</h4>
                <img src="../assets/images/profil.png" alt="Masuk">
            </div>
            <div class="col-md flex-row d-md-block flex-wrap">
              
                <div class="form-data">
                <form @submit.prevent="updateUser">
                    <div class="forms-inputs mb-4">  
                        <span>Nama</span> 
                        <input id="nama_user" autocomplete="off" type="text" v-model="user.username" v-bind:class="{'form-control':true, 'is-invalid' : !validUname(user.username) && unameBlured}" v-on:blur="unameBlured = true" placeholder="Ketik nama disini">
                        <div class="invalid-feedback">Nama tidak boleh kosong!</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Email</span> 
                        <input id="email_user" autocomplete="off" type="text" v-model="user.email" v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(user.email) && emailBlured}" placeholder="Ketik email disini">
                        <div class="invalid-feedback">Email harus valid!</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi Baru</span>
                        <!-- <input autocomplete="off" type="password" minlength="8" v-model="password" v-bind:class="{'form-control':true}" placeholder="Ketik kata sandi sekarang"> -->
                        <div class="input-group">
                            <input v-if="showPassword" autocomplete="off" minlength="8" type="text" v-model="password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                            <button class="button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow"><i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i> </button>
                            <div class="invalid-feedback">Password minimal 8 karakter!</div>
                        </div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Konfirmasi Kata Sandi</span>
                        <!-- <input autocomplete="off" type="password" minlength="8" v-model="newPassword" v-bind:class="{'form-control':true}" placeholder="Ketik kata sandi user"> -->
                        <div class="input-group">
                            <input v-if="showPassword2" autocomplete="off" type="text" v-model="newPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(newPassword) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <input v-else autocomplete="off" minlength="8" type="password" v-model="newPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(newPassword) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                            <button class="button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow2"><i class="fas" :class="{ 'fa-eye-slash': showPassword2, 'fa-eye': !showPassword2 }"></i> </button>
                            <div class="invalid-feedback">Password harus sama!</div>
                        </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="button" class="btn bg-light-orange me-3 br-10" style="background-color:#D65A40" @click="toggleDel()">Hapus Akun</button> 
                        <button type="submit" class="btn bg-light-orange br-10">Simpan</button>
                    </div> 
                </form>
                <Popup v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Akun yang sudah dihapus tidak dapat dikembalikan tanpa registasi ulang"> 
                    <div class="d-flex justify-content-end">
                        <button class="bg-light-orange2 me-2 br-10" @click="toggleDel()">Tidak</button>
                        <button class="btn-outline-orange2" @click="del()">Iya</button>
                    </div>
                </Popup>
                </div>
            </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
import Popup from './Berhasil.vue'

export default {
    name:'Form_login',
    components: {
        Popup
    },
    data: function () {
        return {
            unameBlured : false,
            emailBlured : false,
            valid : false,
            passwordBlured:false,
            showPassword:false,
            showPassword2:false,
            password:'',
            newPassword:'',
            user:{
                username: '',
                email: '',
                password:''
            },
            popupDel: false
        }
    },
    mounted(){
        const headers = { token: localStorage.token };
        const GET_USER_API_URL = `${process.env.VUE_APP_API_URL}/user`
        fetch(GET_USER_API_URL, {headers})
            .then(response => response.json())
            .then(result => {
                this.user = result
                var parsedobj = JSON.parse(JSON.stringify(result))
                console.log(parsedobj)
            });
    },
    methods:{
        validate : function(){
            this.unameBlured = true;
            this.emailBlured = true;
            this.passwordBlured = true;
            if( this.validUname(this.user.username) && this.validEmail(this.user.email) && this.validPassword(this.password) && this.validConfirm(this.newPassword)){
                this.valid = true;
            }
            if(this.validEmail(this.user.email)){
                this.valid = true;
            }
            if(this.validPassword(this.password) && this.validConfirm(this.newPassword) ){
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
            // if(password.length > 7){
            //     return true;
            // }
            if (password === "") {
                password = this.user.password;
                return true;
            }
            else{
                if(password.length > 7){
                    return true;
                }
                else{
                    return false;
                }
            }
        },
        validConfirm :function(confirm){
            if(confirm === this.password){
                return true;
            }else{
                return false;
            }
        },
        toggleDel(){
            this.popupDel = !this.popupDel;
        },
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        toggleShow2() {
            this.showPassword2 = !this.showPassword2;
        },
        updateUser(){
        axios.defaults.headers.common["token"] = localStorage.token
        this.validate()
            if(this.valid){
                return axios.put(`${process.env.VUE_APP_API_URL}/user`,{
                    username: this.user.username,
                    email: this.user.email,
                    password: this.password
                })      
                .then(() =>{
                    this.$router.go()
                    this.user=''
                }) 
            }
        },
        del(){
            const id_user = this.user.id_user
            const DEL_USER_API_URL = `${process.env.VUE_APP_API_URL}/user/delete/`
            axios.defaults.headers.common["token"] = localStorage.token
            axios.delete(DEL_USER_API_URL + id_user)
            .then(() =>{
                localStorage.removeItem('token')
                this.$router.push('/login')
            })
        }
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