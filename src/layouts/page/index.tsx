import Header from "../header";
import * as Styled from "./styles";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <Styled.Container>
      <Header />
      <Styled.Main>{children}</Styled.Main>
    </Styled.Container>
  );
}
