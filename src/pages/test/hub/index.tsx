import { useEffect, useMemo, useState } from "react";
import { onValue, ref } from "firebase/database";
import { storeData } from "../../../services/firebase";

import { firebaseRealDatabase } from "../../../configs/firebase";
import { useClient } from "../../../context/client";
import Hub from "../../../layouts/hub";
import { ClientInGameProps } from "../../../models/Client";

const TEST_HUB_DIR = "testhub";

interface HubProps {
  id: string;
  name: string;
  clients: ClientInGameProps[];
}

export default function TestHub() {
  const { client } = useClient();
  const [hubData, setHubData] = useState({} as HubProps);

  const clientsRef = ref(firebaseRealDatabase, TEST_HUB_DIR);

  const currentClients = useMemo(() => hubData.clients ?? [] , [hubData])

  useEffect(() => {
    onValue(clientsRef, (snapshot) => {
      const response = snapshot.val() === null ? {id: "123456", name: "Teste Hub", clients: []} : snapshot.val();
      if (response) {
        setHubData(response);
      }
    });
  }, []);

  const isReady = useMemo(() => {
    const findedMyClient = currentClients.find(
      (clientItem) => clientItem?.data?.id === client.id
    );
    if (findedMyClient) {
      return findedMyClient.isReady;
    }
    return false;
  }, [currentClients, client.id]);

  function onQuit(clientId: string) {
    const newClients = currentClients.filter(
      (clientItem) => clientItem.data.id !== clientId
    );
    storeData({
      data: { ...hubData, clients: newClients },
      storeDir: TEST_HUB_DIR,
    });
  }
  function onJoin() { 
    const newClients = [...currentClients, { data: client, isReady: false }];
    storeData({
      data: { ...hubData, clients: newClients },
      storeDir: TEST_HUB_DIR,
    });
  }
  function onReadyToggle() {
    const newClients = currentClients.map((clientItem) =>
      clientItem.data.id === client.id
        ? { ...clientItem, isReady: !clientItem.isReady }
        : clientItem
    );
    storeData({
      data: { ...hubData, clients: newClients },
      storeDir: TEST_HUB_DIR,
    });
  }

  return (
    <div>
      <Hub
        title="Testar hub"
        myClient={client}
        isReadyMyClient={isReady}
        joinedClients={currentClients}
        onJoin={onJoin}
        onQuit={onQuit}
        onReadyToggle={onReadyToggle}
      />
    </div>
  );
}
