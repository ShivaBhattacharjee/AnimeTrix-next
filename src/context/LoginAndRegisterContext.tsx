"use client"
import axios from "axios";
import React, { createContext, useState, ReactNode } from "react";

type UserData = {
    username: string;
    email: string;
    password: string;
};

type LoginData = {
    email: string;
    password: string;
};


type LoginAndRegisterContextType = {
    RegisterUser: (userData: UserData) => Promise<any>;
    Loginuser: (loginData: LoginData) => Promise<any>;
};

type LoginAndRegisterProviderProps = {
    children: ReactNode;
};


export const LoginAndRegisterContext = createContext<LoginAndRegisterContextType>({
    RegisterUser: async () => { },
    Loginuser: async () => { },
});

export const LoginAndRegisterProvider = ({ children }: LoginAndRegisterProviderProps) => {
    const RegisterUser = async (userData: UserData): Promise<any> => {
        const response = await axios.post("/api/register", userData);
        return response.data;
    };

    const Loginuser = async (loginData: LoginData): Promise<any> => {
        const response = await axios.post("/api/login", loginData);
        return response.data;
    };
    return <LoginAndRegisterContext.Provider value={{ RegisterUser, Loginuser }}>{children}</LoginAndRegisterContext.Provider>;

};
