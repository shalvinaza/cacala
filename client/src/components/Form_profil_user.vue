<template>
  <div class="container d-flex flex-row justify-content-center">
        <div class="row d-flex br-15 p-2 m-1" style="width:900px">
            <div class="flex-row justify-content-center text-center">
                <h4 class="bold justify-content-start mb-4 mt-4">Edit Profil</h4>
            </div>
            <div class="flex-row d-md-block flex-wrap">
                <div class="form-data">
                    <form @submit.prevent="updateUser">
                        <div class="forms-inputs mb-4">  
                            <span>Nama</span> 
                            <input id="nama_user" autocomplete="off" type="text" v-model="user.username" v-bind:class="{'form-control':true, 'is-invalid' : !validUname(user.username) && unameBlured}" v-on:blur="unameBlured = true" @keydown.enter.prevent="updateUser" placeholder="Ketik nama disini">
                            <div class="invalid-feedback">Nama tidak boleh kosong</div>
                        </div>
                        <div class="forms-inputs mb-4"> 
                            <span>Email</span> 
                            <input id="email_user" class="w-100 p-2" autocomplete="off" type="text" v-model="user.email" placeholder="Ketik email disini" disabled>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Simpan perubahan nama</button>
                        </div>
                    </form>
                </div>
                <div class="form-data">
                    <form @submit.prevent="updateUserPass">
                        <div class="forms-inputs mb-4 mt-4"> 
                            <span>Kata Sandi Baru</span>
                            <div class="input-group">
                                <input v-if="showPassword" autocomplete="off" @keydown.enter.prevent="updateUserPass" minlength="8" type="text" v-model="password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                                <input v-else autocomplete="off" minlength="8" @keydown.enter.prevent="updateUserPass" type="password" v-model="password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                                <button class="button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /></button>
                                <div class="invalid-feedback">Password minimal 8 karakter</div>
                            </div>
                        </div>
                        <div class="forms-inputs mb-4"> 
                            <span>Konfirmasi Kata Sandi</span>
                            <div class="input-group">
                                <input v-if="showPassword2" @keydown.enter.prevent="updateUserPass" autocomplete="off" type="text" v-model="newPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(newPassword) && newPasswordBlured}" v-on:blur="newPasswordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                                <input v-else autocomplete="off" @keydown.enter.prevent="updateUserPass" minlength="8" type="password" v-model="newPassword" v-bind:class="{'form-control':true, 'is-invalid' : !validConfirm(newPassword) && newPasswordBlured}" v-on:blur="newPasswordBlured = true" placeholder="Ketik ulang kata sandi di sini">
                                <button class="button input-group-text showPass" style="border-radius:0 10px 10px 0;" @click="toggleShow2"><font-awesome-icon icon="fa-solid fa-eye" v-if="showPassword2" /> <font-awesome-icon icon="fa-solid fa-eye-slash" v-else /></button>
                                <div class="invalid-feedback">Password harus sama</div>
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-end"> 
                            <button type="submit" class="btn bg-light-orange br-10">Simpan perubahan sandi</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="mb-4">
                <span>Ingin menghapus akun?</span> <a style="color:#D65A40;cursor:pointer" @click="toggleDel()">Hapus akun</a>
            </div>
            <Popup v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Akun yang sudah dihapus tidak dapat dikembalikan tanpa registasi ulang"> 
                <div class="d-flex justify-content-end">
                    <button class="bg-light-orange2 me-2 br-10" @click="toggleDel()">Tidak</button>
                    <button class="btn-outline-orange2" @click="del()">Iya</button>
                </div>
            </Popup>
            <Alert v-if="berhasil" variantName="success" :messageProps="message"/>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import Popup from './Berhasil.vue'
import Alert from './Pop_sukses.vue'

export default {
    name:'Form_login',
    components: {
        Popup,
        Alert
    },
    data: function () {
        return {
            unameBlured : false,
            valid : false,
            validPass: false,
            passwordBlured:false,
            newPasswordBlured:false,
            showPassword:false,
            showPassword2:false,
            password:'',
            newPassword:'',
            popupDel: false,
            user:{
                username: '',
                email: ''
            },
            berhasil: false,
            message:''
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
            if( this.validUname(this.user.username)){
                this.valid = true;
            }
        },
        validatePass : function(){
            this.passwordBlured = true;
            this.newPasswordBlured = true;
            if(this.validPassword(this.password) && this.validConfirm(this.newPassword)){
                this.validPass = true;
            }
        },
        validUname : function(uname) {
            if(uname.length > 0){
                return true;
            }
        },
        validPassword : function(password) {
            if(password.length > 7){
                return true;
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
        updateUser(e){
            e.preventDefault()
            axios.defaults.headers.common["token"] = localStorage.token
            this.validate()
                if(this.valid){
                    try {
                        axios.put(`${process.env.VUE_APP_API_URL}/user`,{
                            username: this.user.username
                        })      
                        .then(() =>{
                            this.$router.go()
                            this.username = ''
                            this.berhasil = true
                            this.message = "Nama berhasil diubah"
                        }) 
                    }catch(err){
                        this.berhasil = false
                        console.log(err)
                    }
                }
        },
        updateUserPass(e){
            e.preventDefault()
            axios.defaults.headers.common["token"] = localStorage.token
            this.validatePass()
                if(this.validPass){
                    try {
                        axios.put(`${process.env.VUE_APP_API_URL}/user/pass`, {
                            password: this.password
                        })      
                        .then(() =>{
                            this.$router.go()
                            this.username = ''
                            this.berhasil = true
                            this.message = "Kata sandi berhasil diubah"
                        }) 
                    }catch(err){
                        this.berhasil = false
                        console.log(err)
                    }
                }
        },
        del(){
            // const id_user = this.user.id_user
            const DEL_USER_API_URL = `${process.env.VUE_APP_API_URL}/user/delete`
            axios.defaults.headers.common["token"] = localStorage.token
            axios.delete(DEL_USER_API_URL)
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