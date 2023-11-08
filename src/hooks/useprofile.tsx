"use client";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ProfileContextProps {
    isProfileUpdated: boolean;
    setIsProfileUpdated: Dispatch<SetStateAction<boolean>>;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

interface ProfileProviderProps {
    children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
    const [isProfileUpdated, setIsProfileUpdated] = useState<boolean>(false);

    return <ProfileContext.Provider value={{ isProfileUpdated, setIsProfileUpdated }}>{children}</ProfileContext.Provider>;
};

export const useProfile = (): ProfileContextProps => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};
