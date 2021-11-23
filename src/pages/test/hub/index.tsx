import { useState } from "react";
import { useClient } from "../../../context/client";
import Hub from "../../../layouts/hub";
import { ClientInGameProps } from "../../../models/Client";

export default function TestHub() {
  const { client } = useClient();
  const [isReady, setIsReady] = useState(false);
  const [clientsInGame, setClientsInGame] = useState<ClientInGameProps[]>([]);

  function onQuit(clientId: string) {
    setClientsInGame(
      clientsInGame.filter((clientItem) => clientItem.data.id !== clientId)
    );
  }
  function onJoin() {
    setClientsInGame([...clientsInGame, { data: client, isReady: false }]);
  }
  function onReadyToggle() {
    setIsReady(!isReady);
  }

  return (
    <div>
      <Hub
        title="Testar hub"
        myClient={{ data: client, isReady }}
        isReadyMyClient={isReady}
        joinedClients={clientsInGame}
        onJoin={onJoin}
        onQuit={onQuit}
        onReadyToggle={onReadyToggle}
      />
    </div>
  );
}
