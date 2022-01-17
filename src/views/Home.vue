<template>
  <div class="home">
    <div class="baaner-container">
      <carousel :autoplay="4000" :items-to-show="1" wrapAround="true" transition="600">
        <slide v-for="slide in bannerArr" :key="slide">
          <img :src="require('../assets/image/banners/' + slide)" alt="" class="carousel__item">
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
    <div class="list-wrap">
      <ProductList></ProductList>
    </div>
    <!-- <button @click="yyd"></button> -->

  </div>
</template>

<script>
import ProductList from '@/components/Product-list.vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  name: 'Home',
  components:  {
    ProductList, Carousel, Slide, Pagination, Navigation
  },
  data() {
    return {
      productsArr: [],
      bannerArr: ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner5.jpg'],
    }
  },
}
</script>

<style lang="less">
.home {
  .baaner-container {
    .carousel__item {
      width: 55%;
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

.list-wrap {
  display: flex;
  width: 75%;
  margin: auto;
}
</style>
