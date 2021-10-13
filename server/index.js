const WebSocket = require("ws")

const wss = new WebSocket.Server({ port : 8081 })
let usernames = []
let messages = []

wss.broadcast = function broadcast(msg) {
    console.log("sending "+msg+ " to all client");
    wss.clients.forEach(function each(client) {
        client.send(msg);
     });
 };

wss.on("connection", ws => {
    console.log("a client handshaked with you");

    ws.send(messages)

    ws.on("message", data =>{
        res = JSON.parse(data)
        if (res.type == "username") {
            let username = res.username
            usernames.push(username)
            const message = {
                type: "chat",
                username: "",
                message: username + " has connected to the server",
                time: Date.UTC()

            }
            
            console.log("Online : " + usernames)
            messages.push(message)
            wss.broadcast(JSON.stringify(message))
        }else if (res.type == "chat") {
            const message = {
                type: "chat",
                username: res.username,
                message: res.message,
                time: Date.UTC()
            }
            messages.push(message)
            console.log(messages)
            wss.broadcast(JSON.stringify(messages))
            
        }

    })

    
    

    ws.on("close", ()=>{
        console.log("Client disconnected")
    })
})