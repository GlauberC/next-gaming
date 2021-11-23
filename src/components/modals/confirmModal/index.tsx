import * as Styled from "./styles";

interface ConfirmModalProps {
  visible: boolean;
  message: string;
  onConfirm(): void;
  onClose(): void;
}

export default function ConfirmModal({
  visible,
  message,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return visible ? (
    <Styled.Container>
      <Styled.Content>
        <Styled.Message>{message}</Styled.Message>
        <Styled.ButtonsContainer>
          <Styled.ConfirmButton onClick={onConfirm}>Sim</Styled.ConfirmButton>
          <Styled.CloseButton onClick={onClose}>Não</Styled.CloseButton>
        </Styled.ButtonsContainer>
      </Styled.Content>
    </Styled.Container>
  ) : null;
}
