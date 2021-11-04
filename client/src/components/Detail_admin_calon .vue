<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 left-col d-flex justify-content-center">
                <div class="p-4 br-15" style="background: #EDEDE9; max-height:1430px">
                    <img src="../assets/images/dpr.jpg" class="profil-calon-detail mb-4" alt="dpr 2">
                    <h5 class="text-center">Nama Calon</h5>
                    <p class="mb-5">Calon DPR Republik Indonesia</p>
                    <div class="row align-items-start">
                        <h6 class="col">Partai</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="dpr 2">
                        </div>
                    </div>
                    <div class="row align-items-start">
                        <h6 class="col">Daerah Pilih</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <p>Kota Kota</p>
                        </div>
                    </div>
                    <div class="row align-items-start end-row-section">
                        <h6 class="col">Nomor Urut</h6>
                        <div class="col d-flex flex-wrap justify-content-end">
                            <p>1</p>
                        </div>
                    </div>
                    <div class="mt-4 pb-3 end-row-section">
                        <h5 class="mb-3">Riwayat Pendidikan</h5>
                        <h6>Universitas Padjadjaran</h6>
                        <p class="mb-2">Fakultas Ilmu Politik</p>
                        <span><i class="far fa-calendar-alt"></i> 2000 - 2004</span>

                        <h6 class="mt-3">SMA Negeri 5</h6>
                        <p class="mb-2">Kota Bandung</p>
                        <span><i class="far fa-calendar-alt"></i> 1997 - 2000</span>

                        
                        <h6 class="mt-3">SMP Negeri 20</h6>
                        <p class="mb-2">Kota Bandung</p>
                        <span><i class="far fa-calendar-alt"></i> 1994 - 1997</span>
                    </div>
                    <div class="mt-4 pb-3">
                        <h5 class="mb-3">Riwayat Pekerjaan</h5>
                        <h6>Kepala Desa</h6>
                        <p class="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <span><i class="far fa-calendar-alt"></i> 2000 - 2004</span>

                        <h6 class="mt-3">Kepala Cabang</h6>
                        <p class="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <span><i class="far fa-calendar-alt"></i> 1997 - 2000</span>

                        
                        <h6 class="mt-3">Manajer Produk</h6>
                        <p class="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <span><i class="far fa-calendar-alt"></i> 1994 - 1997</span>
                    </div>
                </div>
            </div>
            <!-- this is just for divider -->
            <div class="col-md-1">
            </div>
            <!-- end of divider -->
            <div class="col-md-8 right-col">
                <div class="row">
                <!-- poster dan slogan -->
                    <div class="card text-white poster-calon mb-2 text-center">
                        <img src="../assets/images/poster.jpg" class="poster-calon" alt="dpr 2">
                        <div class="card-img-overlay d-flex justify-content-start poster-caption">
                            <p class="card-text me-3 w-100">“Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...”</p>
                            <span class="card-text icons"><i class="fas fa-edit"></i></span>
                        </div>
                    </div>
                    <div class="p-4">
                        <!-- part create post -->
                        <button type="button" class="btn bg-light-orange br-10 mb-3">Mulai siaran langsung</button>
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center mb-4">Apa kabar tebaru dari Anda?</h5>
                                <form>
                                    <div class="forms-inputs mb-4"> 
                                        <span>Judul unggahan</span> 
                                        <input id="judul_post" class="w-100 p-3" autocomplete="off" type="text" v-model="judul_post" placeholder="Ketik email di sini">
                                        <!-- <div class="invalid-feedback">Email harus valid!</div> -->
                                    </div>
                                    <div class="forms-inputs mb-3"> 
                                        <span>Teks unggahan</span>
                                        <textarea id="teks_post" class="w-100 p-3" autocomplete="off" v-model="text_post" placeholder="Ketik kata sandi di sini"></textarea>
                                        <!-- <div class="invalid-feedback">Password minimal 8 karakter!</div> -->
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span class="card-text icons me-3"><i class="fas fa-images"></i></span>
                                        <span class="card-text icons flex-grow-2 w-100"><i class="fas fa-video"></i></span>
                                        <!-- <button v-on:click.stop.prevent="submit" type="submit" class="btn bg-light-orange w-100 br-10">Masuk</button>  -->
                                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button> 
                                    </div>
                                </form>                           
                            </div>
                        </div> 
                        <!-- posts just text-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><i class="fas fa-edit"></i></span>
                                    <span class="card-text icons"><i class="fas fa-trash"></i></span>
                                </div>
                                <!-- <img src="../assets/images/poster_post.jpg" class="w-100 img-poster-post mb-3" alt="..."> -->
                                <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>
                            </div>
                        </div>
                        <!-- post with just image or video-->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><i class="fas fa-edit"></i></span>
                                    <span class="card-text icons"><i class="fas fa-trash"></i></span>
                                </div>
                                <img src="../assets/images/poster_post2.jpg" class="w-100 img-poster-post mb-3" alt="...">
                                <!-- <p class="card-text">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p> -->
                            </div>
                        </div>                        
                        <!-- post with image and text -->
                        <div class="card w-100 postingan p-3 mb-3">
                            <div class="card-body p-0">
                                <h5 class="card-title text-center">Judul Post</h5>
                                <div class="d-flex end-row-section w-100 p-0 mb-3 pb-2">
                                    <p class="card-text text-muted m-0 flex-grow-2 w-100" style=""><i class="far fa-calendar-alt"></i>  <small>19/08/2021</small></p>
                                    <span class="card-text icons me-2"><i class="fas fa-edit"></i></span>
                                    <span class="card-text icons"><i class="fas fa-trash"></i></span>
                                </div>
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
export default {
    name :'Post_detail_calon',
    data: function () {
        return {
            judul_post:"",
            teks_post:" "
        }   
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
    color: #DDA18C;
}
.icons:hover,.icons:active{
    color: #D65A40;
}
.forms-inputs, .forms-textarea {
    position: relative;
}
.forms-inputs span {
    position: absolute;
    top: -18px;
    left: 10px;
    background-color: #fff;
    padding: 5px 10px;
}
.forms-inputs input, textarea {
    border: 2px solid #9D9493;
    border-radius:10px;
}
.forms-inputs input:focus, textarea:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #D65A40;
}
</style>