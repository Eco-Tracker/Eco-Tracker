import React, { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [challenges, setChallenges] = useState({
        id: "",
        name: "",
        description: "",
        deadline: "",
        points: "",
        isCompleted: ""
        //   authorId :""
    });

    return (
        <AuthContext.Provider value={[challenges, setChallenges]}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthContext, AuthProvider };