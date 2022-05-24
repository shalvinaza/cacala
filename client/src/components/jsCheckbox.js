new Vue({
  el: '#app',
  data: {
    calons: [
      { name: 'N19', provinsi: ['bandung', 'jakarta'], partai:['uhuy', 'mantap'] },
      { name: 'N20', provinsi: ['bandung', 'bogor'], partai:['siap', 'mantap'] },
      { name: 'N21', provinsi: ['jakarta'], partai:['siap'] },
      { name: 'N22', provinsi: ['bogor'], partai:['uhuy'] },
      { name: 'N23', provinsi: ['bandung'], partai:['mantap'] },
      { name: 'N24', provinsi: ['tanggerang'], partai:['uhuy', 'mantap','siap'] },
    ],
    checked: {
      provinsi: [],
      partai: [],
    }
  },
  computed: {
    provinsi: function() {
      return this.available('provinsi').sort((a, b) => a < b ? -1 : 1);
    },
    partai: function() {
      return this.available('partai').sort((a, b) => a < b ? -1 : 1);
    },
  },
  methods: {
    available: function(category) {
      const categorySet = new Set([]);
      for (var i = 0; i < this.calons.length; i++) {
        this.calons[i][category].forEach(el => categorySet.add(el));
      }
      return [...categorySet];
    },
    visible: function(provinsi,partai) {
      const partais = this.checked.partai.length ? _.intersection(partai, this.checked.partai).length : true;
      const provinsis = this.checked.provinsi.length ? _.intersection(provinsi, this.checked.provinsi).length : true;
      if (provinsis && partais) {
        return true;
      } else {
        return false;
      }
    }
  }
})