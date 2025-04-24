import { Container, Tabs } from "@mantine/core";
import React from "react";
import { Ssh } from "./tab/ssh";
import { Api } from "./tab/api";

export function Main() {
  return (
    <Container>
      <Tabs defaultValue="api" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="api">api</Tabs.Tab>
          <Tabs.Tab value="ssh">ssh</Tabs.Tab>
        </Tabs.List>

        <Api />
        <Ssh />
      </Tabs>
    </Container>
  );
}
