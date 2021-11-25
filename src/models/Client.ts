export interface ClientProps {
  id?: string;
  name?: string;
  isConnected?: boolean;
  createdAt?: string;
}

export interface ClientInGameProps {
  data: ClientProps
  isReady: boolean;
}