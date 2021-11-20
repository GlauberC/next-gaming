import styled from "styled-components";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
export const Main = styled.div`
  flex: 1;
  background-color: ${colors.background};
`;
