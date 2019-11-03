let decipher = salt => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    //let saltChars = textToChars(salt)
    let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('')
};

const getuid = () => {
    let name = document.cookie;
    if (name.length >= 4) name = decipher('keybored-game')(name.substring(4, name.length));
    else name = null;
    return name
}

export default getuid;