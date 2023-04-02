import { useState } from "react";
import { MessageContext } from "./MessageContext";

const MessageContext = (props) =>{

    const [searchedQuery, setSearchedQuery] = useState('');

    return(
        <MessageContext>
            {props.children}
        </MessageContext>
    )
}

export default MessageContext