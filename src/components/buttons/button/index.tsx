import { ReactNode } from "react";
import * as Styled from "./styles";

export default function Button({
  children,
  ...rest
}: React.HTMLProps<HTMLButtonElement>) {
  return <Styled.Container {...rest}>{children}</Styled.Container>;
}
