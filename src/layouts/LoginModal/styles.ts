import styled from "styled-components";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
export const Window = styled.div`
  background-color: ${colors.background};
  height: 25rem;
  width: 50rem;
  z-index: 2;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Label = styled.label`
  color: ${colors.textLow};
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1.5rem;
  width: 50%;
`;
export const Input = styled.input`
  color: ${colors.textLow};
  background-color: transparent;
  font-size: 2rem;
  text-align: center;
  border: none;
  outline: none;
  border-bottom: solid 1px ${colors.textLow};
  width: 50%;
  margin-bottom: 3rem;
`;
export const Button = styled.button`
  cursor: pointer;
  background-color: ${colors.secondaryMedium};

  font-size: 2rem;
  width: 50%;
  height: 4rem;
  border: none;
  border-radius: 20px;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${colors.secondaryHigh};
  }
`;
