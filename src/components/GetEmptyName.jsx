import * as React from "react"

import { Button, Paper } from '@mui/material';
import { setNewName } from "../firebase";

const GetEmptyName = ({roomId, setNameState}) => {
    const [namex, setNamex] = React.useState("");

    return (<div style={{zIndex: "10", position: "absolute", backgroundColor: "#5865f2", minHeight: "100vh", minWidth: "100vw", display: "flex", alignItems: "center", justifyContent: "center", userSelect:"none"}}>
        <Paper style={{width: "30em", padding: "1.5em",  backgroundColor: "#484d56", color: "#b9bbbe"}} elevation={3}>
            Select your name <br />
            <input type="text" value={namex} autoComplete="off" onChange={(e) => {
                setNamex(e.target.value);
            }} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    document.querySelector('#afterNameBtn').click();
                }
            }} style={{width: "100%", backgroundColor: "#202225", color: "#dcddde", padding: ".3em", border: "none" }}/>

            <br />

            <Button id="afterNameBtn" variant="contained" size="small" onClick={() => {
                if (namex !== "") setNewName(roomId, namex);
                setNameState(namex);
            }} style={{width: "100%", color: "#fff", backgroundColor: "#5865f2", padding: ".7em", textTransform: "unset"}}>
                Continue
            </Button>
        </Paper>
    </div>)
}

export default GetEmptyName;