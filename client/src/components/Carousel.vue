<template>
<div class="container-fluid bg-dark-blue">
    <div class="container">
        <div id="carouselHome" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner br-15">
                <div class="carousel-item active">
                    <div class="row" style="padding-left:5em; padding-right:5em">
                        <div class="col-md d-flex justify-content-center">
                            <img src="../assets/images/hello.png" alt="Selamat Datang">
                        </div>
                        <div class="col-md d-flex flex-row flex-wrap justify-content-center text-center carousel-center">
                            <h2>Selamat Datang di Aplikasi Cacala!</h2> <br/>
                            <p>Mari cerdas dalam mencari, mencermati dan mengenali calon-calon Wakil Rakyat</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row" style="padding-left:5em; padding-right:5em">
                        <div class="col-md d-flex justify-content-center">
                            <img src="../assets/images/hello.png" alt="Selamat Datang">
                        </div>
                        <div class="col-md d-flex flex-row flex-wrap justify-content-center text-center carousel-center">
                            <h2>Selamat Datang di Aplikasi Cacala 2</h2> <br/>
                            <p>Mari cerdas dalam mencari, mencermati dan mengenali calon-calon Wakil Rakyat</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row" style="padding-left:5em; padding-right:5em">
                        <div class="col-md d-flex justify-content-center">
                            <img src="../assets/images/hello.png" alt="Selamat Datang">
                        </div>
                        <div class="col-md d-flex flex-row flex-wrap justify-content-center text-center carousel-center">
                            <h2>Selamat Datang di Aplikasi Cacala 3</h2> <br/>
                            <p>Mari cerdas dalam mencari, mencermati dan mengenali calon-calon Wakil Rakyat</p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselHome" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselHome" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</div>

</template>

<script>
export default {
    name:'Carousel'
}
</script>

<style scoped>
.carousel-item{
    min-height: 20rem;
    background-color: #F2F0E1;
    color:black;
    position: relative;
    border-radius: 15px;
    padding: 50px;
}
h2,p{
    color: black;
}
.carousel-indicatiors,.carousel-control-prev-icon,.carousel-control-next-icon{
    color:#9D9493;
}
.carousel-indicatiors:active{
    color: #F2F0E1;
}
.carousel-center{
    display: flex;
    vertical-align: middle;
    margin: auto;
}
p{
    font-size: 20px;
}
</style>