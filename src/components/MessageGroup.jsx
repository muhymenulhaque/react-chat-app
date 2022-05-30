import * as React from 'react';
import { Typography } from '@mui/material';
import Message from './Message';

const MessageGroup = ({ messages }) => {
  
  let date = new Date(messages[0].date.seconds * 1000);
  let dateStr = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  let startColor = messages[0].avatarStartColor;
  let endColor = messages[0].avatarEndColor;

  return (
    <>
      <div id="one">
        {/* container */}
        <div id="two" style={{margin: ".5em"}}>
          {/* picture */}
          <span className="four" style={{backgroundColor: startColor, background: `linear-gradient(45deg, ${startColor}, ${endColor})`}}></span>
        </div>
        <div id="three" style={{margin: ".5em"}}>
          {/* name and messages */}
          <div style={{display: "flex"}}>
            <Typography variant="subtitle2" gutterBottom component="div" style={{color: "#fff"}}>
              { messages[0].name}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom style={{color: "#a3a6aa", marginLeft: "1em", marginTop: ".2em"}}>
              { dateStr }
            </Typography>
          </div>

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