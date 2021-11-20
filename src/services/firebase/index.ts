import { firebaseRealDatabase } from "../../configs/firebase";
import { ref, set } from "firebase/database";

interface StoreDataProps {
  data: Object;
  storeDir: string;
}

export async function storeData({ data, storeDir }: StoreDataProps) {
  await set(ref(firebaseRealDatabase, storeDir), data);
}
