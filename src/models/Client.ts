export interface ClientProps {
  id?: string;
  name?: string;
  isConnected?: boolean;
  createdAt?: Date;
}

export interface ClientInGameProps {
  data: ClientProps
  isReady: boolean;
}