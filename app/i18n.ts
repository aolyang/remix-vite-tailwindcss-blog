import { type InitOptions } from "i18next"

export const supportedLanguages = ["en", "zh"]

export default {
    supportedLngs: supportedLanguages,
    fallbackLng: "en",
    defaultNS: "common",
    react: { useSuspense: false }
} satisfies InitOptions
