import { useState } from "react";
import { UserContext } from "./UserContext";

const UserStates = (props) =>{

    const [user, setUser] = useState({});

    const [searchedQuery, setSearchedQuery] = useState('')


    return(
        <UserContext.Provider value={{user, searchedQuery ,setUser, setSearchedQuery}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserStates