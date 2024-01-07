import type { Dispatch, SetStateAction } from "react"
import { createContext, useContext } from "react"

enum Theme {
    DARK = "dark",
    LIGHT = "light"
}

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>]

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

const themes: Array<Theme> = Object.values(Theme)

function isTheme(value: unknown): value is Theme {
    return typeof value === "string" && themes.includes(value as Theme)
}

export { Theme, themes, useTheme, isTheme }
