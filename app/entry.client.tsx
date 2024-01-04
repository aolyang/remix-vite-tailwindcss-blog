import { RemixBrowser } from "@remix-run/react"
import { startTransition, StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import i18next, { use } from "i18next"
import { getInitialNamespaces } from "remix-i18next"
import { I18nextProvider, initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

import i18n from "./i18n"

async function hydrate() {
    await use(initReactI18next) // Tell i18nextServer to use the react-i18nextServer plugin
        .use(LanguageDetector)
        .use(Backend)
        .init({
            ...i18n,
            ns: getInitialNamespaces(),
            backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
            detection: {
                // Here only enable htmlTag detection, we'll detect the language only
                // server-side with remix-i18nextServer, by using the `<html lang>` attribute
                // we can communicate to the client the language detected server-side
                order: ["htmlTag"],
                // Because we only use htmlTag, there's no reason to cache the language
                // on the browser, so we disable it
                caches: []
            }
        })

    startTransition(() => {
        hydrateRoot(
            document,
            <I18nextProvider i18n={i18next}>
                <StrictMode>
                    <RemixBrowser />
                </StrictMode>
            </I18nextProvider>
        )
    })
}

if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate)
} else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    window.setTimeout(hydrate, 1)
}
