import { sleep } from "https://deno.land/x/sleep@v1.2.1/mod.ts";

const commands = [
  "docker compose down",
  "docker compose up -d --build --force-recreate --remove-orphans",
  "docker exec k0s k0s token create --role=worker --expiry=100h",
];

for (const command of commands) {
  const output = await Deno.run({
    cmd: [...command.split(" ")],
    stdout: "piped",
  }).output();

  console.log(`Command: ${command} was executed`);
  

  let index = 0;
  await sleep(2);

  if (!command.includes("k0s")) continue;
  const stdout = new TextDecoder().decode(output);

  await Deno.writeTextFile(`./k0s/token-file-${index}`, stdout);
  index += 1;
}