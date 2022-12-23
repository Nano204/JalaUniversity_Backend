import { DBInit } from "./database/DBInit";
import server from "./router/server";

const app = server;
const port = 3000;

app.listen(port, () => {
  new DBInit().initializeDB();
  console.log(`Example app listening on port ${port}`);
});
