import * as React from 'react';
import { Typography } from '@mui/material';
import Message from './Message';

const MessageGroup = ({ messages }) => {
  
  return (
    <>
      <div id="one">
        {/* container */}
        <div id="two">
          {/* picture */}
          <span id="four"></span>
        </div>
        <div id="three">
          {/* name and messages */}
          <Typography variant="subtitle2" gutterBottom component="div">
            { messages[0].name}
          </Typography>

          {
            messages.map((message) => {
              return <Message message={message}/>
            })
          }
          
        </div>
      </div>
    </>
  )
}
export default MessageGroup;