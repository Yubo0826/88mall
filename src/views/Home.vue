<template>
  <div class="home">
    <div class="baaner-container">
      <carousel :autoplay="4000" :items-to-show="1" wrapAround="true" transition="600">
        <slide v-for="slide in bannerArr" :key="slide">
          <img :src="require('../assets/image/' + slide)" alt="" class="carousel__item">
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
    <ProductList :arr="productsArr"></ProductList>
    <!-- <button @click="yyd"></button> -->

  </div>
</template>

<script>
import ProductList from '@/components/Product-list.vue';
import { getAllProds, yyd } from '@/request/api.js';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: 'Home',
  components:  {
    ProductList, Carousel, Slide, Pagination, Navigation
  },
  data() {
    return {
      productsArr: [],
      bannerArr: ['banner.png', 'banner.png', 'banner.png', 'banner.png'],
    }
  },
  created() {
    // console.log(this.productsArr);
    getAllProds().then((data) => {
      console.log(data);
      this.productsArr = data;
    })
  },
  methods: {
    'yyd': function() {
      yyd();
    }
  },
}
</script>

<style lang="less">
.home {
  .baaner-container {
    .carousel__item {
      min-height: 500px;
      width: 100%;
    }

    .carousel__slide {
      padding: 10px;
    }

    .carousel__prev,
    .carousel__next {
      box-sizing: content-box;
      border: 5px solid white;
      transform: translate(0,0);
    }
  }
}
</style>
