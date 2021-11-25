import type { NextPage } from "next";
import { useClient } from "../context/client";

const Home: NextPage = () => {
  const { client, clients, createClient, disconnect } = useClient();

  return (
    <div>
      {client.id && (
        <div>
          <h1>Cliente Ativo</h1>
          <h3>{client.name}</h3>
        </div>
      )}
      <h1>Outros Clients logados</h1>
      { clients.length && clients?.map((clientItem) => (
        <h3 key={clientItem.id}>{clientItem.name}</h3>
      ))}
      {client.id ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <>
          <button onClick={() => createClient({ name: "João" })}>
            addJoao
          </button>
          <button onClick={() => createClient({ name: "Maria" })}>
            addMaria
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
