<template>
    <div class="container">
        <div class="d-flex row row-cols-1 row-cols-md-3">
            <div class="flex-shrink-1 d-none d-md-block" style="max-width:300px">
                <div class="left-col d-flex flex-column justify-content-center mb-4">
                    <!-- dummy -->
                    <div :class="{'p-4 br-15' : deviceWidth >  991.98, 'p-0 br-15' : deviceWidth<  991.98 }" style="background: #EDEDE9; max-height:1430px">
                        <img src='../assets/images/pres.png' class="profil-calon-detail mb-4" alt="dpr 2">
                        <h5 class="text-center">Nama Calon</h5>
                        <p class="mb-4 text-center">Calon Pemimpin</p>
                        <div class="row align-items-start">
                            <h6 class="col">Partai</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <img src='../assets/images/logo_partai.png' class="img-partai me-2">
                            </div>
                        </div>
                        <div class="row align-items-start mt-2">
                            <h6 class="col">Daerah Pilih</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p>Indonesia</p>
                            </div>
                        </div>
                        <div class="row align-items-start end-row-section">
                            <h6 class="col">Nomor Urut</h6>
                            <div class="col d-flex flex-wrap justify-content-end">
                                <p  v-for="calon in calons" :key="calon.no_urut">{{calon.no_urut}}</p>
                            </div>
                        </div>
                        <div class="mt-4 pb-3 end-row-section">
                            <h6 class="mb-3">Riwayat Pendidikan</h6>
                            <div class="mb-3">
                                <p>Universitas Padjadjaran</p>
                                <p class="mb-2">Hubungan internasional</p>
                                <i class="far fa-calendar-alt"></i> <span>2018</span> - <span>2019</span>
                            </div>
                        </div>
                        <div class="mt-4 pb-3">
                            <h6 class="mb-3">Riwayat Pekerjaan</h6>
                            <div>
                                <p>Wakil Kepala Bidang</p>
                                <p class="mb-2">Memimpin pengusunan operasional</p>
                                <i class="far fa-calendar-alt"></i> <span>2018</span> - <span>2019</span>
                            </div>
                        </div>
                    </div>
                    <!-- end of dummy -->

                </div>

            </div>

            <!-- riwayat on smaller devices -->
            <div class="flex-grow-1 d-sm-block d-md-none mb-4">
                <button class="btn btn-primary d-block d-xl-none btn-filter w-100 p-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <div class="d-flex flex-row mt-4">
                            <img src='../assets/images/pres.png' class="profil-calon-small mb-4 align-self-center" alt="dpr 2">
                            <div class="flex-column flex-grow-1 ps-3">
                                <h6 class="">Nama calon</h6>
                                <p class=" m-0 mb-1 low-font txt-muted">Calon Pemimpin</p>
                                <div class="row align-items-start m-0 mb-1 ">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Partai</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <img src='../assets/images/logo_partai.png' class="img-low me-1">
                                    </div>
                                </div>
                                <div class="row align-items-start m-0 mb-1">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Daerah Pilih</p>
                                    <div class="col d-flex flex-wrap justify-content-end">
                                        <p class="d-flex justify-content-end low-font m-0 mb-1">Indonesia</p>
                                    </div>
                                </div>
                                <div class="row align-items-start m-0 mb-1">
                                    <p class="col d-flex justify-content-start low-font m-0 mb-1">Nomor Urut</p>
                                    <div class="col d-flex flex-wrap justify-content-end low-font">
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p style="font-size:80%">Klik untuk melihat detail riwayat calon</p>
                    <!-- </div> -->
                </button>

                <div class="offcanvas offcanvas-end" style="width:80%" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header mt-3 pb-0">
                        <h5 id="offcanvasRightLabel">Biodata Calon</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body pt-0">
                        <div class="">
                            <div class="mt-4 pb-3 end-row-section">
                                <h6 class="mb-3">Riwayat Pendidikan</h6>
                                <div class="mb-3">
                                    <p>Universitas Padjadjaran</p>
                                    <p class="mb-2">Hubungan internasional</p>
                                    <span>2018</span> - <span>2019</span>
                                </div>
                            </div>
                            <div class="mt-4 pb-3">
                                <h6 class="mb-3">Riwayat Pekerjaan</h6>
                                <div>
                                    <p>Wakil Kepala Bidang</p>
                                    <p class="mb-2">Memimpin pengusunan operasional</p>
                                    <span>2018</span> - <span>2019</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
            <div :class="{'flex-grow-1 right-col ms-5' : deviceWidth >  991.98, 'flex-grow-1 right-col' : deviceWidth<  991.98 }">
                <div class="row">
                <!-- poster dan slogan -->
                    <div class="card text-white poster-calon mb-2 text-center">
                        <img src="../assets/images/poster.jpg" class="poster-calon" alt="dpr 2">
                        <div class="card-img-overlay d-flex justify-content-start poster-caption">
                            <p class="card-text w-100">Maju bersama bisa</p>
                        </div>
                    </div>
                
                    <div :class="{'p-4' : deviceWidth >  991.98, 'p-2' : deviceWidth<  991.98 }">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="d-flex">
                                <h6 class="me-2">Total pengikut :</h6> <h6>50</h6>
                            </span>
                            <span>
                                <button class="btn btn-outline-blue">Ikuti</button> 
                            </span> 
                        </div>
                        <!-- posts just text-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center card-text-dum-tit">Judul Post</h6>
                                <p class="card-text-dum text-muted end-row-section pb-2" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                <!-- <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="..."> -->
                                <p class="card-text-dum">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                        <!-- post with just image or video-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center card-text-dum-tit">Judul Post</h6>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text-dum text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <img src="../assets/images/poster_post2.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                </div>
                                <!-- <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p> -->
                            </div>
                        </div>                        
                        <!-- post with image and text -->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h6 class="card-title text-center card-text-dum-tit">Judul Post</h6>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text-dum text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <img src="../assets/images/poster_post2.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                </div>
                                <p class="card-text-dum">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Popup v-if="muncul" title="Anda belum masuk ke dalam sistem" pesanPopup="Apakah Anda ingin masuk?">
            <div class="d-flex justify-content-end">
            <button class="bg-light-orange-pop me-2 br-10" @click="togglePopup()">Tidak</button>
            <button class="btn-outline-orange2" @click="goToLogin()">Iya</button>
            </div>
        </Popup>
    </div>
