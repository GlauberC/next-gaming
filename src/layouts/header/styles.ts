import styled from "styled-components";
import { colors } from "../../styles/theme";


export const Container = styled.header`
  padding: 1rem 2rem;
  background: ${colors.primaryHigh};
  color: ${colors.secondaryMedium};
  display: flex;
  justify-content: space-between;
`;

export const SignOutButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 28px;
  height: 28px;

  svg {
    color: ${colors.errorLow};
    transition: color 0.2s;

    &:hover {
      color: ${colors.errorMedium};
    }
  }
`;

