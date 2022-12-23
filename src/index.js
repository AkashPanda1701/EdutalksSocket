require("dotenv").config();

const express = require("express");
const connectDB = require("./.config/db");
const cors = require("cors");
const PORT = process.env.PORT;

const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const History = [{
    type:'admin',
    message:'Welcome to the chat'
} , {
    type:'admin',
    message:'What is your name?'
}];
let count = 0;
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
    socket.on("message", (msg) => {
        console.log("message: " + msg);
        count++;
        History.push(msg);
        if(count === 1){
            History.push({
                type:'admin',
                message:'Hello '+msg.message+'! How are you?'
            })
        }
        if(count === 2){
            History.push({
                type:'admin',
                message:'Nice to meet you '
            })
        }

        
        socket.emit("history", History);
    });
    
    socket.emit("history", History);
    


 
});

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  return res.send(`<button type="button">
        <a href=https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}>Login with Github</a>
    </button>`);
});

server.listen(PORT, async () => {
  await connectDB();
  console.log(`listening http://localhost:${PORT}`);
});
