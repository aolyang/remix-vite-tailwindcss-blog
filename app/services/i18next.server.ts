import { resolve } from "node:path"

import { createCookieSessionStorage } from "@remix-run/node"
import Backend from "i18next-fs-backend"
import { RemixI18Next } from "remix-i18next"

import i18n, { supportedLanguages } from "@/i18n"

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set")
}

const i18nStorage = createCookieSessionStorage({
    cookie: {
        name: "i18n",
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        httpOnly: true
    }
})

export async function getI18nSession(request: Request) {
    const session = await i18nStorage.getSession(request.headers.get("Cookie"))
    return {
        getLocale: () => {
            const i18nValue = session.get("i18n")
            return typeof i18nValue === "string" && supportedLanguages.includes(i18nValue)
                ? i18nValue
                : null
        },
        setLocale: (i18n: string) => session.set("i18n", i18n),
        commit: () => i18nStorage.commitSession(session)
    }
}

const i18nextServer = new RemixI18Next({
    detection: {
        sessionStorage: i18nStorage,
        supportedLanguages,
        fallbackLanguage: i18n.fallbackLng
    },
    // This is the configuration for i18nextServer used
    // when translating messages server-side only
    i18next: {
        ...i18n,
        backend: {
            loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json")
        }
    },
    // The i18nextServer plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
    // E.g. The Backend plugin for loading translations from the file system
    // Tip: You could pass `resources` to the `i18nextServer` configuration and avoid a backend here
    plugins: [Backend]
})

export default i18nextServer
