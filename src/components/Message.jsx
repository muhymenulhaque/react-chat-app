import React from 'react';
import { Typography } from '@mui/material';

const Message = ({ message }) => {
  return (
    <>
      <Typography variant="body2" gutterBottom>
        {message.message}
      </Typography>
    </>
  )
}

export default Message;