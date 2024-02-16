// UserContext.js
import React, {createContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [isRememberMe, setIsRememberMe] = useState(false);

    return (
        <UserContext.Provider value={{isRememberMe, setIsRememberMe}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
