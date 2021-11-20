import { useState } from "react";
import { useClient } from "../../context/client";
import * as Styled from "./styles";

export default function LoginModal() {
  const [name, setName] = useState("");

  const { client, createClient } = useClient();

  async function handleCreate() {
    if (name !== "") {
      try {
        await createClient({ name });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return client.id ? null : (
    <Styled.Container>
      <Styled.Window>
        <Styled.Label>Digite seu nick para entrar</Styled.Label>
        <Styled.Input
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Styled.Button onClick={handleCreate}>Entrar</Styled.Button>
      </Styled.Window>
    </Styled.Container>
  );
}
