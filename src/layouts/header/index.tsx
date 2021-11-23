import { useClient } from "../../context/client";
import * as Styled from "./styles";
import { MdPowerOff } from "react-icons/md";
import { useState } from "react";
import ConfirmModal from "../../components/modals/confirmModal";

export default function Header() {
  const { client, disconnect } = useClient();
  const [isOpenModalConfirmExit, setIsOpenModalConfirmExit] = useState(false);

  function openModal() {
    setIsOpenModalConfirmExit(true);
  }

  function closeModal() {
    setIsOpenModalConfirmExit(false);
  }

  function confirmExit() {
    disconnect();
    closeModal();
  }

  return (
    <>
      <ConfirmModal
        visible={isOpenModalConfirmExit}
        message="Você deseja realmente sair? Você não poderá voltar à mesma partida caso esteja."
        onClose={closeModal}
        onConfirm={confirmExit}
      />
      <Styled.Container>
        {client.name && (
          <>
            <h2>{client.name}</h2>
            <Styled.SignOutButton onClick={openModal}>
              <MdPowerOff size={28} />
            </Styled.SignOutButton>
          </>
        )}
      </Styled.Container>
    </>
  );
}
