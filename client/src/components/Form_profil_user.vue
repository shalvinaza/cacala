<template>
  <div class="container">
          <div class="row br-15">
            <div class="col-md flex-row d-md-block flex-wrap justify-content-center text-center">
                <h4 class="bold justify-content-start mb-5">Edit Profil</h4>
                <img src="../assets/images/profil.png" alt="Masuk">
            </div>
            <div class="col-md flex-row d-md-block flex-wrap">
                <!-- <div class="form-data" v-if="!submitted" id="form1"> -->
                <div class="form-data">
                <form @submit.prevent="updateUser">
                    <div class="forms-inputs mb-4">  
                        <span>Nama</span> 
                        <input autocomplete="off" type="text" v-model="user.username" v-bind:class="{'form-control':true}" placeholder="Ketik nama disini">
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Email</span> 
                        <input autocomplete="off" type="text" v-model="user.email" v-bind:class="{'form-control':true}" placeholder="Ketik email disini">
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi Baru</span>
                        <input autocomplete="off" type="password" v-model="user.password" v-bind:class="{'form-control':true}" placeholder="Ketik kata sandi sekarang">
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Konfirmasi Kata Sandi</span>
                        <input autocomplete="off" type="password" v-model="newPassword" v-bind:class="{'form-control':true}" placeholder="Ketik kata sandi user">
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="button" class="btn bg-light-orange me-3 br-10" style="background-color:#D65A40" @click="del(user)">Hapus Akun</button> 
                        <button type="submit" class="btn bg-light-orange br-10">Simpan</button>
                    </div> 
                </form>
                </div>
            </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Form_login',
    data: function () {
        return {
            verified: false,
            password:"",
            newPassword:"",
            user:[]
        }
    },
    // mounted(){
    //     this.edit()
    // },
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
        // verifyPass(password,newPassword){
        //     if(this.newPassword == password){
        //         this.verified = true;
        //     }
        // },
        updateUser(){
        axios.defaults.headers.common["token"] = localStorage.token
        return axios.put(`${process.env.VUE_APP_API_URL}/user`,{
            username: this.user.username,
            email: this.user.email,
            password: this.user.password            
        })
        .then(result =>{
            window.location = "/profil_user"
            this.user=''
        })
        },
        del(user){
            const id_user = this.user.id_user
            const DEL_USER_API_URL = `${process.env.VUE_APP_API_URL}/user/delete/`
            axios.defaults.headers.common["token"] = localStorage.token
            axios.delete(DEL_USER_API_URL + id_user)
            .then(res =>{
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