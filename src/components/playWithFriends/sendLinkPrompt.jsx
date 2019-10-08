import React, { useRef } from 'react'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip"

const SendLinkPrompt = (props) => {
    const inputEl = useRef(null);
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const [tooltipText, setTooltipText] = React.useState("Copied to clipboard!");

    const handleTooltipClose = () => { setTooltipOpen(false); };

    const handleTooltipOpen = () => {
        setTooltipOpen(true);
        setTimeout(handleTooltipClose, 5000)

        inputEl.current.focus();
        inputEl.current.select()
        if (document.queryCommandSupported && document.queryCommandSupported('copy'))
            document.execCommand('copy');
        else setTooltipText("Press Ctrl+C to copy")
    };

    const copyButtonStyle = { display: "inline-block", minWidth: "0", verticalAlign: "middle", margin: "0px 5px", padding: "1px 5px", };

    return (
        <div width="100%">
            <Typography variant="body1" component="div">{"Send this link to your friends!"}</Typography>
            <input ref={inputEl} value={props.link} readOnly />
            <Tooltip
                open={tooltipOpen}
                placement="right"
                disableFocusListener disableHoverListener disableTouchListener
                onClose={handleTooltipClose}
                title={tooltipText}>
                <Button style={copyButtonStyle} size="small" color="primary" variant="contained" onClick={handleTooltipOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
                </Button>
            </Tooltip>
        </div>
    );
}

export default SendLinkPrompt;