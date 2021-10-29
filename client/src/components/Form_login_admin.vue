<template>
  <div class="container">
          <div class="row">
            <div class="col-md left flex-row flex-wrap justify-content-center text-center">
                <img src="../assets/images/add.png" alt="Masuk">
                <p class="mt-3">Masuk  dan buat informasi kampanye kreatif yang akan disajikan kepada pengguna</p>
            </div>
            <div class="col-md right flex-row d-md-block flex-wrap">
                <h4 class="bold text-center mb-5">Masuk sebagai admin</h4>
                <div class="form-data" v-if="!submitted" id="form1">
                    <div class="forms-inputs mb-4"> 
                        <span>Nama</span> 
                        <input id="email_user" autocomplete="off" type="text" v-model="uname" v-bind:class="{'form-control':true, 'is-invalid' : !validUname(uname) && unameBlured}" v-on:blur="unameBlured = true" placeholder="Ketik nama di sini">
                        <div class="invalid-feedback">Nama tidak boleh kosong!</div>
                    </div>
                    <div class="forms-inputs mb-4"> 
                        <span>Kata Sandi</span>
                        <input id="pass_user" autocomplete="off" type="password" v-model="password" v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}" v-on:blur="passwordBlured = true" placeholder="Ketik kata sandi di sini">
                        <div class="invalid-feedback">Password minimal 8 karakter!</div>
                    </div>
                    <div class="mb-3"> 
                        <button v-on:click.stop.prevent="submit" type="submit" class="btn bg-light-orange w-100 br-10">Masuk</button> 
                    </div>
                </div>
                <button type="button" @click="goToLoginUser()" class="btn btn-outline-orange2 w-100 br-10">Masuk sebagai pengguna</button> 
            </div>
          </div>
  </div>
</template>

<script>
export default {
    name:'Form_login',
    data: function () {
        return {
            uname : "",
            unameBlured : false,
            valid : false,
            submitted : false,
            password:"",
            passwordBlured:false
            }
    },
    methods:{
        validate : function(){
            this.unameBlured = true;
            this.passwordBlured = true;
            if( this.validUname(this.uname) && this.validPassword(this.password)){
                this.valid = true;
                }
        },
        validUname : function(uname) {
            if(uname.length > 0){
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