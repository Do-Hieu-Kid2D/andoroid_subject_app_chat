// UserContext.js
import React, {createContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [urlProfile, setUrlProfile] = useState('');

    return (
        <UserContext.Provider value={{urlProfile, setUrlProfile}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
