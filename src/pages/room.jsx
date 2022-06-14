import * as React from "react";
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import SendRounded from '@mui/icons-material/Send';
import Box from '@mui/material/Box';

import Messages from "../components/Messages";
import { 
  readMessages, 
  getSnapshotEssentials, 
  uploadMessage, 
  getLatestId, 
  getServerTimestamp
} from "../firebase.jsx";
import GetEmptyName from "../components/GetEmptyName";
import { IconButton } from "@mui/material";



const Room = () => {
    let navigate = useNavigate();
    const { roomId } = useParams();
    //if roomId.length !== 8 or roomId doesnt have any room, go to error page. Doesnt exist 
    // if no name, ask for name for this room
    //verification stuff

    const [name, setName] = React.useState(localStorage.getItem(roomId));

    const [message, setMessage] = React.useState("");
    const [messages, _setMessages] = React.useState([]);
    
    const messagesRef = React.useRef(messages);
    const setMessages = (data) => {
        messagesRef.current = data;
        _setMessages(data);
    };
    
    
    //function to handle the UI when sending the message
    const addMessage = (message) => {
        uploadMessage(roomId, message);
        setMessage('');
    }


    const handleSendMessage = (e) => {         
        //validate the message field
        if (message === '') {
            return;
        }

        let localName = localStorage.getItem(roomId);
        localName = localName == null ?  "Nobody" : localName;
        
        setName(localName);
        const date = getServerTimestamp();
        let userId = localStorage.getItem("userId");

        if (userId === undefined || userId === null || userId.length !== 20) {
            const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            userId = "";

            for (let i = 0; i < 20; i++) {
                const rand = Math.floor(Math.random() * characters.length);
                userId += characters[rand];
            }

            localStorage.setItem("userId", userId);
        }

        let avatarStartColor = localStorage.getItem(roomId + ".start") || "#d4fc79";
        let avatarEndColor = localStorage.getItem(roomId + ".end") || "#96e6a1";

        //wrapper for handling the async code during sending messages
        (async () => {
            let messageId = await getLatestId(roomId);
            messageId++;
            
            
            if (typeof messageId == 'number') {
                const messageObj = {date, name, message, id: messageId, userId, avatarStartColor, avatarEndColor};
                addMessage(messageObj);
                console.log(messageObj)
            }
        })();
    }
    
    
    //get the messages from the server and show in the UI
    React.useEffect(() => {
        const getMessages = async () => {
            const cloudMessages = await readMessages(roomId, 30);
            setMessages(cloudMessages);
            
            document.querySelector("#messageSendBox").scrollIntoView();

            
            const snapshotEssentials = await getSnapshotEssentials(roomId);
            snapshotEssentials.onSnapshot(snapshotEssentials.query, (querySnapshot) => {
                querySnapshot.docChanges().forEach((change) => {

                if (change.type === "added") {
                    let newMessage = change.doc.data();
                    console.log(newMessage)

                    if (newMessage.date === null) {
                        newMessage.date = {seconds: Math.floor(Date.now() / 1000)}
                    }
                    
                    setMessages([...messagesRef.current, newMessage]);

                    document.querySelector("#messageSendBox").scrollIntoView();
                }

                });
            })
        }
        
        getMessages();
    }, []);



    return (<div style={{ display: "flex", minHeight: "100vh", minWidth: "100vw", backgroundColor: "#36393f"}}>
        <Box style={{padding: "1em", marginTop: "auto", width: "100%" }}>
            <div>
                <Messages messages={messages} />
            </div>

            <input id="messageSendBox" autoComplete="off" autoFocus value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                    document.querySelector('#send').click();
                    }
                }}
                style={{ margin:1, backgroundColor: "#40444b", width: "95%", border: "none", padding: "1em", color: "#c8cacb" }}
            />

            <IconButton variant="contained" color="primary" id="send" onClick={handleSendMessage}>
                <SendRounded />
            </IconButton>
            
        </Box>

        {name ? "" : <GetEmptyName roomId={roomId} setNameState={setName}/>}
    </div>)
}

export default Room;