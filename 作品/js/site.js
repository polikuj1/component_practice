const app = Vue.createApp({
  data() {
    return {
      site: false,
      food: false,
      jsonData: [],
      renderData: [],
      url : 'https://picsum.photos/200/100?random=',
      pageTotal: 0,
      currentPage: 0,
      perPage: 0,
    }
  },
  methods: {
    open() {
      this.site = true;
    },
    close() {
      this.site = false;
    },
    foodOpen() {
      this.food = true;
    },
    foodClose() {
      this.food = false;
    },
    render(page,search) {
      this.renderData = [];
      const total = this.jsonData.length;
      this.perPage = 8;
      this.currentPage = page;
      this.pageTotal = Math.ceil(total / this.perPage);
      const maxData = page * this.pageTotal ;
      const minData = page * this.pageTotal - this.pageTotal +1;
      this.jsonData.forEach((item,index)=> {
        let num = index +1;
        if (num >= minData && num <= maxData) {
          this.renderData.push(item);
        }
      })
      // 導覽列的快速瀏覽各主題
      // 如果傳入空字串，代表是一般的點擊換頁。反之是快速瀏覽各主題
      if(search !== '') {
        this.renderData = this.jsonData.filter(item => item.type == search);
        this.pageTotal = 1;
      }
    },
    selectPage(page) {
      this.render(page,'');
    },
    nextPage() {
      this.render(this.currentPage + 1,'');
    },
    lastPage() {
      this.render(this.currentPage - 1,'');
    },
    // 先取得子元件傳來的主題用判斷字串，才有辦法去篩選出對應的主題字串資料(像是古蹟、博物館)
    getSearch(txt) {
      this.render(1,txt);
    }
  },
  created() {
    fetch("./site.json")
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.jsonData = jsonData;
        this.render(1,'');
      })
      .catch(err => console.log(err))
  }
})

app.component('navBar',{
  props:['status','status1'],
  template:
  `<div class="nav"><h2>新竹縣觀光景點</h2>
  <ul>
    <a href="home.html" @mousemove="mouseOut">
    <li>首頁</li>
    </a>
    <a href="site.html" @mousemove="mouseOver">
    <li>觀光景點一覽</li>
    <div class="nav-box" v-show="status">
      <div class="wrap" @mouseout="mouseOut">
        <div class="box" @click.prevent="clickTheme('oldBuilding')">
          <div class="title">
          <a href="#"><h4>古蹟</h4></a>
          </div>
          <div class="pic">
            <img src="https://tourism.hccg.gov.tw/tourism555/program_img/hot/hotS/2021011416540532950.jpeg" alt="新竹車站">
          </div>
        </div>
        <div class="box" @click.prevent="clickTheme('natural')">
          <div class="title">
          <a href="#"><h4>自然風景</h4></a>
          </div>
          <div class="pic">
            <img src="https://cdn.yiwu.com.tw/wp-content/uploads/20200601104641_27.jpg" alt="">
          </div>
        </div>
        <div class="box" @click.prevent="clickTheme('temple')">
          <div class="title">
            <a href="#"><h4>寺廟</h4></a>
          </div>
          <div class="pic">
            <img src="https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/201811/article-5be2c3ddca6c3.jpg" alt="">
          </div>
        </div>
        <div class="box" @click.prevent="clickTheme('museum')">
          <div class="title">
            <a href="#"><h4>美術館、博物館</h4></a>
          </div>
          <div class="pic">
            <img src="https://hsinchucitymuseum.hccg.gov.tw/upload/collection/2022-08-23/cbff0045-7482-4a81-8fac-8f64b0209250/02_%E7%BE%8E%E8%A1%93%E9%A4%A8%E4%B8%BB%E9%A0%81%E9%9D%A2.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    </a>
    <a href="food.html" @mousemove="mouseOut" class="food" @mouseover="openFood">
    <li>在地小吃</li>
    <div class="nav-box food-box" v-show="status1">
      <div class="wrap" @mouseout="closeFood">
        <div class="box">
          <div class="title">
            <h4>廟口鴨香飯</h4>
          </div>
          <div class="pic">
            <img src="https://candicecity.com/wp-content/uploads/2021/05/DSC08860.jpg" alt="新竹車站">
          </div>
        </div>
        <div class="box">
          <div class="title">
            <h4>黃媽媽豆瓣麵</h4>
          </div>
          <div class="pic">
            <img src="https://blog.kkday.com/wp-content/uploads/%E9%BB%83%E5%AA%BD%E5%AA%BD%E8%B1%86%E7%93%A3%E9%BA%B5.jpg" alt="">
          </div>
        </div>
        <div class="box">
          <div class="title">
            <h4>北門炸粿</h4>
          </div>
          <div class="pic">
            <img src="https://blog.kkday.com/wp-content/uploads/IMG_1343.jpg" alt="">
          </div>
        </div>
        <div class="box">
          <div class="title">
            <h4>四神湯虎咬豬</h4>
          </div>
          <div class="pic">
            <img src="https://blog.kkday.com/wp-content/uploads/IMG_1345.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    </a>
    <a href="art.html" @mousemove="closeFood"><li>藝文活動</li></a>
    <a href="hotel.html"><li>住宿飯店</li></a>
    <slot></slot>
  </ul>
</div>`,
  data() {
    return {
      
    }
  },
  methods: {
    mouseOver() {
      this.$emit('open');
      this.closeFood();
    },
    mouseOut() {
      this.$emit('close');
    },
    openFood() {
      this.$emit('food');
    },
    closeFood() {
      this.$emit('food1');
    },
    // 選定快速瀏覽主題時，將主題的字串傳入，再傳去主元件
    clickTheme(search) {
      console.log(search);
      this.$emit('old',search);
    }
  }
})

app.mount('#app')