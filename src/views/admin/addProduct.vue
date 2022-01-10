<template>
    <div class="container">
        <div class="form">
            <div class="title box"><h2>新增商品</h2></div>
            <div class="box">
                <label for="pd_name">商品名稱</label>
                <input type="text" id="pd_name" v-model="name" class="text">
            </div>
            <div class="box">
                <label for="pd_id">商品編號</label>
                <input type="text" id="pd_id" v-model="id" class="text">
            </div>
            <div class="box">
                <label for="pd_mainImg">主要商品圖片(一張)</label>
                <input type="file" 
                    accept="image/*" 
                    id="pd_mainImg" 
                    multiple 
                    @change="imgPreview($event)"
                    >
                <div class="img-box">
                    <img ref="mainPv" class="preview-img">
                </div>
            </div>
            <div class="box">
                <label for="pd_imgUrl">詳細商品圖片(多張)</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    id="pd_imgs" 
                    ref="imgs" 
                    multiple 
                    @change="imgsPreview($event)"
                    >
                <div v-if="imgCount > 0" class="img-box">
                    <img 
                        class="preview-img"
                        name="imgsView"
                        v-for="(item, index) in imgCount"
                        :key="index"
                        >
                </div>
            </div>
            <div class="box">
                <label for="pd_price">商品售價</label>
                <input type="number" id="pd_price" v-model="price" class="text">
            </div>
            <div class="box">
                <label>商品分類</label>
                <select v-model="type[0]">
                    <option value="stationery" selected>文具</option>
                    <option value="dailyuse">生活用品</option>
                    <option value="clothing">衣料</option>
                </select>
                <select v-if="type[0]==='stationery'" v-model="type[1]">
                    <option value="鉛筆">鉛筆</option>
                    <option value="原子筆">原子筆</option>
                    <option value="事務用品">事務用品</option>
                </select>
                <select v-else-if="type[0]==='dailyuse'" v-model="type[1]">
                    <option value="收納用品">收納用品</option>
                    <option value="衣物洗滌">衣物洗滌</option>
                    <option value="家庭清潔">家庭清潔</option>
                </select>
                <select v-else v-model="type[1]">
                    <option value="男裝">男裝</option>
                    <option value="女裝">女裝</option>
                </select>
            </div>
            <div class="box">
                <label>商品款式</label>
                <div>
                    <input type="checkbox" id="checkbox1" v-model="isSpec" checked>
                    <label for="checkbox1">有分款式</label>
                </div>
                <div v-show="isSpec">
                    <div>
                        <span v-for="item,index in specList" :key="index">
                            {{ index + 1 }}. {{ item }} 
                        </span>
                    </div>
                    <input type="text" v-model="spec" class="text">
                    <button @click="addSpec">新增款式</button>
                    <button @click="specList = []">清空</button>
                </div>
                <div>
                    <input type="checkbox" id="checkbox2" v-model="isSize" checked>
                    <label for="checkbox2">有分尺寸</label>
                </div>
                <div v-show="isSize">
                    <div>
                        <span v-for="item,index in sizeList" :key="index">
                            {{ index + 1 }}. {{ item }} 
                        </span>
                    </div>
                    <input type="text" v-model="size" class="text">
                    <button @click="addSize">新增款式</button>
                    <button @click="sizeList = []">清空</button>
                </div>
            </div>
            <div class="box">
                <label for="pd_left">商品數量</label>
                <input type="number" id="pd_left" v-model="left" class="text">
            </div>
            <div class="box">
                <label for="pd_description">商品描述</label>
                <textarea v-model="description" id="pd_description" cols="30" rows="10" class=""></textarea>
            </div>
            <div class="box submit">
                <button class="submit-btn" @click="addProduct">新增商品</button>
            </div>
        </div>
    </div>
</template>
<script>
import { db, storage } from "@/config/firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytes } from "firebase/storage";

export default {
    data() {
        return {
            name: '',
            id: '',
            mainImgName: '',
            price: null,
            left: null,
            type: [],
            description: '',
            isSpec: false,
            isSize: false,
            imgCount: null,
            specList: [],
            sizeList: [],
        }
    },
    methods: {
        imgPreview(event) {
            this.mainImgName = event.target.files[0].name;
            this.$refs.mainPv.src = window.URL.createObjectURL(event.target.files[0]);
        },
        imgsPreview(event) {
            this.imgCount = event.target.files.length;
            console.log(this.$refs.imgs.files);
            setTimeout(() => {
                if(this.imgCount > 0) {
                    for(let i = 0; i < this.imgCount; i++) {
                        document.getElementsByName('imgsView')[i].src = window.URL.createObjectURL(event.target.files[i]);
                    }
                }
            },0);
        },
        addSpec() {
            if(this.spec || '' || null) {
                this.specList.push(this.spec);
                this.spec = "";
            }
        },
        addSize() {
            if(this.size || '' || null) {
                this.sizeList.push(this.size);
                this.size = "";
            }
        },
        addProduct() {
            let imgRef = '/products/stationary/' + this.id + '/' +  this.mainImgName;
            let product = {
                id: this.id,
                name: this.name,
                price: this.price,
                left: this.left,
                description: this.description,
                class: this.type,
                spec: this.specList,
                size: this.sizeList,
                imgRef: imgRef
            }
            // 產品資料傳給 firebase cloud database
            setDoc(doc(db, 'products', this.id), product).then(
                () => {
                    alert('新增成功！');
                }
            )

            // firebase storage 檔案要一個個上傳
            for(let i = 0; i < this.$refs.imgs.files.length; i++) {
                let storageRef = ref(storage, `products/stationary/${this.id}/${this.$refs.imgs.files[i].name}`);
                uploadBytes(storageRef, this.$refs.imgs.files[i]).then(() => {
                    console.log('成功上傳到 firebase storage');
                });
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .container {
        display: flex;
    }
    .form {
        margin: 0 auto;
    }
    .box {
        margin: 30px 0px;
    }
    textarea {
        border: 1px solid #d3d3d3;
    }
    select {
        width: 150px;
        height: 35px;
        border: 1px solid #d3d3d3;
        margin-right: 15px;
    }
    label {
        margin-right: 15px;
    }
    .text {
        width: 250px;
        height: 20px;
        padding: 7.5px 10px;
        font-size: 16px;
        border: 1px solid #d3d3d3;
    }
    .preview-img {
        width: 100px;
        margin-right: 15px;
    }
    .submit {
        text-align: center;
        .submit-btn {
            width: 50%;
            height: 60px;
            border: blue 1px solid;
            background: blue;
            color: whitesmoke;
            font-weight: 600;
            margin: 15px auto;
            cursor: pointer;
            border-radius: 5px;
        }
    }
</style>