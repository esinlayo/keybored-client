import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { generateRandomLeaderboardName } from "./../../services";

const ProfileCreator = (props) => {
    const [name, setName] = useState(generateRandomLeaderboardName());
    const [character, setCharacter] = useState(0)
    const [color, setColor] = useState(0)

    return (
        <React.Fragment>
            {"Play keybored with your friends!"}
            <br />
            {"Create your character below."}
            <hr />
            <div width="100%" style={{ textAlign: "center" }}>
                <div style={{ display: "inline-block", textAlign: "left" }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        margin="normal"
                        style={{ width: "100%" }}
                    />
                    <br />
                    <FormControl>
                        <InputLabel>Color</InputLabel>
                        <Select native value={color} onChange={e => setColor(e.target.value)}>
                            <option value={0}>Red</option>
                            <option value={1}>Blue</option>
                            <option value={2}>Green</option>
                        </Select>
                    </FormControl>
                    <FormControl style={{ padding: "0px 0px 0px 15px" }}>
                        <InputLabel style={{ padding: "0px 0px 0px 15px" }}>Character</InputLabel>
                        <Select native value={character} onChange={e => setCharacter(e.target.value)}>
                            <option value={0}>Car</option>
                            <option value={1}>Wheelchair</option>
                            <option value={2}>Shopping Cart</option>
                        </Select>
                    </FormControl>
                    <br /><center>
                        <Button
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                margin: "10px 0px",
                            }}
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={() => props.create({ name, character, color })}>Join</Button>
                    </center>
                </div></div>
        </React.Fragment >
    );
}

export default ProfileCreator;