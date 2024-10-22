const express = require("express");
const app = express();
const cors = require("cors");


const corsOptions = {
  origin: 'http://localhost:5173', // URL do seu frontend
  credentials: true, // Permite cookies com a requisição
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

require("./db/conn");

const port = 3000;

const userRoutes = require("./routes");

app.use("/users", userRoutes);

app.listen(port, async () => {
  console.log(`O servidor iniciou na porta ${port}`);
});
