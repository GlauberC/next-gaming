import type { NextPage } from "next";
import { firebaseDatabase } from "../configs/firebase";
import { ref, set } from "firebase/database";
import { useEffect } from "react";

const Home: NextPage = () => {
  function storeData() {
    console.log("Iniciando salvamento")
    set(ref(firebaseDatabase, "test"), {
      ok: true,
    });
  }

  useEffect(() => {
    // storeData();
  }, []);

  return <h1>OI</h1>;
};

export default Home;
