import styled from "styled-components";
import Button from "../../components/buttons/button";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  width: 20rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;
export const HeaderText = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: ${colors.textLow};
`;
export const Hub = styled.div`
  min-height: 20rem;
  border: solid 1px ${colors.secondaryMedium};
  background-color: ${colors.primaryHigh};
  border-radius: 20px;
`;

export const JoinButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
  height: 2rem;
  font-size: 1rem;
`;
export const QuitButton = styled(Button)`
  width: 100%;
  margin-top: 0.5rem;
  height: 2rem;
  font-size: 1rem;
  background-color: ${colors.errorMedium};
  &:hover {
    background-color: ${colors.errorLow};
  }
`;

export const HeadedHubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.35rem 0.5rem 0.5rem;
`;
export const HeaderHubText = styled.h3`
  color: ${colors.warningMedium};
  font-size: 0.85rem;
`;

export const ClientContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.3rem;
`;
export const ClientName = styled.p`
  font-size: 1rem;
  color: ${colors.textLow};
`;
export const ClientReadybox = styled.button`
  width: 24px;
  height: 24px;
  border: solid 1px ${colors.secondaryMedium};
  background: transparent;
  border-radius: 20px;
  cursor: pointer;
  transition: border 0.2s;
  justify-content: center;
  align-items: center;

  &:hover {
    border: solid 1px ${colors.secondaryHigh};
  }
`;
