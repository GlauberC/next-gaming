import { useEffect, useMemo, useState } from "react";
import { onValue, ref } from "firebase/database";
import { storeData } from "../../../../services/firebase";

import { firebaseRealDatabase } from "../../../../configs/firebase";
import { useClient } from "../../../../context/client";
import Hub from "../../../../layouts/hub";
import { ClientInGameProps, ClientProps } from "../../../../models/Client";
import { useRouter } from "next/dist/client/router";

interface HubGameProps {
  id: string;
  name: string;
  clients: ClientInGameProps[];
  host: ClientProps;
}

const GAME_NAME = "jokenpo";

export default function Jokenpo() {
  const { query } = useRouter();

  const gameId = query.id;
  const gameDir = `${GAME_NAME}/${gameId}`;

  const { client } = useClient();
  const [gameHub, setGameHub] = useState({} as HubGameProps);

  const clientsRef = ref(firebaseRealDatabase, gameDir);

  const currentClients = useMemo(() => gameHub.clients ?? [], [gameHub]);

  useEffect(() => {
    onValue(clientsRef, (snapshot) => {
      if (client.id && gameDir) {
        const response =
          snapshot.val() === null
            ? { id: gameId, name: GAME_NAME, host: client, clients: [] }
            : snapshot.val();
        if (response) {
          setGameHub(response);
        }
      }
    });
  }, [gameDir, client]);

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
      data: { ...gameHub, clients: newClients },
      storeDir: gameDir,
    });
  }
  function onJoin() {
    const newClients = [...currentClients, { data: client, isReady: false }];
    storeData({
      data: { ...gameHub, clients: newClients },
      storeDir: gameDir,
    });
  }
  function onReadyToggle() {
    const newClients = currentClients.map((clientItem) =>
      clientItem.data.id === client.id
        ? { ...clientItem, isReady: !clientItem.isReady }
        : clientItem
    );
    storeData({
      data: { ...gameHub, clients: newClients },
      storeDir: gameDir,
    });
  }

  return (
    <div>
      {client?.id && gameHub.id ? (
        <>
        <Hub
          title="JoKenPo"
          isHost={client?.id === gameHub?.host?.id}
          maxPlayers={2}
          myClient={client}
          isReadyMyClient={isReady}
          joinedClients={currentClients}
          onJoin={onJoin}
          onQuit={onQuit}
          onReadyToggle={onReadyToggle}
        />
      </>
      ) : null}
    </div>
  );
}
