<template>
    <footer class="d-flex bg-dark-blue">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-9 pt-2">
                    <p>&copy; Cacala | Komisi Pemilihan Umum Republik Indonesia</p>
                </div>
                <div class="col-lg-3 d-flex justify-content-end align-items-center">
                    <font-awesome-icon icon="fa-brands fa-facebook-square" class="me-2"/>
                    <font-awesome-icon icon="fa-brands fa-twitter-square" class="me-2"/>
                    <font-awesome-icon icon="fa-brands fa-instagram" class="me-2"/>
                    <a  >Kontak Pengaduan</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
footer{
    /* position: relative; */
    color: white;
}
</style>