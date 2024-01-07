import { createCookieSessionStorage } from "@remix-run/node"

import { isTheme, type Theme } from "@/providers/theme-context"

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set")
}

const themeStorage = createCookieSessionStorage({
    cookie: {
        name: "remix-theme",
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        httpOnly: true
    }
})

async function getThemeSession(request: Request) {
    const session = await themeStorage.getSession(request.headers.get("Cookie"))
    return {
        getTheme: () => {
            const themeValue = session.get("theme")
            return isTheme(themeValue) ? themeValue : null
        },
        setTheme: (theme: Theme) => session.set("theme", theme),
        commit: () => themeStorage.commitSession(session)
    }
}

export { getThemeSession }