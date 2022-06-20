<template>
  <div class="home" id="home">
    <Navbar/>
      <Alert v-if="alertShow" variantName="success" messageProps="Berhasil masuk"/>
      <Carousel style="padding:120px 0 70px 0"/>
      <About_us/>
      <Cara_penggunaan class="cara"/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Alert from "@/components/Pop_sukses.vue"
import Carousel from '@/components/Carousel.vue'
import About_us from '@/components/About_us.vue'
import Cara_penggunaan from '@/components/Cara_penggunaan.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Alert,
    Carousel,
    About_us,
    Cara_penggunaan,
    Footer
  },
  data: () => ({
    alertShow : false,
    // dismissSecs: 0,
    // dismissCountDown: 0
  }),
  computed:{
    openSukses: function(){
      return localStorage.getItem('sukses')
    }
  },
  mounted(){
    if(this.openSukses){
      this.showAlert()
    }
  },
  methods:{
    showAlert() {
      this.alertShow = this.openSukses
      localStorage.removeItem('sukses')
      this.alertShow != this.alertShow
    }
  }
}
</script>
