"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type ThemeOptions = "light" | "dark";

interface ThemeContextProps {
    theme: ThemeOptions;
    toggleTheme: (newTheme: ThemeOptions) => void;
}

interface ProfileProviderProps {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

const ThemeProvider: React.FC<ProfileProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeOptions>(getInitialTheme);

    function getInitialTheme(): ThemeOptions {
        return "dark";
    }

    const toggleTheme = (newTheme: ThemeOptions) => {
        setTheme(newTheme);
    };

    const contextValue: ThemeContextProps = {
        theme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, useTheme };
