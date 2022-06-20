import { async } from "@firebase/util";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../database/firestore";

const Data = () => {

  const [docData, setDocData] = useState([]);
  let array = [];

  //클릭했을때 값을 가져오는 함수
  //await를 사용하기 위해 async 사용
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    //자료형 확인
    console.log(typeof querySnapshot);
    //객체내용 확인
    console.dir(querySnapshot);


    querySnapshot.forEach((doc) => {
      //querySnapshot으로 문서들을 가져오고 각각의 문서는 doc으로 확인
      console.log(`${doc.id} => ${doc.data().name}`);
      array.push({ last : doc.data().last, first : doc.data().first });
    });
    setDocData(array);
  };

  const addData = async () => {
    try{
      const docRef = await addDoc(collection(db, 'user'),{
        first : 'Ada',
        last : 'Lovelace',
        born : 1815
      });
      console.log('Document written with ID : ',docRef.id);
    } catch (e) {
      console.error('Error adding document : ', e);
    }
  };

  return(
    <div>
      <h1>파이어베이스에서 값을 가져옴</h1>
      <p>콘솔 확인!</p>
      <button onClick={getData}>버튼을 눌러서 값 출력</button>
      <button onClick={addData}>버튼을 눌러서 값 추가</button>
      {
        docData.map((data, i) => (
          <div key={i}>{data.first} {data.last}</div>
        ))
      }
    </div>
  );
};
export default Data;