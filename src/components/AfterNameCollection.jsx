import * as React from 'react';
import { Button, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';


const AfterNameCollection = ({generatedLink}) => {
    let navigate = useNavigate();
    let link = window.location.origin + window.location.pathname.replace("/create-link", "")     + "/room/" + generatedLink

    return (
        <>
            Share this link with your friend to let them join. <br />
            {link} 
            <IconButton title="Copy" sx={{color: "#01acef"}} onClick={() => {
                navigator.clipboard.writeText(link);
            }}>
                <LinkIcon />
            </IconButton>
            
            <br />

            <Button variant="contained" onClick={() => {
                console.log("/room/" + generatedLink)
                navigate("/room/" + generatedLink)

                // keep the next room disabled until room generation completed
            }} style={{width: "100%", textTransform: "unset"}}>Enter Chat</Button> <br /> 
        </>
    )
}

export default AfterNameCollection; 