import React,{useEffect, useState} from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

/*
  For the frontend: react, firebase (for authentification and hosting)
  and back-end : express (port 9OOO), node, mongodb).

  For install express and mongodb:
  creer un dossier exterieur, faire un git init, puis npm init.
  donner le nom server.js pour l'entree, et son nom pour l'auteur.

  Dans le package.json ajouter, dans le script:
   "start": "node server.js".

   Revenir au terminal: npm i express mongoose.
   verifier dans package.json si paquets bien installes.

   creer fichier .gitignore,en y mettant node_modules (place)
   installer pusher dans le nouveau dossier.

   Dans le dossier initial, installer pusher-js
*/
function App() {
  const [messages,setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  },[]);

  useEffect(() => {
    const pusher = new Pusher('2ec0037f62e4e6f40b0e', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessage) => {
    //alert(JSON.stringify(newMessage));
    setMessages([...messages, newMessage]);
    });

    return () => {
      //we check for only one subscriber, 
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    
    </div>
  );
}

export default App;
