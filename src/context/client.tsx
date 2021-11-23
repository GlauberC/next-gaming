import { v4 as uuidv4 } from "uuid";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onValue, ref } from "firebase/database";
import { firebaseRealDatabase } from "../configs/firebase";
import { storeData } from "../services/firebase";
import { ClientProps } from "../models/Client";


interface CreateClientProps {
  name: string;
}

interface ClientContextData {
  client: ClientProps;
  clients: ClientProps[];
  createClient(data: CreateClientProps): Promise<void>;
  disconnect(): Promise<void>;
}

const ClientContext = createContext<ClientContextData>({} as ClientContextData);

const CLIENTS_DIR = "clients";
const CLIENT_SESSION = "@NextGaming_Client";

export const ClientProvider: React.FC = ({ children }) => {
  const [client, setClient] = useState({} as ClientProps);
  const [clients, setClients] = useState<ClientProps[]>([]);

  const clientsRef = ref(firebaseRealDatabase, CLIENTS_DIR);

  useEffect(() => {
    const beforeClient = sessionStorage.getItem(CLIENT_SESSION);
    if (beforeClient) {
      setClient(JSON.parse(beforeClient));
    }
  }, []);

  useEffect(() => {
    onValue(clientsRef, (snapshot) => {
      setClients(snapshot.val() === null ? [] : snapshot.val());
    });
  }, []);

  async function createClient({ name }: CreateClientProps) {
    const alreadyClientInDatabase = clients.find(
      (clientItem) => clientItem.name === name
    );
    if (alreadyClientInDatabase) {
      throw new Error("Já existe um usuário com esse nome");
    }

    const newClient: ClientProps = {
      name,
      id: uuidv4(),
      createdAt: new Date(),
      isConnected: true,
    };

    try {
      await storeData({ data: [...clients, newClient], storeDir: CLIENTS_DIR });
      setClient(newClient);
      sessionStorage.setItem(CLIENT_SESSION, JSON.stringify(newClient));
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnect() {
    try {
      await storeData({
        data: clients.filter((clientItem) => clientItem.id !== client.id),
        storeDir: CLIENTS_DIR,
      });
      sessionStorage.removeItem(CLIENT_SESSION);
      setClient({...client, isConnected: false});
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ClientContext.Provider
      value={{
        client,
        createClient,
        clients,
        disconnect,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export function useClient(): ClientContextData {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within an ClientProvider");
  }

  return context;
}
