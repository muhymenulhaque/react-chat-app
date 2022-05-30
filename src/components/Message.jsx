import React from 'react';
import { Typography } from '@mui/material';

const Message = ({ message }) => {
  return (
    <>
      <Typography variant="body2" gutterBottom style={{color: "#d7d6d9"}}>
        {message.message}
      </Typography>
    </>
  )
}

export default Message;