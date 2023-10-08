"use client";
import axios from "axios";
import React, { createContext, useState } from "react";

type LoginAndRegisterContextType = {
    loggedIn: boolean;
    RegisterUser: (userData: object) => void;
    responseData: any;
    Loginuser: (loginData: object) => void;
};

// Create your context with the specified type
export const LoginAndRegisterContext = createContext<LoginAndRegisterContextType>({
    loggedIn: false,
    RegisterUser: () => { },
    responseData: null,
    Loginuser: () => { }
});

export const LoginAndRegisterProvider = ({ children }: { children: React.ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [responseData, setResponseData] = useState<any>();
    const RegisterUser = async (userData: object) => {
        const response = await axios.post("/api/register", userData);
        setResponseData(response.data);
    };
    const Loginuser = async (loginData: object) => {
        const response = await axios.post("/api/login", loginData);
        setResponseData(response);
    };

    return <LoginAndRegisterContext.Provider value={{ loggedIn, RegisterUser, responseData, Loginuser }}>{children}</LoginAndRegisterContext.Provider>;
};
