import styled from "styled-components";
import { colors } from "../../../styles/theme";

export const Container = styled.button`
  cursor: pointer;
  background-color: ${colors.secondaryMedium};

  font-size: 2rem;
  width: 50%;
  height: 4rem;
  border: none;
  border-radius: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.secondaryHigh};
  }
`;
