<template>
  <div class="home">
    <Navbar/>
    <div class="content">
      <Carousel style="padding:120px 0 70px 0"/>
      <About_us/>
      <Cara_penggunaan/>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Carousel from '@/components/Carousel.vue'
import About_us from '@/components/About_us.vue'
import Cara_penggunaan from '@/components/Cara_penggunaan.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Carousel,
    About_us,
    Cara_penggunaan,
    Footer
  }
}
</script>
