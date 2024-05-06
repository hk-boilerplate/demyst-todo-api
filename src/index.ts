import { createServer } from "./app";

async function start() {
  const server = await createServer();
  await server.listen(5000, "0.0.0.0", () => {
    console.info(`Demyst Api listening on http://localhost:5000`);
  });
}

start().catch((err) => {
  console.log(err);
});
