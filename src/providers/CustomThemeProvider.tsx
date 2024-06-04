"use client";
import { useTheme as useNextTheme } from "next-themes";
import {
    type PropsWithChildren,
    createContext,
    useContext,
    useEffect,
} from "react";

import { THEME_COLOR_DARK, THEME_COLOR_LIGHT } from "@/constants";
import { colorMetaTags } from "@/utils/metadata";

export type ThemeOption = "system" | "light" | "dark";
interface ThemeContextValue {
    theme: ThemeOption;
    isDark: boolean;
    resolvedTheme: ThemeOption
    systemTheme: ThemeOption
    setTheme?: (theme: ThemeOption) => void;
}

const defaultContextState: ThemeContextValue = {
    theme: "system",
    systemTheme: 'light',
    isDark: false,
    resolvedTheme: "light",
    setTheme: (theme: ThemeOption) => {}
};

const ThemeContext = createContext<ThemeContextValue>(defaultContextState);

export const CustomThemeProvider = (props: PropsWithChildren) => {
    const { theme = "system", systemTheme, resolvedTheme, setTheme } = useNextTheme();


    useEffect(() => {
        colorMetaTags.forEach(tag => {
            document.head
                .querySelectorAll(`meta[name="${tag}"]`)
                .forEach(meta =>
                    meta.setAttribute(
                        "content",
                        resolvedTheme === "dark" ? THEME_COLOR_DARK : THEME_COLOR_LIGHT,
                    ),
                );
        });
    }, [resolvedTheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme: theme as ThemeOption,
                isDark: resolvedTheme === "dark",
                setTheme,
                resolvedTheme: resolvedTheme as ThemeOption,
                systemTheme: systemTheme as ThemeOption
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextValue =>
    useContext(ThemeContext) || defaultContextState;
