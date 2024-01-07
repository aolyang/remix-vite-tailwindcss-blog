import { useFetcher } from "@remix-run/react"

import { type PropsWithChildren, useEffect, useRef, useState } from "react"

import { Theme, ThemeContext, themes } from "./theme-context"

const prefersDarkMQ = "(prefers-color-scheme: dark)"
const getPreferredTheme = () =>
    window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT

type ThemeProps = {
    specifiedTheme: Theme | null
}

function ThemeProvider({ children, specifiedTheme }: PropsWithChildren<ThemeProps>) {
    const [theme, setTheme] = useState<Theme | null>(() => {
        if (specifiedTheme) {
            if (themes.includes(specifiedTheme)) {
                return specifiedTheme
            } else {
                return null
            }
        }
        // there's no way for us to know what the theme should be in this context
        // the client will have to figure it out before hydration.
        if (typeof window !== "object") {
            return null
        }

        return getPreferredTheme()
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia(prefersDarkMQ)
        const handleChange = () => {
            setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT)
        }
        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    const persistTheme = useFetcher()

    // TODO: remove this when persistTheme is memoized properly
    const persistThemeRef = useRef(persistTheme)
    useEffect(() => {
        persistThemeRef.current = persistTheme
    }, [persistTheme])

    const mountRun = useRef(false)

    useEffect(() => {
        if (!mountRun.current) {
            mountRun.current = true
            return
        }
        if (!theme) return

        persistThemeRef.current.submit({ theme }, { action: "action/set-theme", method: "post" })
    }, [theme])

    return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
}

const clientThemeCode = `
;(() => {
    const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
        ? "dark"
        : "light"
    const cl = document.documentElement.classList
    const themeAlreadyApplied = cl.contains("light") || cl.contains("dark")
    if (themeAlreadyApplied) {
        // this script shouldn't exist if the theme is already applied!
        console.warn(
            "Hi there, could you let Matt know you're seeing this message? Thanks!"
        )
    } else {
        cl.add(theme)
    }

    const meta = document.querySelector("meta[name=color-scheme]")
    if (meta) {
        if (theme === "dark") {
            meta.content = "dark light"
        } else if (theme === "light") {
            meta.content = "light dark"
        }
    } else {
        console.warn("Hey, could you let Matt know you're seeing this message? Thanks!")
    }
})()
`

function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
    return <>{ssrTheme ? null : <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />}</>
}

export { ThemeProvider, NonFlashOfWrongThemeEls }
