<template>
<div class="container-fluid bg-dark-blue">
    <div id="carouselHome" class="container carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../assets/images/hello.png" class="text-center" alt="Selamat Datang">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Selamat Datang di Aplikasi Cacala</h5>
                    <p>Mari cerdas dalam mencari, mencermati dan mengenali calon-calon Wakil Rakyat</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../assets/images/hello.png" alt="Selamat Datang">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Selamat Datang di Aplikasi Cacala 2</h5>
                    <p>Mari cerdas dalam mencari, mencermati dan mengenali calon-calon Wakil Rakyat</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../assets/images/hello.png" alt="Selamat Datang">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Selamat Datang di Aplikasi Cacala 3</h5>
                    <p>Mari cerdas dalam mencari, mencermati dan mengenali calon-calon Wakil Rakyat</p>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselHome" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselHome" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>

</template>

<script>
export default {
    name:'Carousel'
}
</script>

<style scoped>
#carouselHome{
    background-color: #F2F0E1;
    color: black;
}
h5,p{
    color: black;
}
</style>