import { db } from "@/config/firebaseConfig.js";
import { storage } from "@/config/firebaseConfig.js";
import { collection, getDocs, doc, getDoc, setDoc }from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

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
    console.log(docSnap.data());
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
