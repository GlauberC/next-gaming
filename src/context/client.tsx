import { v4 as uuidv4 } from "uuid";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { storeData } from "../services/firebase";
import { firebaseRealDatabase } from "../configs/firebase";
import { ClientProps } from "../models/Client";
import { parseISO, addHours, isFuture } from "date-fns";

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
      const beforeClientFormatted = JSON.parse(beforeClient);
      const clientFinded =
        clients &&
        clients.find(
          (clientItem) => clientItem.id === beforeClientFormatted.id
        );
      if (clientFinded) {
        setClient(JSON.parse(beforeClient));
      } else {
        setClient({} as ClientProps);
      }
    }
  }, [clients]);

  useEffect(() => {
    onValue(clientsRef, (snapshot) => {
      setClients(snapshot.val() === null ? [] : snapshot.val());
    });
  }, []);

  async function createClient({ name }: CreateClientProps) {
    const clientsFormatted = clients ?? [];
    const currentClients: ClientProps[] = clientsFormatted.filter((client) => {
      return isFuture(addHours(new Date(client.createdAt!), 5));
    });
    const alreadyClientInDatabase = currentClients.find(
      (clientItem) => clientItem.name === name
    );
    if (alreadyClientInDatabase) {
      throw new Error("Já existe um usuário com esse nome");
    }

    const newClient: ClientProps = {
      name,
      id: uuidv4(),
      createdAt: String(new Date()),
      isConnected: true,
    };

    try {
      await storeData({
        data: [...currentClients, newClient],
        storeDir: CLIENTS_DIR,
      });
      setClient(newClient);
      sessionStorage.setItem(CLIENT_SESSION, JSON.stringify(newClient));
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnect() {
    try {
      const clientsFormatted = clients ?? [];
      await storeData({
        data: clientsFormatted.filter(
          (clientItem) => clientItem.id !== client.id
        ),
        storeDir: CLIENTS_DIR,
      });
      sessionStorage.removeItem(CLIENT_SESSION);
      setClient({ ...client, isConnected: false });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ClientContext.Provider
      value={{
        client,
        clients,
        createClient,
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
