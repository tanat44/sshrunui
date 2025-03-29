import {
  Button,
  Container,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

export function Main() {
  const [outputText, setOutputText] = useState("--no output--");

  useEffect(() => {
    (window as any).electronAPI.onShellOutput((value: string) => {
      setOutputText(value);
    });
  }, []);

  async function run() {
    const output = await (window as any).electronAPI.runShellCommand();
    console.log(output);
  }

  return (
    <Container>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
      >
        sshrunui
      </Text>
      <Stack>
        <TextInput
          label="Input command"
          placeholder="ls"
          defaultValue="ls -la"
        />
        <Button onClick={run}>Run</Button>
        <Textarea
          label="Output"
          placeholder="Output"
          autosize
          minRows={10}
          maxRows={50}
          value={outputText}
        />
      </Stack>
    </Container>
  );
}
