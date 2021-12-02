<template>
    <div class="container">
        <div class="row row-cols-3 row-cols-md-3">
            <div class="col-md-3">
            <div class="row row-cols-1 row-cols-md-1">
            <div class="col left-col d-flex justify-content-center mb-4" v-for="(calon) in calons" :key="calon.id_admin">
                <div class="p-4 br-15" style="background: #EDEDE9; max-height:1430px">
                    <img :src=calon.foto class="profil-calon-detail mb-4" alt="dpr 2">
                    <h5 class="text-center">{{calon.nama}}</h5>
                    <p class="mb-5 text-center">Calon {{calon.jabatan_tujuan}}</p>
                    <div class="row align-items-start">
                        <h6 class="col">Partai</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <img v-for="partai in calon.partai" :key="partai.nama_partai" :src=partai.logo_partai class="img-partai me-2" alt="{{partai.nama_partai}}">
                        </div>
                    </div>
                    <div class="row align-items-start">
                        <h6 class="col">Daerah Pilih</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <p>{{calon.kota}}</p>
                        </div>
                    </div>
                    <div class="row align-items-start end-row-section">
                        <h6 class="col">Nomor Urut</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <p>{{calon.no_urut}}</p>
                        </div>
                    </div>
                    <div class="mt-4 pb-3 end-row-section">
                        <h5 class="mb-3">Riwayat Pendidikan</h5>
                        <div class="mb-3" v-for="(pendidikan) in calon.riwayat_pendidikan" :key="pendidikan.id_pendidikan">
                            <h6>{{pendidikan.nama_institusi}}</h6>
                            <p class="mb-2">{{pendidikan.detail_pendidikan}}</p>
                            <i class="far fa-calendar-alt"></i> <span>{{pendidikan.tahun_mulai_pendidikan}}</span> - <span>{{pendidikan.tahun_selesai_pendidikan}}</span>
                        </div>
                    </div>
                    <div class="mt-4 pb-3">
                        <h5 class="mb-3">Riwayat Pekerjaan</h5>
                        <div v-for="(pekerjaan) in calon.riwayat_pekerjaan" :key="pekerjaan.id_pekerjaan">
                            <h6>{{pekerjaan.nama_pekerjaan}}</h6>
                            <p class="mb-2">{{pekerjaan.detail_pekerjaan}}</p>
                            <i class="far fa-calendar-alt"></i> <span>{{pekerjaan.tahun_mulai_pekerjaan}}</span> - <span>{{pekerjaan.tahun_selesai_pekerjaan}}</span>
                        </div>
                    </div>
                </div>
            </div>

            </div>

            </div>
            <!-- this is just for divider -->
            <div class="col-md-1">
            </div>
            <!-- end of divider -->
            <div class="col-md-8 right-col" v-for="calon in calons" :key="calon.id_calon">
                <div class="row">
                <!-- poster dan slogan -->
                    <div class="card text-white poster-calon mb-2 text-center">
                        <img src="../assets/images/poster.jpg" class="poster-calon" alt="dpr 2">
                        <div class="card-img-overlay d-flex justify-content-start poster-caption">
                            <p class="card-text w-100">{{calon.slogan}}</p>
                        </div>
                    </div>
                    <div class="p-4">
                        <!-- posts just text-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <p class="card-text text-muted end-row-section pb-2" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                <!-- <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="..."> -->
                                <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                        <!-- post with just image or video-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <p class="card-text text-muted end-row-section pb-2" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                <img src="../assets/images/poster_post2.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                <!-- <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p> -->
                            </div>
                        </div>                        
                        <!-- post with image and text -->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <p class="card-text text-muted end-row-section pb-2" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

// this.id_calon = this.$route.params.id_calon;
// const CALON_API_URL = `${process.env.VUE_APP_API_URL}/calon/` + id_calon;
// const DPD_API_URL = `http://localhost:3000/calon/` + id_calon;

export default {
    name :'Post_detail_calon',
    data : () => ({
        no_data: false,
        calons: []
    }),
    created(){
        const id_admin = this.$route.params.id_admin;
        const DPD_API_URL = `http://localhost:3000/calon/` + id_admin;
        fetch(`${process.env.VUE_APP_API_URL}/calon/${id_admin}`)
            .then(response => response.json())
            .then(result => {
                this.calons = result;
            })
            .catch(error => {
                if(calons==null){
                    this.no_data = true;
                }
            });
    }
}
</script>

<style scoped>
.left-col{
    border-radius: 15px;
    min-height: 100vh;
}
.right-col{
    background: #EDEDE9;
    border-radius: 15px;
    min-height: 100vh;
    padding: 0;
}
.profil-calon-detail{
    border-radius: 50%;
    max-width: 210px;
    max-height: 210px;
}
.img-partai{
    max-width: 22px;
    max-height: 22px;
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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
}
.img-poster-post{
    max-height: 800px;
}
.icons{
    color: white;
}
.icons:hover,.icons:active{
    color: #D65A40;
}
</style>