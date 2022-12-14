import server from "./router/server";

const app = server;
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
