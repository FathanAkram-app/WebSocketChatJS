
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState("")
  const [messages, setMessages] = useState([])
  const [loggedin, setLoggedin] = useState(false)
  const [chat, setChat] = useState([])
  const [ws, setWS] = useState()
  
  
    
  return (
    <div className="App">
      <body>
      {loggedin ? null : <button onClick={()=>connectWebSocket(setLoggedin,setMessages,setUsername,setWS,messages)}>Login</button>}
      <div class="space-y-4">
        {
          console.log(messages)
        }
          
      </div>
      <div class="content-start">
        <input class="border" onChange={(e)=>{
          setChat(e.target.value)
        }}></input>
        <button class="border" onClick={()=>{
          ws.send(JSON.stringify({
            type: "chat",
            username: username,
            message: chat,
            time: Date.UTC()
        }))
        }}>send</button>
      </div>
      
      </body>
      
    </div>
  );
}

function connectWebSocket(setLoggedin,setMessages,setUsername, setWS, messages) {
  const username = window.prompt("Please enter your username", "")
    if (username != null && username != ""){
      const ws = new WebSocket('ws://localhost:8081');
      setWS(ws)
      ws.addEventListener("open", ()=>{
        setLoggedin(true)
        console.log("we are connected!")
        setUsername(username)
        ws.send(JSON.stringify({
          type:"username",
          username: username
        }))
        ws.addEventListener("message", ({data}) => {
          const res = JSON.parse(data)
          
          if (res.type == "chat"){
            setMessages(res)
            console.log(res.message)
          }
        })
      })
    }
  
}


export default App;
