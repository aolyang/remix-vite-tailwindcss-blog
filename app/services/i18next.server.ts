import Backend from "i18next-fs-backend"
import { resolve } from "node:path"
import { RemixI18Next } from "remix-i18next"
import i18n from "@/i18n" // your i18n configuration file

const i18nextServer = new RemixI18Next({
    detection: {
        supportedLanguages: i18n.supportedLngs,
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
