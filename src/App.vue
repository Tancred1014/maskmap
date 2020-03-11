<template>
  <div>
    <div class="header">
      <div class="banner bg-cover">
        <div class="container-fluid">
          <div class="row">
            <div class="header-box col-md-8 mx-auto">
              <div class="bg-trans text-light py-5 px-5">
                <div class="search-input-group">
                  <h1 class="text-center display-4">全臺口罩查詢</h1>
                  <select
                    id="cityName"
                    v-model="select.cityName"
                    @change="select.areaName = ''"
                  >
                    <option value="" disabled>請選擇</option>
                    <option
                      v-for="city in cities"
                      :key="city.CityName"
                      :value="city.CityName"
                    >
                      {{ city.CityName }}
                    </option>
                  </select>
                </div>
                <div class="search-input-group">
                  <select id="areaName" v-model="select.areaName">
                    <option value="" disabled>請選擇</option>
                    <option
                      v-for="area in cities.find(
                        city => city.CityName === select.cityName
                      ).AreaList"
                      :key="area.AreaName"
                      :value="area.AreaName"
                    >
                      {{ area.AreaName }}
                    </option>
                  </select>
                </div>
                <a href="#one" class="btn btn-light mx-auto">確定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container2">
      <!-- <div> -->
      <h2 class="title" id="one">
        {{ this.select.cityName }}{{ this.select.areaName }}
      </h2>
      <!-- </div> -->
      <div class="row" v-if="filterfeatures.length !== 0">
        <div
          class="section col-md-6"
          v-for="item in filterfeatures"
          :key="item.id"
        >
          <div class="box">
            <h3 class="name">{{ item.properties.name }}</h3>
            <div class="text">
              <p class="mask_adult">
                成人口罩剩餘：{{ item.properties.mask_adult }}
              </p>
              <p class="mask_child">
                兒童口罩剩餘：{{ item.properties.mask_child }}
              </p>
              <p class="address">地址：{{ item.properties.address }}</p>
              <p class="tel">電話：{{ item.properties.phone }}</p>
              <p class="tag">販售時段：{{ item.properties.note }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-data text-center display-4 my-3">
        沒有資料 或 請選擇地區
      </div>
    </div>
  </div>
</template>

<script>
import cities from "./assets/cities.json";
export default {
  data() {
    return {
      cities,
      features: [],
      select: {
        cityName: "新北市",
        areaName: "永和區"
      }
    };
  },
  methods: {
    getFeatures(page = 1) {
      const vm = this;
      const api =
        "http://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";
      this.$http.get(api).then(response => {
        vm.data = response.data;
        console.log("藥局", vm.data);
        vm.features = vm.data.features;
      });
    }
  },
  computed: {
    filterfeatures() {
      const { cityName, areaName } = this.select;
      return this.features.filter(
        feature =>
          feature.properties.county === cityName &&
          feature.properties.town === areaName
      );
    }
  },
  // mounted() {},
  created() {
    this.getFeatures();
  }
};
</script>

<style lang="scss">
.banner {
  background-image: url(https://images.unsplash.com/photo-1495202337139-e865ed70fcd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80);
  max-width: 100vw;
  min-height: 100vh;
  background-position: center center;
  background-size: cover;
}
.header-box {
  margin-top: 20vh;
}
.bg-trans {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.btn-light {
  display: block;
  width: 25%;
  margin-right: auto;
  margin-left: auto;
}
.container2 {
  position: relative;
  // width: 962px;
  top: 76px;
  background-color: #fdf7dd;
  margin: 0 auto;
  overflow: hidden;
  clear: both;
}
.search-input-group {
  // position: relative;
  // width: 1024px;
  // top: 50px;
  margin: 0 auto;
  overflow: hidden;
  clear: both;
}

select {
  background: rgba(247, 207, 255, 0.7);
  border: 3px solid #ffffff;
  border-radius: 5px;
  width: 425px;
  align-content: center;
  font-family: 微軟正黑體;
  font-size: 18px;
  color: #000000;
  line-height: 21px;
  display: block;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: auto;
}
.section {
  // min-height: 100%;
  margin: 18px 0px;
  position: relative;
}
h2 {
  height: 100%;
  font-family: 微軟正黑體;
  font-size: 36px;
  color: #000000;
  text-align: center;
  margin-bottom: 36px;
}
.box {
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  float: left;
  overflow: hidden;
}

h3 {
  float: left;
  font-family: 微軟正黑體;
  font-size: 24px;
  // color: #ffffff;
  position: relative;
  left: 22px;
}

h5 {
  float: right;
  font-family: 微軟正黑體;
  font-size: 16px;
  // color: #ffffff;
  position: relative;
  right: 24px;
}

.text {
  clear: both;
  box-sizing: border-box;
  padding: 15px 23px 10px;
  position: relative;
  // top: -145px;
  font-family: 微軟正黑體;
  font-size: 16px;
  color: #000000;
  background: #fff;
  overflow: hidden;
}
</style>
