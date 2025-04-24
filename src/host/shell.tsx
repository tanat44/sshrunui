import { spawn } from "child_process";
import { IpcMainInvokeEvent } from "electron";

export async function startShell(e: IpcMainInvokeEvent, command: string) {
  // if (shellProcess) return;
  // const isWin = process.platform === "win32";
  let shellProcess = spawn("ls", ["-la"]);

  shellProcess.stdout.pipe(process.stdout);
  // shellProcess.stdout.on("data", (chunk) => {
  //   e.sender.send("shellOutput", Buffer.from(chunk).toString());
  // });

  shellProcess.on("close", (code) => {
    shellProcess = undefined;
    console.log(`Child process exited with code ${code}.`);
  });
}

export async function runShellCommand(e: IpcMainInvokeEvent, command: string) {
  const commands: string[] = ["ls", "-la"];

  const isWin = process.platform === "win32";
  const child = isWin
    ? spawn("wsl", commands)
    : spawn(commands[0], commands.splice(1));

  // use child.stdout.setEncoding('utf8'); if you want text chunks
  child.stdout.on("data", (chunk) => {
    e.sender.send("shellOutput", Buffer.from(chunk).toString());
  });

  child.stderr.pipe(process.stdout);

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return "hi";
}
