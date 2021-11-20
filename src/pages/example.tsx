import type { NextPage } from "next";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseRealDatabase } from "../configs/firebase";
import { storeData } from "../services/firebase";

const Example: NextPage = () => {
  const [data, setData] = useState("");

  const starCountRef = ref(firebaseRealDatabase, "test");

  useEffect(() => {
    console.log("CHAMOU")
    onValue(starCountRef, (snapshot) => {
      const newData = snapshot.val();
      if (newData?.ok) {
        setData(newData.ok);
      }
    });
  }, [starCountRef]);

  function handleStore(result: string) {
    storeData({ data: { ok: result }, storeDir: "test" });
  }

  return (
    <div>
      <h1>{data}</h1>
      <button onClick={() => handleStore("true")}>true</button>
      <button onClick={() => handleStore("false")}>false</button>
    </div>
  );
};

export default Example;
