import { type InitOptions } from "i18next"

export const supportedLngs = ["en", "zh"]

export default {
    supportedLngs,
    fallbackLng: "en",
    defaultNS: "common",
    react: { useSuspense: false }
} satisfies InitOptions
