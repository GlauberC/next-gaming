import { useEffect, useMemo } from "react";
import { ClientInGameProps } from "../../models/Client";
import * as Styled from "./styles";
import { MdDone } from "react-icons/md";
import { colors } from "../../styles/theme";

interface HubProps {
  title: string;
  maxPlayers?: number;
  joinedClients: ClientInGameProps[];
  myClient: ClientInGameProps;
  isReadyMyClient: boolean;
  onQuit(clientId: string): void;
  onJoin(): void;
  onReadyToggle(): void;
}

export default function Hub({
  title,
  myClient,
  joinedClients,
  maxPlayers = 99,
  isReadyMyClient,
  onQuit,
  onJoin,
  onReadyToggle,
}: HubProps) {
  const isAlreadyJoined = useMemo(
    () =>
      joinedClients.find(
        (clientItem) => clientItem.data.id === myClient.data.id
      ),
    [joinedClients, myClient]
  );

  useEffect(() => {
    if (!myClient?.data?.isConnected && myClient?.data?.id) {
      onQuit(myClient.data.id);
    }
  }, [myClient, onQuit]);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderText>{title}</Styled.HeaderText>
        <Styled.HeaderText>{`${joinedClients.length}/${maxPlayers}`}</Styled.HeaderText>
      </Styled.Header>
      <Styled.Hub>
        <Styled.HeadedHubContainer>
          <Styled.HeaderHubText>Jogadores</Styled.HeaderHubText>
          <Styled.HeaderHubText>Prontos</Styled.HeaderHubText>
        </Styled.HeadedHubContainer>
        {joinedClients.map((clientJoined) => (
          <Styled.ClientContainer key={clientJoined.data.id}>
            <Styled.ClientName>{clientJoined.data.name}</Styled.ClientName>
            {clientJoined.data.id === clientJoined.data.id ? (
              <Styled.ClientReadybox onClick={onReadyToggle}>
                {isReadyMyClient && (
                  <MdDone size={18} color={colors.warningMedium} />
                )}
              </Styled.ClientReadybox>
            ) : clientJoined.isReady ? (
              <MdDone size={24} color={colors.warningMedium} />
            ) : (
              <div></div>
            )}
          </Styled.ClientContainer>
        ))}
      </Styled.Hub>
      {isAlreadyJoined && myClient.data.id ? (
        <Styled.QuitButton onClick={() => onQuit(myClient.data.id!)}>
          Sair
        </Styled.QuitButton>
      ) : (
        <Styled.JoinButton onClick={onJoin}>Entrar</Styled.JoinButton>
      )}
    </Styled.Container>
  );
}
