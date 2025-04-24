import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Page } from "../page";

export function Ssh() {
  const [outputText, setOutputText] = useState("--no output--");

  useEffect(() => {
    console.log((window as any).electronAPI);

    (window as any).electronAPI.onShellOutput((value: string) => {
      setOutputText(value);
    });
  }, []);

  async function start() {
    (window as any).electronAPI.startShell();
  }

  async function run() {
    const output = await (window as any).electronAPI.runShellCommand();
    console.log(output);
  }

  return (
    <Page title="ssh">
      <Stack>
        <Button onClick={start}>Start</Button>
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
          styles={{
            input: { fontFamily: "Lucida Console, Courier, monospace" },
          }}
        />
      </Stack>
    </Page>
  );
}
