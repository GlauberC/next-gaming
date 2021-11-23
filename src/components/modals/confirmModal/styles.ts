import styled from "styled-components";
import { colors } from "../../../styles/theme";
import Button from "../../buttons/button";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
  `;


export const Content = styled.div`
  background-color: ${colors.background};
  z-index: 999;
  width: 50vw;
  height: 50vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Message = styled.p`
  font-size: 2rem;
  padding: 4rem 2rem;
  text-align: center;
  color: ${colors.textLow};
`;

export const ButtonsContainer = styled.div`
  display: flex;
`

export const CustomButton = styled(Button)`
  width: 20rem;
  margin: 1rem;
`
export const ConfirmButton = styled(CustomButton)`
  background-color: ${colors.secondaryMedium};
`
export const CloseButton = styled(CustomButton)`
  background-color: ${colors.primaryHigh};
  color: ${colors.textLow};
  border: solid 1px ${colors.primaryHigh};
  &:hover {
    background-color: ${colors.primaryMedium};
  }
`
