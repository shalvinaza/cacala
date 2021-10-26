<template>
    <div class="container">
        <h1 class="text-center pb-4 mb-5">Pasangan Presiden dan Wakil Presiden</h1>
        <div class="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
            <div class="col">
                <div class="card h-100">
                    <img src="../assets/images/pres.png" class="card-img-top" alt="pres 2">
                    <div class="card-body p-4">
                        <h5 class="card-title text-center">Nama Calon Presiden & Calon Wakil Presiden</h5>
                        <div class="row align-items-start mb-4">
                            <h6 class="col-md-3 card-title">Partai Koalisi</h6>
                            <div class="col-md-9 d-flex justify-content-end">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                            </div>
                        </div>
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <button class="btn btn-outline-orange">Detail</button>
                            </div>
                            <div class="col">
                                <button class="btn btn-outline-orange">Ikuti</button>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
                        <div class="col">
                <div class="card h-100">
                    <img src="../assets/images/pres.png" class="card-img-top" alt="pres 2">
                    <div class="card-body p-4">
                        <h5 class="card-title text-center">Nama Calon Presiden & Calon Wakil Presiden</h5>
                        <div class="row align-items-start mb-4">
                            <h6 class="col-md-3 card-title">Partai Koalisi</h6>
                            <div class="col-md-9 d-flex justify-content-end">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                                <img src="../assets/images/logo_partai.png" class="img-partai me-1" alt="pres 2">
                            </div>
                        </div>
                        <div class="row d-flex align-items-center">
                            <div class="col">
                                <button class="btn btn-outline-orange">Detail</button>
                            </div>
                            <div class="col">
                                <button class="btn btn-outline-orange">Ikuti</button>
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
    name: 'All_capres',
}
</script>

<style scoped>
h1{
    letter-spacing: 0.10em;
    font-weight: 700;
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
.btn-outline-orange{
    color:#DDA18C;
    border-color: #DDA18C;
}
.btn-outline-orange:hover{
    color:white;
    background-color: #D65A40;
}
</style>