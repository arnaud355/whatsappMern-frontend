import React, {useState} from 'react';
import "./Chat.css";
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile,SearchOutlined} from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Clock from "./Clock";
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";

function Chat({messages}) {
    const [input,setInput] = useState("");

    const sendMessage = async(e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            name: "Demo app",
            message: input,
            timestamp: "just now",
            received: false,
        });

        setInput("");
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <Clock />
                
                {messages.map((message) => (
                    /*why map() et pas foreach(): parceque foreach ne
                    retourne pas du jsx mais du texte brute */
                    //jsx, s'il un message reçu, alors applique aussi la class reciever
                    
                    <p className={`chat__message ${message.received && "chat__reciever"}`}>
                      <span className="chat__name">{message.name}</span>
                      {message.message}
                      <span className="chat__timestamp">
                          {message.timestamp}
                          
                      </span>
                    </p>
                ))}
                
            </div>

            <div className="chat___footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="type a message"
                    type="text" />
                    <button 
                    onClick={sendMessage}
                    type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
            
        </div>
    )
}

export default Chat
