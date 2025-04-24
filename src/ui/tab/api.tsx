import { Button, Stack, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Page } from "../page";
import axios from "axios";

const WORKFLOW_API = ":28005";

export function Api() {
  const [baseurl, setBaseurl] = useState("http://192.168.1.42");

  async function deleteAllWorkflow() {
    const workflows = (
      await axios.get(`${baseurl}${WORKFLOW_API}/WorkflowPackages`)
    ).data;

    const deletes = workflows.map((workflow: any) => {
      return axios.delete(
        `${baseurl}${WORKFLOW_API}/WorkflowPackages/${workflow.id}`,
        {}
      );
    });
    console.log(`start deleting ${workflows.length} workflows`);
    await Promise.all(deletes);
    console.log("succeed");
  }

  return (
    <Page title="api">
      <Stack>
        <TextInput
          label="baseurl"
          placeholder="localhost"
          value={baseurl}
          onChange={(e) => setBaseurl(e.target.value)}
        />
        <Button onClick={deleteAllWorkflow}>delete all workflow</Button>
      </Stack>
    </Page>
  );
}
