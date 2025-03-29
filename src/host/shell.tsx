import { spawn } from "child_process";
import { IpcMainInvokeEvent } from "electron";

export async function runShellCommand(e: IpcMainInvokeEvent, command: string) {
  const child = spawn("ls", ["-lh", "/usr"]);

  // use child.stdout.setEncoding('utf8'); if you want text chunks
  // child.stdout.on("data", (chunk) => {
  //   console.log(chunk);
  //   chunk.pipe(process.stdout);
  //   // data from standard output is here as buffers
  // });

  child.stdout.pipe(process.stdout);

  // since these are streams, you can pipe them elsewhere
  child.stderr.pipe(process.stdout);

  e.sender.send("shellOutput", "hello from shell");

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return "hi";
}
