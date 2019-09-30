import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { generateRandomLeaderboardName } from "./../../services";
import { Character } from "./../common/progressContainer"
import { characters } from "./../common/characters"
const colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Purple"]

const ProfileCreator = (props) => {
    const [name, setName] = useState(generateRandomLeaderboardName());
    const [character, setCharacter] = useState(Math.floor(Math.random() * characters.length))
    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)])

    return (
        <React.Fragment>
            {"Play keybored with your friends!"}
            <br />
            {"Create your character below."}
            <hr />
            <div width="100%" style={{ textAlign: "center" }}>
                <div style={{ textAlign: "center", width: "100%" }}>
                    <div style={{ display: "inline-block", width: "100px" }}>
                        <Character character={character} color={color} />
                    </div></div>
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
                            {colors.map((val, idx) => {
                                return <option key={idx} value={val}>{val}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl style={{ padding: "0px 0px 0px 15px" }}>
                        <InputLabel style={{ padding: "0px 0px 0px 15px" }}>Character</InputLabel>
                        <Select native value={character} onChange={e => setCharacter(e.target.value)}>
                            {characters.map((val, idx) => {
                                return <option key={idx} value={idx}>{val}</option>
                            })}
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