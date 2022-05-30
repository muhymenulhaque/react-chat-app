import * as React from 'react';
import MessageGroup from './MessageGroup';


const Messages = ({ messages }) => {
  
  let lastMessage = null;
  const groups = [];
  let group = [];
  messages.forEach((message) => {
    if (lastMessage !== null && lastMessage.userId === message.userId) {
      group.push(message);
    } else {
      if (group.length !== 0) groups.push(group);
      group = [message];
    }

    lastMessage = message;
  }) 

  if (group.length !== 0) groups.push(group);


  return (
    <>
      
      {
        groups.map(Group => {
          return (
            <div>
              <MessageGroup messages={Group} />
            </div>
          )
        })
      }

    </>
  )
}
export default Messages;