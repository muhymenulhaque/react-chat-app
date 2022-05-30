import * as React from 'react';
import { Button } from '@mui/material';

import { newLink } from "../firebase";



const CollectName = ({name, setName, setNCD, setGL}) => {
    

    return (
        <div style={{width: "auto"}}>
                Create a room <br />
                SELECT A NAME    <br />
                <input type="text" value={name} autoComplete="off" onChange={(e) => {
                    setName(e.target.value);
                }} onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        document.querySelector('#afterNameBtn').click();
                    }
                }} style={{width: "100%", backgroundColor: "#202225", color: "#dcddde", padding: ".3em", border: "none" }}/>

                <br />
            
            
                <Button id="afterNameBtn" variant="contained" size="small" onClick={() => {
                    if (name !== "") setNCD(true)
                    
                    newLink(name).then(setGL);
                }} style={{width: "100%", color: "#fff", backgroundColor: "#5865f2", padding: ".7em", textTransform: "unset"}}>
                    Continue
                </Button>

        </div>
    )
}

export default CollectName; 