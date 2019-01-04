// pages/swiper/swiper.js
var banner = require("../../src/js/banner.js");
Page({
  data: {
    indicatorDots: false,
    vertical: true,
    autoplay: false,
    interval: 3000,
    duration: 800,
    banner_url: banner.bannerList
  },
  autoplaySwiper(e){
    this.setData({ autoplay: !this.data.autoplay});
  }
})