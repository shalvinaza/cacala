<template>
    <div id="caraPenggunaan" class="cara container-fluid bg-dark-blue">
        <div class="container d-md-block align-items-center pt-5">
            <div class="row">
                <h2 class="extra-bold mb-5" style="color:white">Cara Penggunaan</h2>
            </div>
            <div class="row row-cols-2 row-cols-md-4 g-3">
                <div class="col">
                    <div class="card">
                        <img src="../assets/images/step_1.png" class="card-img-top p-4" alt="step 1">
                        <div class="card-body d-inline-flex align-items-start p-3">
                            <h5 class="card-title me-2">1</h5>
                            <p class="card-text">Klik salah satu jenis pemilu yang Anda inginkan pada menu</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="../assets/images/step_2.png" class="card-img-top p-4" alt="step 1">
                        <div class="card-body d-inline-flex align-items-start p-3">
                            <h5 class="card-title me-2">2</h5>
                            <p class="card-text">Eksplorasi secara umum keseluruhan calon yang ada</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="../assets/images/step_3.png" class="card-img-top p-4" alt="step 1">
                        <div class="card-body d-inline-flex align-items-start p-3">
                            <h5 class="card-title me-2">3</h5>
                            <p class="card-text">Klik detail pada kartu salah satu calon lalu ikuti jika Anda berkenan </p>
                        </div>
                    </div>
                </div>
                <div class="col mb-4">
                    <div class="card">
                        <img src="../assets/images/step_4.png" class="card-img-top p-4" alt="step 1">
                        <div class="card-body d-inline-flex align-items-start p-3">
                            <h5 class="card-title me-2">4</h5>
                            <p class="card-text">Cermati informasi detail dari calon yang dipilih</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Cara_penggunaan'
}
</script>

<style scoped>
.container{
    min-height: 34rem;
    color: black;
    font-weight: 600;
}
.card{
    border-radius: 15px;
    background-color: #F2F0E1;
    height: 22rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border:none;
}
p{
    font-size: 16px;
}
.card-img-top{
    height: 250px;
    width: 250px;
    display: flex;
    justify-self: center;
    margin: auto;
}
@media (max-width: 1200px) {
    .card-img-top{
        width: 200px;
        height: 200px;
    }
    
}
@media (min-width: 768px) and (max-width: 992px) { 
  p{
    font-size: 90%;
  }
  h2{
    font-size: 100%;
  }
    .card-img-top{
        width: 150px;
        height: 150px;
    }
    .card{
        height: 19rem;
    }
 }
 
 @media (max-width: 768px) {
    .card-img-top{
        width: 150px;
        height: 150px;
    }
    p{
        font-size: 80%;
    }
    .card{
        height: 18rem;
    }
    h2{
        font-size: 100%;
    }
  }
</style>