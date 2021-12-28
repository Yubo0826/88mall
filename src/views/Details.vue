<template>
  <div class="dt-content">
    <div class="sidebar-wrap">
      <SideBar></SideBar>
    </div>
    <main>
      <div class="breadcrumb-container">
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="pd-content">
        <div class="pd-left">
          <div class="pd-slider">
            <vue-product-slider>
              <template v-slot:slider>
                <div
                  v-for="(item, index) in imgsRefArr"
                  :key="index"
                  class="slide"
                >
                  <img v-ProdImg="item" />
                </div>
              </template>

              <template v-slot:thumbnails>
                <div
                  v-for="(item, index) in imgsRefArr"
                  :key="index"
                  class="thumb"
                >
                  <img v-ProdImg="item" />
                </div>
              </template>
            </vue-product-slider>
          </div>
        </div>
        <div class="pd-right">
          <div class="top">
            <div class="pd-name">{{ productInfo.name }}</div>
            <div class="pd-description">{{ productInfo.description }}</div>
            <div class="price">NT$ {{ productInfo.price }}</div>
          </div>

          <div class="down">
            <div v-if="productInfo.spec" class="box">
              <div class="title">顏色</div>
              <ul class="pd-spec" id="spec-select-box">
                <li
                  v-for="(item, index) in productInfo.spec"
                  :key="index"
                  @click="selectSpecSize('spec-select-box', $event)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="productInfo.size" class="box">
              <div class="title">尺寸</div>
              <ul class="pd-spec" id="size-select-box">
                <li
                  v-for="(item, index) in productInfo.size"
                  :key="index"
                  @click="selectSpecSize('size-select-box', $event)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="qty box">
              <div class="title"
                >數量<span> (剩餘{{ productInfo.left }}件)</span></div
              >
              <div class="step">
                <button class="add" @click="addQty">+</button>
                <input type="number" v-model="qty" disabled />
                <button class="reduce" @click="reduceQty">-</button>
              </div>
            </div>

            <div class="btns box">
              <AddToCartBtn @click="addToCart"></AddToCartBtn>
              <button class="buyNow" @click="buyNow">立即購買</button>
            </div>
            <div class="like">
              <box-icon name='star'></box-icon>
              <span>喜歡</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AddToCartBtn from "@/components/button/AddToCartBtn.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import SideBar from "@/components/SideBar.vue";
import 'boxicons';
import { VueProductSlider } from "../product-slider/index";
import { getProdDetail, getProdImgUrl } from "@/request/api.js";
import { getStorage, ref, listAll } from "firebase/storage";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "@/config/firebaseConfig.js";

