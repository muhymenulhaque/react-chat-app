import React, { useContext } from "react";

import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import SendRounded from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Messages from "../components/Messages";
import { 
  readMessages, 
  getSnapshotEssentials, 
  uploadMessage, 
  getLatestId, 
  getServerTimestamp
} from "../firebase.jsx";

import { UserContext } from "../context/user.jsx";


const Chatroom = () => {
  const user = useContext(UserContext);
  
  const [message, setMessage] = React.useState("");
  const [messages, _setMessages] = React.useState([]);
  
  const messagesRef = React.useRef(messages);
  const setMessages = (data) => {
    messagesRef.current = data;
    _setMessages(data);
  };
  
  
  //function to handle the UI when sending the message
  const addMessage = (message) => {
    uploadMessage(message);
    setMessage('');
  }


  const handleSendMessage = (e) => {         
    //validate the message field
    if (message === '') {
      return;
    }
    
    const name = user.name;
    const date = getServerTimestamp();
    const userId = user.id;
    
    //wrapper for handling the async code during sending messages
    (async () => {
      let messageId = await getLatestId();
      //setLatestId(messageId);
      messageId++;
      
      
      if (typeof messageId == 'number') {
        const messageObj = {date, name, message, id: messageId, userId};
        addMessage(messageObj);
      }
    })();
  }
  
  
  
  //get the messages from the server and show in the UI
  React.useEffect(() => {
    const getMessages = async () => {
      const cloudMessages = await readMessages(30);
      setMessages(cloudMessages);
      
      const snapshotEssentials = await getSnapshotEssentials(30);
      snapshotEssentials.onSnapshot(snapshotEssentials.query, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {

          if (change.type === "added") {
            setMessages([...messagesRef.current, change.doc.data()]);
          }

        });
      })
    }
    
    getMessages();
  }, []);
  
  
  
  return (
    <Box sx={{ bgcolor: '#aaf' }}>
      <Container maxWidth='sm'sx={{ backgroundColor: 'white' }} >
        
        <div>
          <Messages messages={messages} />
        </div>

        <TextField label="Message" variant="outlined" fullWidth value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              document.querySelector('#send').click();
            }
          }}
          sx={{ margin:1 }}
        />

        <br></br>

        <Button variant="contained" id="send" startIcon={<SendRounded />} onClick={handleSendMessage}>
        </Button>
        
      </Container>
    </Box>
  );
};

export default Chatroom;