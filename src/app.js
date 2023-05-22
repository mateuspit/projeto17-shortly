import express from "express";
import cors from "cors";
import apiPort from "./constants/apiPort.js";
import router from "./routes/index.routes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
console.log("app");

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
