<template>
  <div class="dt-content">
    <Breadcrumb></Breadcrumb>
    <main>
        <aside>
          <ul>
              <li class="tab">
                  <a>男士</a>
                  <ul>
                      <li>男士上衣</li>
                      <li>男士下著</li>
                  </ul>
              </li>
              <li class="tab">
                  <a>女士</a>
                  <ul>
                      <li>女士上衣</li>
                      <li>女士下著</li>
                  </ul>
              </li>
              <li class="tab"><a>乳清蛋白</a></li>
              <li class="tab"><a>健身裝備</a></li>
              <li class="tab"><a>限時特價商品</a></li>
          </ul>
        </aside>
        <div class="pd-content">
            <div class="pd-left">
                <div class="pd-slider">
                    <vue-product-slider>
                        <template v-slot:slider>
                            <div v-for="item,index in imgsRefArr" :key="index" class="slide">
                                <img v-ProdImg="item">
                            </div>
                        </template>

                        <template v-slot:thumbnails>
                            <div v-for="item,index in imgsRefArr" :key="index" class="thumb">
                                <img v-ProdImg="item">
                            </div>
                        </template>
                    </vue-product-slider>
                </div>
            </div>
            <div class="pd-right">
                <div class="top">
                    <h2>{{ productInfo.name }}</h2>
                    <div class="pd-description">{{ productInfo.description }}</div>
                    <div class="price">NT$ {{ productInfo.price }}</div>
                </div>
                <div class="down">
                    <div v-if="productInfo.spec">
                        <strong>顏色</strong>
                        <ul class="pd-spec" id="spec-select-box"> 
                            <li v-for="item,index in productInfo.spec" :key="index" @click="selectSpec('spec-select-box', $event)">{{ item }}</li>
                        </ul>
                    </div>
                    <div v-if="productInfo.size">
                        <strong>尺寸</strong>
                        <ul class="pd-spec"  id="size-select-box">
                            <li v-for="item,index in productInfo.size" :key="index" @click="selectSpec('size-select-box', $event)">{{ item }}</li>
                        </ul>
                    </div>
                    <strong>數量<span> (剩餘{{ productInfo.left }}件)</span></strong>
                    <div class="step">
                        <div class="add">+</div>
                        <input type="number" value="1" disabled>   
                        <div class="reduce">-</div>
                    </div>
                    <div class="btns">
                        <div class="addToCart">加入購物車</div>
                        <div class="buyNow">立即購買</div>
                    </div>
                    <div class="like">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
                        <span>喜歡(<span>0</span>)</span>
                    </div>
                </div>
            </div>
        </div>
        
    </main>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getProdDetail } from "@/request/api.js";
import { getProdImgUrl } from "@/request/api.js";
import { getStorage, ref, listAll } from "firebase/storage";

import {VueProductSlider} from '../product-slider/index';


export default {
  data() {
    return {
        productInfo: {},
        imgsRefArr: [],
    };
  },
  created() {
        getProdDetail(this.$route.query.id).then((res) => {
            this.productInfo = res;
        });
        
  },
  mounted() {
      this.pdImgLoad(this.$route.query.id);
  },
  components: {
    Breadcrumb, VueProductSlider,
  },
  methods: {
      pdImgLoad: function(id) {
            const storage = getStorage();

            // Create a reference under which you want to list
            const listRef = ref(storage, 'products/stationary/' + id);
            // Find all the prefixes and items.
            listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    this.imgsRefArr.push(itemRef);
                });
            }).catch((err) => {
                console.log(err);
            });
      },

      selectSpec: function(box_id, event) {
          const el_selected = event.target;
          const el_box = document.getElementById(box_id);

          for(let i = 0; i < el_box.children.length; i++) {
              if(el_box.children[i].classList.contains('selected')){
                  el_box.children[i].classList.remove('selected')
              }
          }
          el_selected.classList.add('selected');
      },
  },
  directives: {
        'ProdImg': function(el, binding) {
            const imgRef = binding.value;
            getProdImgUrl(imgRef).then((url) => {
                el.src = url;
            })
        }
  }
};
</script>

<style lang="less">
.dt-content{
    max-width: 1200px;
    margin: 50px auto;
    main { 
        display: flex;
        .pd-content {
            width: 970px;
            display: flex;
            .pd-left {
                .pd-slider {
                    width: 460px;
                    flex: 1;
                    overflow: hidden;
                    margin-bottom: 21px;
                }
            }
            .pd-right {
                padding: 7px 49px 0 31px ;
                .top {
                    padding-bottom: 23px;
                    border-bottom: 1px solid rgb(190, 190, 190);
                    h2 {
                        font-size: 28px;
                        font-weight: 500;
                    }
                    .pd-description {
                        color: darkgrey;
                    }
                    .price {
                        font-size: 28px;
                        font-weight: 700;
                        color: coral;
                        margin-top: 26px;
                    }
                }
                .down {
                    padding-top: 19px;
                    strong {
                        font-weight: bold;
                        margin-bottom: 14px;
                        display: block;
                        span {
                            font-size: 12px;
                            color: rgb(190, 190, 190);
                        }
                    }
                    
                    .pd-spec {
                        display: flex;
                        flex-wrap: wrap;
                        padding-left: 0;
                        width: 100%;
                        li {
                            width: 76px;
                            height: 32px;
                            text-align: center;
                            color: #666;
                            line-height: 32px;
                            border: 1px solid #ccc;
                            margin-right: 20px;
                            margin-bottom: 11px;
                            cursor: pointer;
                            &.selected {
                                border-color: var(--color-dark-yellow);
                                color: var(--color-dark-yellow);
                            }
                        }
                    }
                    .step {
                        width: 106px;
                        height: 32px;
                        margin-bottom: 24px;
                        display: flex;
                        justify-content: space-between;
                        .reduce, .add{
                            width: 32px;
                            height: 32px;
                            text-align: center;
                            border: 1px solid #ccc;
                            box-sizing: border-box;
                        }
                        input {
                            width: 46px;
                            height: 32px;
                            border: 1px solid #ccc;
                            padding: 0;
                            outline: none;
                            text-indent: 1.1rem;
                        }
                    }
                    .btns {
                        display: flex;
                        div {
                            width: 150px;
                            height: 46px;
                            line-height: 46px;
                            text-align: center;
                            color: rgb(255, 255, 255);
                            margin-bottom: 19px;
                            margin-right: 19px;
                            cursor: pointer;
                            &.addToCart {
                                background: rgb(85, 170, 0);
                            }
                            &.buyNow {
                                background: chocolate;
                            }
                        }
                    }
                    .like {
                        display: flex;
                        align-items: center;
                        svg {
                            margin-right: 12px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        aside {
            width: 230px;
            height: 100px;
            ul {
                .tab {
                    margin-bottom: 15px;
                    a {
                        font-weight: 800;
                        color: rgb(49, 49, 49);
                        cursor: pointer;
                    }
                    li {
                        font-weight: 500;
                        color: rgb(90, 90, 90);  
                        cursor: pointer;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
}

</style>