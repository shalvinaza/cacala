<template>
    <div class="container-fluid bg-orange">
        <div class="container d-flex">
            <div class="row align-items-center">
                <div class="col-md" style="padding-right:2rem">
                    <h1 class="extra-bold" style="letter-spacing: 0.45em;">CACALA</h1><br/>
                    <p>Cacala merupakan aplikasi berbasis website  yang menghimpun informasi kampanye dari seluruh calon-calon Wakil Rakyat, baik calon Presinden dan Wakil Presiden, DRP RI, DPD RI, DPRD Provinsi, dan DPRD Kabupaten/Kota</p>
                </div>       
                <div class="col-md d-flex justify-content-center ">
                    <img src="../assets/images/about_us.png" class="w-100 img-car" alt="About Us img-car"> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'About_us'
}
</script>

<style scoped>
.container-fluid{
    color: white;
}
.container{
    min-height: 34rem;
}
p{
    font-size: 20px;
}
.img-car{
    max-width: 70%;
}
@media (min-width: 768px) and (max-width: 992px) { 
  p{
    font-size: 100%;
  }
  h1{
    font-size: 120%;
  }
 }
 @media (max-width: 768px) {
    .img-car{
        max-width: 60%;
    }
    p{
        font-size: 90%;
    }
    h1{
        font-size: 110%;
    }
  }
</style>