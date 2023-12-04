"use client";
import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

import { useProfile } from "@/hooks/useprofile";
import { myCache } from "@/lib/nodecache";
import { UserData } from "@/types/animetypes";
import { UserContextState } from "@/types/UserTypes";
import Toast from "@/utils/toast";

const defaultContextState: UserContextState = {
    username: "",
    email: "",
    userId: "",
    profilePicture: "",
    userDescription: "",
    loading: true,
    isProfileUpdated: false,
    tokenExistOrNot: false,
    setUsername: () => {},
    setUserDescription: () => {},
    getUserData: async () => {},
    setProfileUpdated: () => {},
    setProfilePicture: () => {},
};

const UserContext = createContext<UserContextState>(defaultContextState);

interface ProfileProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<ProfileProviderProps> = ({ children }) => {
    const token = getCookie("token");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [loading, setLoading] = useState(true);
    const [userDescription, setUserDescription] = useState("");
    const { isProfileUpdated, setIsProfileUpdated } = useProfile();
    const [tokenExistOrNot, setTokenExistOrNot] = useState(false);
    function checkIfTokenExistOrNot() {
        if (token === undefined || token === null || token.length === 0) {
            setTokenExistOrNot(false);
        } else {
            setTokenExistOrNot(true);
        }
    }
    const getUserData = useCallback(async () => {
        const cacheKey = "userData";
        try {
            const cachedData = myCache.get<UserData>(cacheKey);
            if (cachedData) {
                console.log("Getting data from cache");
                setUsername(cachedData.username || "?");
                setProfilePicture(cachedData.profilePicture || "");
                setEmail(cachedData.email || "unknown");
                setUserDescription(cachedData.userDescription || "");
                setLoading(false);
                return;
            }
            const userResponse = await fetch("/api/get-users");
            const user = await userResponse.json();
            setUsername(user?.userData?.username || "?");
            setEmail(user?.userData?.email || "unknown");
            setProfilePicture(user?.userData?.profilePicture || "");
            setUserDescription(user?.userData?.userDescription || "");
            setUserId(user?.userData?._id || "");
            setLoading(false);
        } catch (error: unknown) {
            const Error = error as Error;
            setLoading(false);
            Toast.ErrorShowToast(Error?.message || "Something went wrong");
        }
    }, []);

    useEffect(() => {
        checkIfTokenExistOrNot();
        if (token || isProfileUpdated) {
            getUserData();
        }
    }, [token, isProfileUpdated]);

    return (
        <UserContext.Provider
            value={{
                username,
                email,
                profilePicture,
                userDescription,
                loading,
                tokenExistOrNot,
                isProfileUpdated,
                getUserData,
                setUsername,
                userId,
                setUserDescription,
                setProfilePicture,
                setProfileUpdated: setIsProfileUpdated,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
