import { db, storage, auth } from "@/config/firebaseConfig.js";
import { collection, getDocs, doc, getDoc, setDoc, query, where, addDoc }from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

// 從firestore獲得所有商品的陣列信息
export async function getAllProds() {
  const data = await getDocs(collection(db, "products"));
  const list = [];
  data.forEach((doc) => {
    list.push(doc.data());
  })
  return list;
}

// 從firestore獲得單一商品詳細信息(JSON)
export async function getProdDetail(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) {
    return docSnap.data();
  }else {
    console.log("此資料不存在");
  }
}

// 獲取產品圖片URL
export async function getProdImgUrl(imgRef) {
  let result = await getDownloadURL(ref(storage, imgRef))
  return result
}

// 加入購物車
export async function addToCart(product) {
  onAuthStateChanged(auth, (user) => {
      // 已登入情況下
      // 資料會存放在 firestore 
      if(user) {
          // 從 firestore取得使用者的文件 ID
          const q = query(collection(db, 'users'), where('email', '==', user.email))
          getDocs(q).then((val) => {
              val.forEach((d) => {
                  // 取得會員 firestore 購物車路徑(集合)
                  const cartRef = collection(db, 'users', d.id, 'cart');
                  addDoc(cartRef, product);
                  alert('此商品已加入購物車!');
                  this.$store.commit('incrementCart');
              })
          })
      }
      // 非登入情況下
      // 資料會存放在 localstorage
      else {
        let products = [];
        if(localStorage.getItem('products_in_cart') !== null) {
            products = JSON.parse(localStorage.getItem('products_in_cart'));
            products.push(product);
            this.$store.commit('incrementCart');
            localStorage.setItem('products_in_cart', JSON.stringify(products));
        }else {
          products.push(product);
          this.$store.commit('incrementCart');
          localStorage.setItem('products_in_cart', JSON.stringify(products));
        }
        
        alert('此商品已加入購物車123!');
    }
  })  
}

// NavBar.vue 測試用
// 從 firestore取得該使用者的購物車清單(docs)數量，並在vuex store 設置
export function handleCountInCart() {
  onAuthStateChanged(auth, (user) => {
      // 有登入
      if(user) {
        const q = query(collection(db, 'users'), where('email', '==', user.email));
        getDocs(q).then((val) => {
          val.forEach((doc) => {
            const cartRef = collection(db, 'users', doc.id, 'cart');
            getDocs(cartRef).then((val) => {
              this.$store.commit('setCart', val.size);
            })
          })
        })
      }
      // 無登入
      else {
        if(localStorage.getItem('products_in_cart') !== null) {
            let items = JSON.parse(localStorage.getItem('products_in_cart'));
            this.$store.commit('setCart', items.length);
        }
      }
  })
}

// 測試用
// firebase code 添加資料
export async function yyd() {
  const docRef = doc(db, "products", '003');
  const docSnap = await getDoc(docRef);

  await setDoc(doc(db, "products", "103"), docSnap.data());
  // await setDoc(doc(db, "cities", "LA"), {
  //   name: "Los Angeles",
  //   state: "CA",
  //   country: "USA"
  // });
}
