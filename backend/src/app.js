import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

const start = async () => {
  app.set("mongo_user");
  const connection_db = await mongoose.connect(
    "mongodb+srv://shubhs7430:vwd4Q0vCLaHrHoRj@cluster0.f1zhpmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log(`Connection DB Host :${connection_db.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENIG ON PORT 8000");
  });
};

start();
