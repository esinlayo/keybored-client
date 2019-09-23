import React, { useRef } from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const SendLinkPrompt = (props) => {

    const inputEl = useRef(null);

    const copyToClipboard = (e) => {
        console.log(e.currentTarget)
        console.log(inputEl)
        inputEl.current.focus();
        inputEl.current.select()
        document.execCommand('copy');
    };

    return (
        <div width="100%">
            <Typography variant="body1" component="div">
                {"Send this link to your friends!"}
            </Typography>
            <input
                ref={inputEl}
                value={props.link}
                readOnly />
            {
                document.queryCommandSupported('copy') &&
                <Button style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    margin: "4px"
                }}
                    size="small"
                    color="primary"
                    variant="contained"
                    style={{
                        margin: "0px 5px",
                        padding: "5px 5px",
                        minWidth: "0",
                    }}
                    onClick={copyToClipboard}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>

                </Button>
            }

        </div>
    );
}

export default SendLinkPrompt;