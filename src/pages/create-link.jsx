import React from "react";
import TextField from '@mui/material/TextField';
import { generateLink } from "../firebase";

const CreateLink = () => {
    

    const [name, setName] = React.useState("");
    const [generatedLink, setGL] = React.useState("");

    React.useEffect(() => {
        setGL(generateLink());
    }, [])

    return (
        <>
            What should we call you? <br />
            <TextField label="Name" variant="outlined" value={name} onChange={(e) => {
                setName(e.target.value);
            }}/>
            {name}
            <br />

            Share this link with your friend to let them join. <br />
            {generatedLink} 'copy' <br />

            Chatroom  <br />

        </>
    );
}

export default CreateLink;