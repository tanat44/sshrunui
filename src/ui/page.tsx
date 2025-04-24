import { Container, Tabs, Text } from "@mantine/core";
import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export const Page = ({ title, children }: Props) => {
  return (
    <Tabs.Panel value={title}>
      <Container>
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          {title}
        </Text>
        {children}
      </Container>
    </Tabs.Panel>
  );
};
