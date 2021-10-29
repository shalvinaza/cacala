<template>
  <div class="container">
      <h1 class="text-center pb-4 mb-4">Calon yang Diikuti</h1>
      <div class="d-flex d-inline-row pb-3 mb-4">
          <a href="#" class="me-3" style="color: #D65A40;">Presiden</a>
          <a href="#" class="me-3">DPR RI</a>
          <a href="#" class="me-3">DPD RI</a>
          <a href="#" class="me-3">DPRD Provinsi</a>
          <a href="#" class="me-3">DPRD Kabupaten/Kota</a>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
            <div class="col">
                <div class="card h-100">
                    <h3 class="card-img-overlay p-4">1</h3>
                    <img src="../assets/images/pres.png" class="card-img-top" alt="pres 2">
                    <div class="card-body p-4">
                        <h5 class="card-title text-center mb-3">Nama Calon Presiden & Calon Wakil Presiden</h5>
                        <div class="row align-items-start mb-4">
                            <p class="col-md-5 d-flex flex-wrap card-title">Partai Koalisi</p>
                            <div class="col-md-7 d-flex flex-wrap justify-content-end">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                            </div>
                        </div>
                        <div class="d-flex justify-content-center justify-content-between">
                            <button class="btn btn-outline-orange">Detail</button>
                            <button class="btn btn-outline-blue">Ikuti</button>                        
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <img src="../assets/images/pres.png" class="card-img-top" alt="pres 2">
                    <div class="card-body p-4">
                        <h5 class="card-title text-center mb-3">Nama Calon Presiden & Calon Wakil Presiden</h5>
                        <div class="row align-items-start mb-4">
                            <p class="col-md-5 d-flex flex-wrap card-title">Partai Koalisi</p>
                            <div class="col-md-7 d-flex flex-wrap justify-content-end">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                            </div>
                        </div>
                        <div class="d-flex justify-content-center justify-content-between">
                            <button class="btn btn-outline-orange">Detail</button>
                            <button class="btn btn-outline-blue">Ikuti</button>                        
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <img src="../assets/images/pres.png" class="card-img-top" alt="pres 2">
                    <div class="card-body p-4">
                        <h5 class="card-title text-center mb-3">Nama Calon Presiden & Calon Wakil Presiden</h5>
                        <div class="row align-items-start mb-4">
                            <p class="col-md-5 d-flex flex-wrap card-title">Partai Koalisi</p>
                            <div class="col-md-7 d-flex flex-wrap justify-content-end">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai m-1" alt="pres 2">
                            </div>
                        </div>
                        <div class="d-flex justify-content-center justify-content-between">
                            <button class="btn btn-outline-orange">Detail</button>
                            <button class="btn btn-outline-blue">Ikuti</button>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'My_dasbor'

}
</script>

<style scoped>
a{
    color: black;
    font-weight: 600;
}
a:hover,a:active{
    color: #D65A40;
}
h1{
    letter-spacing: 0.10em;
    font-weight: 700;
}
.d-inline-row{
    border-bottom: 2px solid black;
}
.card{
    background-color: #F2F0E1;
    border-radius: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border:none;
    /* min-height: 35rem; */
}
.card-img-top{
    border-radius: 15px 15px 0 0;   
}
.img-partai{
    max-width: 22px;
    max-height: 22px;
    border-radius: 15px;
}
</style>