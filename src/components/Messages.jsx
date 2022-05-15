import * as React from 'react';
import MessageGroup from './MessageGroup';


const Messages = ({ messages }) => {
  // let lastMessage = null;

  // return (
  //   <div>
  //     { 
  //       messages.map((message) => {
  //         let messageComp = <Message message={ message } lastMessage={ lastMessage }/>
  //         lastMessage = message;
  //         return messageComp;
  //       }) 
  //     }
  //   </div>
  // )


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
            <>
              <MessageGroup messages={Group} />
              <br/>
            </>
          )
        })
      }

    </>
  )
}
export default Messages;