</template>

<script>
import Popup from './Berhasil.vue'

export default {
    name :'Post_detail_calon',
    data : () => ({
        deviceWidth: window.innerWidth,
        muncul: false
    }),
   components:{
        Popup
    },
    mounted(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
    },
    methods: {
        togglePopup(){
            this.muncul = !this.muncul
        },
        goToLogin(){
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.left-col{
    border-radius: 15px;
    max-height: 70%;
}
.bg-light-orange-pop:hover,.btn-outline-orange2:hover{
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
    height: 1.8rem;
}
.btn-outline-orange2{
    color:#DDA18C;
    font-weight:400;
    border: 1px solid #DDA18C;
    min-width: 4rem;
    background: white;
    height: 1.8rem;
}
.right-col{
    background: #EDEDE9;
    border-radius: 15px;
    min-height: 100vh;
    padding: 0;
}
.profil-calon-detail{
    border-radius: 105px;
    width: 210px;
    height: 210px;
    display: flex;
    align-self: center;
    justify-self: center;
    margin: auto;
    margin-top: 20px;
}
.profil-calon-small{
    border-radius: 50%;
    width: 120px;
    height: 120px;
}
.img-partai{
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
.row{
    line-height: 130%;
    --bs-gutter-x:0;
}
.end-row-section{
    border-bottom: 1px solid #000000;
}
.poster-calon{
    border-radius: 15px 15px 0 0;
    height: 200px;
}
.poster-caption{
    top: unset;
    color: white;
    min-height: 50px;
    background: rgba(0, 0, 0, 0.61);
}
.postingan{
    min-height: 200px;
    background: #FFFFFF;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
    border-radius: 15px;
}
.img-poster-post{
    display: flex;
    justify-content: center;
    max-height: 800px;
    max-width: 400px;
}
.icons{
    color: white;
}
.icons:hover,.icons:active{
    color: #D65A40;
}
.btn-filter, .btn-filter:hover, .btn-filter:focus{
    background-color: #EDEDE9;
    color: black;
    border-radius: 15px;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.low-font{
    font-size: 80%;
}
.img-low{
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
@media (max-width: 991.98px) {
    .profil-calon-detail{
        width: 130px;
        height: 130px;
        border-radius: 50%;
        display: flex;
        align-self: center;
        justify-self: center;
        margin: auto;
        margin-top: 20px;
    }
    .left-col h5{
        font-size: 90%;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 0;   
    }
    .left-col h6{
        font-size: 80%;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 0;
    }
    .left-col p{
        font-size: 80%;
        margin-left: 10px;
        margin-right: 10px;
    }
    span{
        font-size: 80%;
        margin-left: 10px;
        margin-right: 10px;
    }
    .img-partai{
        width: 20px;
        height: 20px;
        border-radius: 50%px;
    }
    .btn-outline-blue{
        min-width: 4rem;
        max-width: 6rem;
        min-height: 2rem;
        font-size: 90%;
        padding: 2px 5px 2px 5px;
    }
    h6{
        font-size: 100%;
    }
    p{
        font-size: 100%;
    }
    .img-poster-post{
        display: flex;
        justify-content: center;
        max-height: 700px;
        max-width: 350px;
    }
    .card-text-dum{
        font-size: 70%;
    }
    .card-text-dum-tit{
        font-size: 80%;
    }
} 
@media (max-width: 410px){
    .img-poster-post{
        display: flex;
        justify-content: center;
        max-height: 500px;
        max-width: 250px;
    }
}
</style>