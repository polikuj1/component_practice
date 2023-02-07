const app = Vue.createApp({
  data () {
    return {
      
    }
  },
  methods: {
    change() {
      this.show = false;
    },
  },
})

app.component('homePage',{
  // props: ['home'],
  template:
  `<div class="head">
  <h2>百年竹塹風華</h2>
  <img src="img/10.鹿鹿封面.jpg" alt="">
  <img src="img/9110352.jpg" alt="">
</div>
<div class="box">
      <div class="wrap"></div>
      <div class="attrations">
        <a href="site.html" ><h4>觀光景點</h4></a>
      </div>
      <div class="hotel">
        <a href="hotel.html"><h4>住宿飯店</h4></a>
      </div>
      <div class="food">
        <a href="food.html"><h4>在地小吃</h4></a>
      </div>
      <div class="activity">
        <a href="art.html"><h4>藝文活動</h4></a>
      </div>
    </div>`,
  data() {
    return {

    }
  },
  methods: {
    change() {
      this.$emit('change')
    },
  }
})

app.mount('#app');