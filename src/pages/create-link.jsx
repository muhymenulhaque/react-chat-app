import React from "react";
import CollectName from "../components/CollectName";
import AfterNameCollection from "../components/AfterNameCollection";
import { Paper } from "@mui/material";

import "./../styles/create-link-styles.css";

const CreateLink = () => {
    

    const [name, setName] = React.useState("");
    const [generatedLink, setGL] = React.useState("");

    const [nameCollectionDone, setNCD] = React.useState(false);

    return (
        <div id="create-link-container">
            <Paper style={{width: "30em", padding: "1.5em",  backgroundColor: "#36393f", color: "#b9bbbe"}} elevation={3}>
                {(nameCollectionDone && generatedLink !== "") ? <AfterNameCollection generatedLink={generatedLink}/> : <CollectName name={name} setName={setName} setNCD={setNCD} setGL={setGL}/>}
            </Paper>
        </div>
    );
}

export default CreateLink;