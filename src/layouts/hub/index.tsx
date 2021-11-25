import { useEffect, useMemo } from "react";
import { ClientInGameProps, ClientProps } from "../../models/Client";
import * as Styled from "./styles";
import { MdDone, MdDelete } from "react-icons/md";
import { colors } from "../../styles/theme";

interface HubProps {
  title: string;
  maxPlayers?: number;
  joinedClients: ClientInGameProps[];
  myClient: ClientProps;
  isReadyMyClient: boolean;
  isHost: boolean;
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
  isHost,
  onQuit,
  onJoin,
  onReadyToggle,
}: HubProps) {

  const isAlreadyJoined = useMemo(
    () =>
      joinedClients?.find((clientItem) => clientItem?.data?.id === myClient.id),
    [joinedClients, myClient]
  );

  useEffect(() => {
    if (!myClient?.isConnected && myClient?.id) {
      onQuit(myClient.id);
    }
  }, [myClient, onQuit]);

  function handleOnJoin() {
    if (joinedClients?.length < maxPlayers) {
      onJoin();
    } else {
      console.log("Número máximo");
    }
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderText>{title}</Styled.HeaderText>
        <Styled.HeaderText>{`${
          joinedClients?.length ?? 0
        }/${maxPlayers}`}</Styled.HeaderText>
      </Styled.Header>
      <Styled.Hub>
        <Styled.HeadedHubContainer>
          <Styled.HeaderHubText>Jogadores</Styled.HeaderHubText>
          <Styled.HeaderHubText>Prontos</Styled.HeaderHubText>
        </Styled.HeadedHubContainer>
        {joinedClients?.map((clientJoined) => (
          <Styled.ClientContainer key={clientJoined.data.id}>
            <Styled.ClientName>{clientJoined.data.name}</Styled.ClientName>
            {clientJoined.data.id === myClient.id ? (
              <Styled.ClientReadybox onClick={onReadyToggle}>
                {isReadyMyClient && (
                  <MdDone size={18} color={colors.warningMedium} />
                )}
              </Styled.ClientReadybox>
            ) : clientJoined.isReady ? (
              <div>

                {isHost && (
                  <Styled.KickPlayerButton
                    onDoubleClick={() => onQuit(clientJoined.data.id!)}
                  >
                    <MdDelete size={24} color={colors.errorMedium} />
                  </Styled.KickPlayerButton>
                )}
                <MdDone size={24} color={colors.warningMedium} />
              </div>
            ) : (
              <div>
                {isHost && (
                  <Styled.KickPlayerButton
                    onDoubleClick={() => onQuit(clientJoined.data.id!)}
                  >
                    <MdDelete size={24} color={colors.errorMedium} />
                  </Styled.KickPlayerButton>
                )}
              </div>
            )}
          </Styled.ClientContainer>
        ))}
      </Styled.Hub>
      {isAlreadyJoined && myClient.id ? (
        <Styled.QuitButton onClick={() => onQuit(myClient.id!)}>
          Sair
        </Styled.QuitButton>
      ) : (
        <Styled.JoinButton onClick={handleOnJoin}>Entrar</Styled.JoinButton>
      )}
    </Styled.Container>
  );
}