export default {
  data() {
    return {
      productInfo: {},
      imgsRefArr: [],
      qty: 1,
      size: null,
      spec: null,
    };
  },
  
  components: {
    Breadcrumb,
    VueProductSlider,
    AddToCartBtn,
    SideBar
  },

  props: {
    product: {
      type: Object,
    },
  },

  created() {
    getProdDetail(this.$route.query.id).then((res) => {
      this.productInfo = res;
    });
  },

  mounted() {
    // 選擇尺寸或顏色的第一個li 加上class 'selected'
    setTimeout(() => {
      let els = document.getElementsByClassName("pd-spec");
      for (let i = 0; i < els.length; i++) {
        els[i].children[0].classList.add("selected");
      }
      if (this.productInfo.spec) {
        this.spec =
          document.getElementsByClassName("pd-spec")[0].children[0].innerHTML;
      } else {
        this.spec = null;
      }
      if (this.productInfo.size) {
        this.size =
          document.getElementsByClassName("pd-spec")[1].children[0].innerHTML;
      } else {
        this.size = null;
      }
    }, 1500);

    this.pdImgLoad(this.$route.query.id);
  },

  methods: {
    pdImgLoad(id) {
      const storage = getStorage();

      // Create a reference under which you want to list
      const listRef = ref(storage, "products/stationary/" + id);
      // Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            this.imgsRefArr.push(itemRef);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectSpecSize(box_id, event) {
      // 屬性 target:
      // 返回觸發此事件的元素，就是你當前點擊的是哪一個元素，target獲取到的就是哪一個元素
      const el_selected = event.target;
      const el_box = document.getElementById(box_id);

      if (el_box === "spec-select-box") {
        this.spec = el_selected.innerHTML;
      } else {
        this.size = el_selected.innerHTML;
      }

      for (let i = 0; i < el_box.children.length; i++) {
        if (el_box.children[i].classList.contains("selected")) {
          el_box.children[i].classList.remove("selected");
        }
      }
      el_selected.classList.add("selected");
    },

    addQty() {
      this.qty++;
    },

    reduceQty() {
      if (this.qty > 1) {
        this.qty--;
      }
    },

    addToCart() {
      let product = {
        id: this.productInfo.id,
        imgRef: this.productInfo.imgRef,
        name: this.productInfo.name,
        size: this.size,
        spec: this.spec,
        qty: this.qty,
        price: this.productInfo.price,
      };

      const user = auth.currentUser;
      // 已登入情況下
      // 資料會存放在 firestore
      if (user) {
        // 從 firestore取得使用者的文件 ID
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        getDocs(q).then((val) => {
          val.forEach((d) => {
            // 取得會員 firestore 購物車路徑(集合)
            const cartRef = collection(db, "users", d.id, "cart");
            addDoc(cartRef, product);
            alert("此商品已加入購物車!");
            this.$store.commit("incrementCart");
          });
        });
      }
      // 非登入情況下
      // 資料會存放在 localstorage
      else {
        let products = [];
        if (localStorage.getItem("products_in_cart") !== null) {
          products = JSON.parse(localStorage.getItem("products_in_cart"));
          products.push(product);
          this.$store.commit("incrementCart");
          localStorage.setItem("products_in_cart", JSON.stringify(products));
        } else {
          products.push(product);
          this.$store.commit("incrementCart");
          localStorage.setItem("products_in_cart", JSON.stringify(products));
        }

        alert("此商品已加入購物車123!");
      }
    },

    buyNow() {},
  },

  directives: {
    ProdImg: function (el, binding) {
      const imgRef = binding.value;
      getProdImgUrl(imgRef).then((url) => {
        el.src = url;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dt-content {
  display: flex;
  max-width: 1200px;
  margin: 50px auto;
  .sidebar-wrap {
    margin-top: 50px;
    margin-right: 70px;
  }
  main {
    .breadcrumb-container {
      margin-bottom: 15px;
      padding-left: 15px;
    }
    .pd-content {
      width: 970px;
      display: flex;
      .pd-left {
        padding: 15px;
        .pd-slider {
          width: 460px;
          flex: 1;
          overflow: hidden;
          margin-bottom: 21px;
        }
      }
      .pd-right {
        padding: 10px 49px 0 31px;
        .top {
          padding-bottom: 23px;
          border-bottom: 1px solid rgb(190, 190, 190);
          .pd-name {
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 28px;
            font-weight: 6500;
          }
          .pd-description {
            color: darkgrey;
            font-weight: 400;
          }
          .price {
            font-size: 28px;
            font-weight: 700;
            color: var(--color-lighten-orange);
            margin-top: 26px;
          }
        }
        .down {
          padding-top: 19px;
          .box {
            margin-bottom: 5px;
          }
          .title {
            font-weight: 400;
            margin-bottom: 14px;
            display: block;
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
                border-color: var(--color-lighten-orange);
                color: var(--color-lighten-orange);
              }
            }
          }
          .qty {           
            span {
              font-size: 12px;
              color: rgb(190, 190, 190);
            }
            .step {
              display: flex;
              height: 32px;
              margin-bottom: 24px;
              .reduce,
              .add {
                width: 32px;
                height: 32px;
                border: 1px solid #ccc;
                background: rgb(252, 252, 252);
                box-sizing: border-box;
                cursor: pointer;
              }
              input {
                width: 86px;
                height: 32px;
                border: 1px solid #ccc;
                padding: 0;
                outline: none;
                text-align: center;
                text-indent: 10px;
                background: white;
              }
            }
          }
          .btns {
            display: flex;
            button {
              margin-bottom: 19px;
              margin-left: 19px;
              font-weight: 600;
            }
            .buyNow {
              width: 150px;
              height: 46px;
              color: rgb(255, 255, 255);
              background: var(--color-lighten-orange);
              border: 0;
              cursor: pointer;
            }
          }
          .like {
            display: flex;
            align-items: center;
            font-weight: 400;
            box-icon {
              margin-right: 12px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>